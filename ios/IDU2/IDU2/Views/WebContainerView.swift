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
        configuration.userContentController.addUserScript(makePlatformBootstrapScript())

		let webView = SafeAreaAwareWebView(frame: .zero, configuration: configuration)
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

        return WKUserScript(
            source: source,
            injectionTime: .atDocumentStart,
            forMainFrameOnly: true
        )
    }

    final class Coordinator: NSObject, WKNavigationDelegate, WKScriptMessageHandler {
        private enum AssetError: LocalizedError {
            case invalidResponse(URL, Int)
            case invalidText(URL)

            var errorDescription: String? {
                switch self {
                case let .invalidResponse(url, statusCode):
                    return "Asset request for \(url.absoluteString) returned HTTP \(statusCode)"
                case let .invalidText(url):
                    return "Asset at \(url.absoluteString) was not valid UTF-8"
                }
            }
        }

        func loadIDUWithRemoteAssets(in webView: WKWebView) {
            Task {
                do {
                    async let javascript = Self.downloadText(from: AppConfig.contentScriptURL)
                    async let css = Self.downloadText(from: AppConfig.stylesheetURL)
                    let (javascriptSource, cssSource) = try await (javascript, css)
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
                            controller.addUserScript(WKUserScript(
                                source: """
                                document.documentElement?.style.setProperty('--ios-safe-top', '\(nativeSafeTop)px');
                                try { localStorage.setItem('iduIosSafeTop', '\(nativeSafeTop)'); } catch {}
                                """,
                                injectionTime: .atDocumentStart,
                                forMainFrameOnly: true
                            ))
                        }
                        controller.addUserScript(WKUserScript(
                            source: cssInjectionSource,
                            injectionTime: .atDocumentStart,
                            forMainFrameOnly: true
                        ))
                        controller.addUserScript(WKUserScript(
                            source: javascriptInjectionSource,
                            injectionTime: .atDocumentStart,
                            forMainFrameOnly: true
                        ))
                        print(
                            "Registered Cloudflare assets:",
                            "css=\(cssSource.utf8.count) bytes,",
                            "javascript=\(javascriptSource.utf8.count) bytes"
                        )
                        webView.load(URLRequest(url: AppConfig.iduBaseURL))
                    }
                } catch {
                    print("Failed to load Cloudflare assets: \(error.localizedDescription)")
                    await MainActor.run {
                        // Keep login usable even if the asset host is temporarily unavailable.
                        _ = webView.load(URLRequest(url: AppConfig.iduBaseURL))
                    }
                }
            }
        }

        private static func downloadText(from url: URL) async throws -> String {
            var request = URLRequest(url: url)
            request.cachePolicy = .reloadRevalidatingCacheData
            request.timeoutInterval = 15

            let (data, response) = try await URLSession.shared.data(for: request)
            guard let httpResponse = response as? HTTPURLResponse,
                  (200...299).contains(httpResponse.statusCode) else {
                let statusCode = (response as? HTTPURLResponse)?.statusCode ?? -1
                throw AssetError.invalidResponse(url, statusCode)
            }
            guard let text = String(data: data, encoding: .utf8) else {
                throw AssetError.invalidText(url)
            }
            return text
        }

        private static func javascriptStringLiteral(_ value: String) throws -> String {
            let data = try JSONSerialization.data(
                withJSONObject: value,
                options: [.fragmentsAllowed]
            )
            guard let literal = String(data: data, encoding: .utf8) else {
                throw AssetError.invalidText(AppConfig.stylesheetURL)
            }
            return literal
        }

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
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

            webView.evaluateJavaScript(script) { _, error in
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

    final class SafeAreaAwareWebView: WKWebView {
        var onSafeAreaInsetsChange: (() -> Void)?

        override func safeAreaInsetsDidChange() {
            super.safeAreaInsetsDidChange()
            onSafeAreaInsetsChange?()
        }
    }
}

#Preview {
    WebContainerView()
        .ignoresSafeArea()
}
