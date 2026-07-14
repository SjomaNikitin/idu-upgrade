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
        webView.load(URLRequest(url: AppConfig.workerBaseURL))

        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        context.coordinator.applySafeAreaInsets(to: webView)
    }

    private func makePlatformBootstrapScript() -> WKUserScript {
        let source = """
        document.documentElement.setAttribute('data-app-platform', 'ios');
        document.documentElement.classList.add('ios-app');
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
            injectionTime: .atDocumentEnd,
            forMainFrameOnly: true
        )
    }

    final class Coordinator: NSObject, WKNavigationDelegate, WKScriptMessageHandler {
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            applySafeAreaInsets(to: webView)
            print("Loaded IDU worker site")
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
