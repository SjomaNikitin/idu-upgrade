import Foundation

struct WidgetSnapshot: Codable {
    let title: String
    let subtitle: String
    let updatedAt: Date
}

enum SharedStore {
    private static let snapshotKey = "widget_snapshot"
    private static let scheduleKey = "widget_schedule"

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

    static func saveSchedule(_ payload: SchedulePayload) {
        guard
            let defaults = UserDefaults(suiteName: AppConfig.appGroupID),
            let data = try? JSONEncoder().encode(payload)
        else {
            return
        }

        defaults.set(data, forKey: scheduleKey)
    }

    static func loadSchedule() -> SchedulePayload? {
        guard
            let defaults = UserDefaults(suiteName: AppConfig.appGroupID),
            let data = defaults.data(forKey: scheduleKey),
            let payload = try? JSONDecoder().decode(SchedulePayload.self, from: data)
        else {
            return nil
        }

        return payload
    }

    static func refreshBannerFromStoredSchedule(now: Date = Date()) -> WidgetSnapshot? {
        guard let payload = loadSchedule() else {
            return nil
        }

        let snapshot = NextLessonBannerResolver.makeSnapshot(from: payload, now: now)
        save(snapshot)
        return snapshot
    }
}
