import WebKit

enum HTMLDocumentScript {
    // WKWebView also runs user scripts in its generated PDF/image documents.
    // Leave those viewers untouched: their storage and scripts may be sandboxed.
    static func wrap(_ source: String) -> String {
        """
        if (document.contentType === 'text/html' || document.contentType === 'application/xhtml+xml') {
        \(source)
        }
        """
    }

    static func atDocumentStart(_ source: String) -> WKUserScript {
        WKUserScript(source: wrap(source), injectionTime: .atDocumentStart, forMainFrameOnly: true)
    }
}
