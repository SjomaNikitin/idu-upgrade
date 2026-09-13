import Foundation

enum AppConfig {
    // Replace with your deployed Worker URL before shipping.
    static let workerBaseURL = URL(string: "http://localHost:8787/")!
    // Must match com.apple.security.application-groups in both target entitlements.
    static let appGroupID = "group.idu"
}
