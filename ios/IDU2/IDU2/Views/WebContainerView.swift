import SwiftUI
import WebKit
import WidgetKit

struct WebContainerView: UIViewRepresentable {
    private static let scheduleBridgeName = "iduScheduleSync"

    func makeCoordinator() -> Coordinator {
        Coordinator()
    }

    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.defaultWebpagePreferences.allowsContentJavaScript = true
        configuration.websiteDataStore = .default()
        configuration.userContentController.add(context.coordinator, name: Self.scheduleBridgeName)
        configuration.userContentController.add(context.coordinator, name: ThemePreference.bridgeName)
        ThemePreference.install(in: configuration.userContentController)
        configuration.userContentController.addUserScript(makePlatformBootstrapScript())

		let webView = FilePreviewWebView(frame: .zero, configuration: configuration)
		webView.isInspectable = true
		webView.navigationDelegate = context.coordinator
        webView.allowsBackForwardNavigationGestures = true
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.isOpaque = false
        webView.backgroundColor = .clear
        webView.scrollView.backgroundColor = .clear
        webView.onSafeAreaInsetsChange = { [weak webView, weak coordinator = context.coordinator] in
            guard let webView else { return }
            coordinator?.applySafeAreaInsets(to: webView)
        }
        context.coordinator.loadIDUWithRemoteAssets(in: webView)

        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        context.coordinator.applySafeAreaInsets(to: webView)
    }

    private func makePlatformBootstrapScript() -> WKUserScript {
        let source = """
        (() => {
            try {
                const storedSafeTop = localStorage.getItem('iduIosSafeTop');
                const safeTop = Number(storedSafeTop);
                if (storedSafeTop !== null && Number.isFinite(safeTop) && safeTop >= 0 && safeTop <= 200) {
                    document.documentElement?.style.setProperty('--ios-safe-top', `${safeTop}px`);
                }
            } catch (error) {
                console.info('[IDU2] Could not restore saved iOS header inset', error);
            }

            const configurePage = () => {
                const html = document.documentElement;
                if (html) {
                    html.setAttribute('data-app-platform', 'ios');
                    html.classList.add('ios-app');
                }

                if (document.head && !document.getElementById('idu-custom-viewport')) {
                    const viewport = document.createElement('meta');
                    viewport.id = 'idu-custom-viewport';
                    viewport.name = 'viewport';
                    viewport.content = 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no';
                    document.head.appendChild(viewport);
                }

                if (document.body) {
                    document.body.setAttribute('path', window.location.pathname);
                }

                return !!html && !!document.head && !!document.body;
            };

            if (!configurePage()) {
                const observer = new MutationObserver(() => {
                    if (configurePage()) observer.disconnect();
                });
                observer.observe(document, { childList: true, subtree: true });
                document.addEventListener('DOMContentLoaded', configurePage, { once: true });
            }
        })();

        window.__IDUSyncScheduleToApp = function(schedule) {
            if (!schedule || !window.webkit || !window.webkit.messageHandlers || !window.webkit.messageHandlers.\(Self.scheduleBridgeName)) {
                return;
            }

            window.webkit.messageHandlers.\(Self.scheduleBridgeName).postMessage({
                updatedAt: new Date().toISOString(),
                schedule: schedule
            });
        };
        """

        return HTMLDocumentScript.atDocumentStart(source)
    }

    final class Coordinator: NSObject, WKNavigationDelegate, WKScriptMessageHandler {
        private var pendingFilePreview = false
        private var filePreviewURLs: Set<URL> = []

        func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction,
                     decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            if navigationAction.targetFrame?.isMainFrame == true {
                // Back-forward cache restores may not issue a new response.
                pendingFilePreview = navigationAction.request.url.map { filePreviewURLs.contains($0) } ?? false
            }
            decisionHandler(.allow)
        }

        func webView(_ webView: WKWebView, decidePolicyFor navigationResponse: WKNavigationResponse,
                     decisionHandler: @escaping (WKNavigationResponsePolicy) -> Void) {
            if navigationResponse.isForMainFrame {
                let mimeType = navigationResponse.response.mimeType?.lowercased()
                pendingFilePreview = navigationResponse.canShowMIMEType && mimeType != nil &&
                    mimeType != "text/html" && mimeType != "application/xhtml+xml"
                if let url = navigationResponse.response.url {
                    if pendingFilePreview {
                        filePreviewURLs.insert(url)
                    } else {
                        filePreviewURLs.remove(url)
                    }
                }
            }
            decisionHandler(.allow)
        }

        func webView(_ webView: WKWebView, didCommit navigation: WKNavigation!) {
            (webView as? FilePreviewWebView)?.setFilePreview(pendingFilePreview)
        }

        func loadIDUWithRemoteAssets(in webView: WKWebView) {
            Task {
                do {
                    print("Loading UI assets:", AppConfig.contentScriptURL, AppConfig.stylesheetURL)
                    let assetCache = RemoteAssetCache(cacheEnabled: !AppConfig.usesLocalAssets)
                    async let javascript = assetCache.loadText(
                        from: AppConfig.contentScriptURL,
                        cacheFileName: "content.js"
                    )
                    async let css = assetCache.loadText(
                        from: AppConfig.stylesheetURL,
                        cacheFileName: "styles.css"
                    )
                    let (javascriptAsset, cssAsset) = try await (javascript, css)
                    let javascriptSource = javascriptAsset.text
                    let cssSource = cssAsset.text
                    let cssLiteral = try Self.javascriptStringLiteral(cssSource)
                    let cssInjectionSource = """
                    (() => {
                        const css = \(cssLiteral);
                        const installStyles = () => {
                            if (document.getElementById('idu-custom-styles')) return true;

                            if (!document.head) return false;

                            const style = document.createElement('style');
                            style.id = 'idu-custom-styles';
                            style.textContent = css;
                            document.head.appendChild(style);
                            console.info('[IDU2] Cloudflare styles loaded', {
                                url: '\(AppConfig.stylesheetURL.absoluteString)',
                                bytes: style.textContent.length,
                                target: style.parentElement?.tagName
                            });
                            return true;
                        };

                        if (!installStyles()) {
                            const observer = new MutationObserver(() => {
                                if (installStyles()) observer.disconnect();
                            });
                            observer.observe(document, { childList: true, subtree: true });
                            document.addEventListener('DOMContentLoaded', installStyles, { once: true });
                        }

                        document.addEventListener('DOMContentLoaded', () => {
                            const style = document.getElementById('idu-custom-styles');
                            if (style && document.head) {
                                document.head.appendChild(style);
                                console.info('[IDU2] Cloudflare styles moved after page styles');
                            }
                        }, { once: true });
                    })();
                    """
                    let javascriptInjectionSource = """
                    console.info('[IDU2] Cloudflare JavaScript loaded', {
                        url: '\(AppConfig.contentScriptURL.absoluteString)',
                        bytes: \(javascriptSource.utf8.count)
                    });
                    \(javascriptSource)
                    """

                    await MainActor.run {
                        let controller = webView.configuration.userContentController
                        let windowSafeTop = webView.window?.safeAreaInsets.top ?? 0
                        let nativeSafeTop = max(windowSafeTop, webView.safeAreaInsets.top)

                        if nativeSafeTop > 0 {
                            controller.addUserScript(HTMLDocumentScript.atDocumentStart(
                                """
                                document.documentElement?.style.setProperty('--ios-safe-top', '\(nativeSafeTop)px');
                                try { localStorage.setItem('iduIosSafeTop', '\(nativeSafeTop)'); } catch {}
                                """
                            ))
                        }
                        controller.addUserScript(HTMLDocumentScript.atDocumentStart(cssInjectionSource))
                        controller.addUserScript(HTMLDocumentScript.atDocumentStart(javascriptInjectionSource))
                        print(
                            "Registered assets:",
                            "css=\(cssSource.utf8.count) bytes (\(cssAsset.source.rawValue)),",
                            "javascript=\(javascriptSource.utf8.count) bytes (\(javascriptAsset.source.rawValue))"
                        )
                        webView.load(URLRequest(url: AppConfig.iduBaseURL))
                    }
                } catch {
                    print("Failed to load remote or saved assets: \(error.localizedDescription)")
                    await MainActor.run {
                        // Keep login usable even if the asset host is temporarily unavailable.
                        _ = webView.load(URLRequest(url: AppConfig.iduBaseURL))
                    }
                }
            }
        }

        private static func javascriptStringLiteral(_ value: String) throws -> String {
            let data = try JSONSerialization.data(
                withJSONObject: value,
                options: [.fragmentsAllowed]
            )
            guard let literal = String(data: data, encoding: .utf8) else {
                throw RemoteAssetCache.CacheError.invalidText(AppConfig.stylesheetURL)
            }
            return literal
        }

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            guard (webView as? FilePreviewWebView)?.isFilePreview != true else { return }
            applySafeAreaInsets(to: webView)
            print("Loaded IDU site directly")
            webView.evaluateJavaScript(
                "({ stylesLoaded: !!document.getElementById('idu-custom-styles'), styleBytes: document.getElementById('idu-custom-styles')?.textContent?.length || 0, scriptsLoaded: typeof window.replaceHeader === 'function', viewport: document.querySelector('meta[name=viewport]')?.content || null, layoutWidth: document.documentElement.clientWidth, bodyPath: document.body?.getAttribute('path') || null })"
            ) { result, error in
                if let error {
                    print("Failed to inspect injected Cloudflare assets: \(error.localizedDescription)")
                    return
                }
                print("Cloudflare asset injection status:", result ?? "nil")
            }
        }

        func webView(
            _ webView: WKWebView,
            didFail navigation: WKNavigation!,
            withError error: Error
        ) {
            print("Navigation failed: \(error.localizedDescription)")
        }

        func webView(
            _ webView: WKWebView,
            didFailProvisionalNavigation navigation: WKNavigation!,
            withError error: Error
        ) {
            print("Initial load failed: \(error.localizedDescription)")
        }

        func applySafeAreaInsets(to webView: WKWebView) {
            guard (webView as? FilePreviewWebView)?.isFilePreview != true else { return }
            let windowSafeTop = webView.window?.safeAreaInsets.top ?? 0
            let safeTop = max(windowSafeTop, webView.safeAreaInsets.top)
            let script = """
            document.documentElement.style.setProperty('--ios-safe-top', '\(safeTop)px');
            try { localStorage.setItem('iduIosSafeTop', '\(safeTop)'); } catch {}
            if (document.body) {
                document.body.style.setProperty('--ios-safe-top', '\(safeTop)px');
            }
            """

            print(
                "Applying iOS safe area top:",
                "windowSafeTop=\(windowSafeTop)",
                "webViewSafeTop=\(webView.safeAreaInsets.top)",
                "finalSafeTop=\(safeTop)"
            )

            webView.evaluateJavaScript(HTMLDocumentScript.wrap(script)) { _, error in
                if let error {
                    print("Failed to update iOS safe area inset: \(error.localizedDescription)")
                    return
                }

                webView.evaluateJavaScript(
                    "getComputedStyle(document.documentElement).getPropertyValue('--ios-safe-top').trim()"
                ) { result, readError in
                    if let readError {
                        print("Failed to read back --ios-safe-top: \(readError.localizedDescription)")
                        return
                    }

                    print("Read back CSS --ios-safe-top:", result as? String ?? "nil")

                    webView.evaluateJavaScript(
                        "({ platform: document.documentElement.getAttribute('data-app-platform'), safeTop: getComputedStyle(document.documentElement).getPropertyValue('--ios-safe-top').trim(), bodyPaddingTop: getComputedStyle(document.body).paddingTop, topExists: !!document.querySelector('#top') })"
                    ) { debugResult, debugError in
                        if let debugError {
                            print("Failed to read page debug info: \(debugError.localizedDescription)")
                            return
                        }

                        print("Page debug:", debugResult ?? "nil")
                    }
                }
            }
        }

        func userContentController(
            _ userContentController: WKUserContentController,
            didReceive message: WKScriptMessage
        ) {
            if message.name == ThemePreference.bridgeName {
                guard message.frameInfo.isMainFrame,
                      ThemePreference.isTrustedOrigin(message.frameInfo.securityOrigin),
                      let theme = message.body as? String else { return }
                ThemePreference.save(theme)
                ThemePreference.install(in: userContentController)
                return
            }

            guard message.name == WebContainerView.scheduleBridgeName else {
                return
            }

            guard JSONSerialization.isValidJSONObject(message.body) else {
                print("Schedule sync payload was not a valid JSON object")
                return
            }
            do {
                let data = try JSONSerialization.data(withJSONObject: message.body)
                try SharedStore.saveScheduleMessageData(data)
                WidgetCenter.shared.reloadTimelines(ofKind: "IDU2Widget")
                WidgetCenter.shared.reloadTimelines(ofKind: "IDU2ScheduleWidget")
                print("Saved schedule payload from web app")
            } catch {
                print("Failed to save schedule payload: \(error.localizedDescription)")
            }
			if let payload = SharedStore.loadSchedule() {
				print("Saved schedule days:", payload.schedule.keys.sorted())
				print("Saved schedule updatedAt:", payload.updatedAt)
			}
			if let snapshot = SharedStore.load() {
				print("Saved widget snapshot updatedAt:", snapshot.updatedAt)
			}
        }
    }

}

#Preview {
    WebContainerView()
        .ignoresSafeArea()
}
