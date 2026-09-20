package pl.edu.idu.upgrade

import android.annotation.SuppressLint
import android.content.ActivityNotFoundException
import android.content.Intent
import android.graphics.Color
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.ViewGroup
import android.webkit.CookieManager
import android.webkit.ConsoleMessage
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import android.widget.TextView
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.enableEdgeToEdge
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.lifecycle.lifecycleScope
import androidx.webkit.WebViewFeature
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.launch
import java.io.File
import kotlin.math.roundToInt

class MainActivity : ComponentActivity() {
    private var webView: WebView? = null
    private var safeTop = 0
    private var safeBottom = 0

    companion object {
        // Matches --background-color in the shared default theme.
        private const val APP_BACKGROUND_COLOR = "#E5F8F2"
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val appBackgroundColor = Color.parseColor(APP_BACKGROUND_COLOR)
        val root = FrameLayout(this)
        root.setBackgroundColor(appBackgroundColor)
        setContentView(root)
        window.statusBarColor = Color.TRANSPARENT
        window.navigationBarColor = Color.TRANSPARENT
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            window.isNavigationBarContrastEnforced = false
        }
        ViewCompat.getWindowInsetsController(root)?.apply {
            isAppearanceLightStatusBars = true
            isAppearanceLightNavigationBars = true
        }
        ViewCompat.setOnApplyWindowInsetsListener(root) { view, insets ->
            val bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() or WindowInsetsCompat.Type.displayCutout())
            val keyboard = insets.getInsets(WindowInsetsCompat.Type.ime())
            // WindowInsets are physical pixels, while values injected into the
            // page are CSS pixels (density-independent on Android WebView).
            val density = resources.displayMetrics.density
            safeTop = (bars.top / density).roundToInt()
            safeBottom = (bars.bottom / density).roundToInt()
            // The page paints behind transparent system bars. Only the keyboard
            // shrinks the native container; CSS keeps page content in safe areas.
            view.setPadding(bars.left, 0, bars.right, keyboard.bottom)
            webView?.let(::applySafeArea)
            insets
        }

        // A page-finished injection would change startup order. Require the
        // document-start feature instead of silently using that fallback.
        if (!WebViewFeature.isFeatureSupported(WebViewFeature.DOCUMENT_START_SCRIPT)) {
            root.addView(TextView(this).apply {
                setText(R.string.update_webview)
                setPadding(32, 32, 32, 32)
            })
            return
        }

        WebView.setWebContentsDebuggingEnabled(BuildConfig.DEBUG)
        val browser = WebView(this).also { webView = it }
        browser.setBackgroundColor(appBackgroundColor)
        browser.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            useWideViewPort = true
            loadWithOverviewMode = true
            allowFileAccess = false
            allowContentAccess = false
            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
        }
        CookieManager.getInstance().setAcceptCookie(true)
        browser.webChromeClient = object : WebChromeClient() {
            override fun onConsoleMessage(message: ConsoleMessage): Boolean {
                if (BuildConfig.DEBUG) Log.d("IDU2", message.message())
                return true
            }
        }
        browser.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                val uri = request.url
                // Keep normal web navigation and server redirects in this WebView,
                // matching WKWebView on iOS. Returning false tells WebView to send
                // the request itself instead of dispatching it to a browser app.
                if (uri.scheme in listOf("https", "http")) return false

                if (request.isForMainFrame && uri.scheme in listOf("mailto", "tel")) {
                    try {
                        startActivity(Intent(Intent.ACTION_VIEW, uri))
                    } catch (_: ActivityNotFoundException) {
                        Log.w("IDU2", "No app can open this external link")
                    }
                }
                return true
            }

            override fun onPageFinished(view: WebView, url: String) {
                applySafeArea(view)
                view.evaluateJavascript(
                    "JSON.stringify({platform:document.documentElement.getAttribute('data-app-platform'),stylesLoaded:!!document.getElementById('idu-custom-styles'),scriptsLoaded:typeof window.replaceHeader==='function'})",
                ) { status -> Log.i("IDU2", "Loaded $url injection=$status") }
            }
        }
        root.addView(browser, FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (browser.canGoBack()) browser.goBack() else {
                    isEnabled = false
                    onBackPressedDispatcher.onBackPressed()
                    isEnabled = true
                }
            }
        })

        val scripts = DocumentScripts(assets)
        scripts.installBootstrap(browser)
        lifecycleScope.launch {
            try {
                val cache = RemoteAssetCache(File(filesDir, "RemoteAssets"), assets)
                val (javascript, css) = coroutineScope {
                    val js = async { cache.loadText(AppConfig.CONTENT_SCRIPT_URL, "content.js") }
                    val styles = async { cache.loadText(AppConfig.STYLESHEET_URL, "styles.css") }
                    js.await() to styles.await()
                }
                scripts.installRemoteAssets(browser, css.text, javascript.text)
                Log.i("IDU2", "Registered assets: css=${css.source}, javascript=${javascript.source}")
            } catch (cancelled: CancellationException) {
                throw cancelled
            } catch (error: Exception) {
                // Same iOS fallback: retain bootstrap and keep login usable.
                Log.w("IDU2", "Failed to load remote or saved assets", error)
            }
            browser.loadUrl(AppConfig.BASE_URL)
        }
    }

    override fun onPause() {
        webView?.onPause()
        CookieManager.getInstance().flush()
        super.onPause()
    }

    override fun onResume() {
        super.onResume()
        webView?.onResume()
    }

    override fun onDestroy() {
        webView?.let {
            (it.parent as? ViewGroup)?.removeView(it)
            it.stopLoading()
            it.destroy()
        }
        webView = null
        super.onDestroy()
    }

    private fun applySafeArea(view: WebView) {
        view.evaluateJavascript(
            "document.documentElement.style.setProperty('--android-safe-top','${safeTop}px');" +
                "document.documentElement.style.setProperty('--android-safe-bottom','${safeBottom}px');" +
                "document.body?.style.setProperty('--android-safe-top','${safeTop}px');" +
                "document.body?.style.setProperty('--android-safe-bottom','${safeBottom}px');",
            null,
        )
    }
}
