import Foundation
import WebKit

enum ThemePreference {
    static let bridgeName = "iduThemeSync"
    private static let storageKey = "iduSelectedTheme"
    private static let scriptMarker = "// NIDU native theme restoration\n"
    private static let themes: Set<String> = ["Default", "Ocean", "Dzaga", "Besties"]

    static func save(_ theme: String) {
        guard themes.contains(theme) else { return }
        UserDefaults.standard.set(theme, forKey: storageKey)
    }

    static func isTrustedOrigin(_ origin: WKSecurityOrigin) -> Bool {
        guard origin.protocol == "https" else { return false }
        return origin.host == "idu.edu.pl" || origin.host == "www.idu.edu.pl" ||
            origin.host.range(of: #"^s[0-9]+\.idu\.edu\.pl$"#, options: .regularExpression) != nil
    }

    // Rebuild the document-start script after each choice so the next navigation
    // receives the latest preference, including redirects between IDU domains.
    static func install(in controller: WKUserContentController) {
        let saved = UserDefaults.standard.string(forKey: storageKey)
        let themeLiteral = saved.flatMap { themes.contains($0) ? "\"\($0)\"" : nil } ?? "null"
        let source = scriptMarker + """
        (() => {
            if (location.protocol !== 'https:' ||
                !/^(?:www\\.|s[0-9]+\\.)?idu\\.edu\\.pl$/.test(location.hostname)) return;
            try {
                const savedTheme = \(themeLiteral);
                if (savedTheme !== null) {
                    localStorage.setItem('theme', savedTheme);
                } else {
                    // Adopt an existing school-domain preference on first use.
                    // A login page's automatic Default must not win migration.
                    const existing = localStorage.getItem('theme');
                    if (['Ocean', 'Dzaga', 'Besties'].includes(existing)) {
                        window.webkit.messageHandlers.\(bridgeName).postMessage(existing);
                    }
                }
            } catch (error) {
                console.warn('[NIDU] Could not restore the saved theme', error);
            }
        })();
        """
        let otherScripts = controller.userScripts.filter { !$0.source.hasPrefix(scriptMarker) }
        controller.removeAllUserScripts()
        controller.addUserScript(WKUserScript(
            source: source,
            injectionTime: .atDocumentStart,
            forMainFrameOnly: true
        ))
        otherScripts.forEach { controller.addUserScript($0) }
    }
}
