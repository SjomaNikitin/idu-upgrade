package pl.edu.idu.upgrade

import android.content.res.AssetManager
import android.webkit.WebView
import androidx.webkit.WebViewCompat
import androidx.webkit.WebViewFeature
import org.json.JSONObject

class DocumentScripts(private val assets: AssetManager) {
    fun installBootstrap(webView: WebView) = register(webView, read("platform-bootstrap.js"))

    fun installRemoteAssets(webView: WebView, css: String, javascript: String) {
        // Registration order is execution order, matching the WKUserScripts.
        register(webView, read("install-styles.js").replace("__IDU_CSS_LITERAL__", JSONObject.quote(css)))
        register(webView, read("run-content.js").replace("__IDU_CONTENT_SOURCE__", javascript))
    }

    private fun read(name: String) = assets.open(name).bufferedReader().use { it.readText() }

    private fun register(webView: WebView, source: String) {
        if (WebViewFeature.isFeatureSupported(WebViewFeature.DOCUMENT_START_SCRIPT)) {
            // Android's origin rule includes same-origin subframes. Match iOS's
            // forMainFrameOnly explicitly. The content bundle remains one script.
            WebViewCompat.addDocumentStartJavaScript(
                webView,
                "if (window === window.top) {\n$source\n}",
                AppConfig.allowedOrigins,
            )
        } else {
            error("Document-start scripting requires an updated Android System WebView")
        }
    }
}
