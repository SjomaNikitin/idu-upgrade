import Foundation

enum AppConfig {
    // Replace with your deployed Worker URL before shipping.
    static let workerBaseURL = URL(string: "https://idu2.com/")!
    // Must match com.apple.security.application-groups in both target entitlements.
    static let appGroupID = "group.idu"
}
