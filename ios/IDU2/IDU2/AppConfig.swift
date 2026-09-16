import Foundation

enum AppConfig {
    // WKWebView talks to IDU directly, so authentication cookies never pass
    // through the old proxy Worker.
    static let iduBaseURL = URL(string: "https://idu.edu.pl")!

    // Browser customizations are published by `npm run publish`.
    static let contentScriptURL = URL(
        string: "https://idu-upgrade-assets.szymon-nikitin.workers.dev/content.js"
    )!
    static let stylesheetURL = URL(
        string: "https://idu-upgrade-assets.szymon-nikitin.workers.dev/styles.css"
    )!

    // Must match com.apple.security.application-groups in both target entitlements.
    static let appGroupID = "group.idu"
}
