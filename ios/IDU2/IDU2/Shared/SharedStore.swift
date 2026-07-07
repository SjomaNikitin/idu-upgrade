import Foundation

struct WidgetSnapshot: Codable {
    let title: String
    let subtitle: String
    let updatedAt: Date
}

enum SharedStore {
    private static let snapshotKey = "widget_snapshot"

    static func save(_ snapshot: WidgetSnapshot) {
        guard
            let defaults = UserDefaults(suiteName: AppConfig.appGroupID),
            let data = try? JSONEncoder().encode(snapshot)
        else {
            return
        }

        defaults.set(data, forKey: snapshotKey)
    }

    static func load() -> WidgetSnapshot? {
        guard
            let defaults = UserDefaults(suiteName: AppConfig.appGroupID),
            let data = defaults.data(forKey: snapshotKey),
            let snapshot = try? JSONDecoder().decode(WidgetSnapshot.self, from: data)
        else {
            return nil
        }

        return snapshot
    }
}
