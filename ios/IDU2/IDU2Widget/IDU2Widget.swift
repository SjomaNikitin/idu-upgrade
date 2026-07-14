import WidgetKit
import SwiftUI

private enum WidgetConfig {
    static let appGroupID = "group.com.IDU2.shared"
    static let snapshotKey = "widget_snapshot"
    static let scheduleKey = "widget_schedule"
}

struct WidgetSnapshot: Codable {
    let title: String
    let subtitle: String
    let detail: String?
    let updatedAt: Date
}

struct SchedulePayload: Codable {
    let schedule: [String: [String: ScheduleLesson]]
    let updatedAt: Date
}

struct ScheduleLesson: Codable {
    let lessonNumber: String
    let time: String
    let start: String
    let end: String
    let day: String
    let subject: String
    let subjectHref: String
    let location: String
    let locationHref: String
    let note: String
    let absence: Bool
    let lateness: Bool
}

private enum WidgetStore {
    static func loadSnapshot() -> WidgetSnapshot? {
        guard
            let defaults = UserDefaults(suiteName: WidgetConfig.appGroupID),
            let data = defaults.data(forKey: WidgetConfig.snapshotKey),
            let snapshot = try? JSONDecoder().decode(WidgetSnapshot.self, from: data)
        else {
            return nil
        }

        return snapshot
    }

    static func loadSchedule() -> SchedulePayload? {
        guard
            let defaults = UserDefaults(suiteName: WidgetConfig.appGroupID),
            let data = defaults.data(forKey: WidgetConfig.scheduleKey),
            let payload = try? JSONDecoder().decode(SchedulePayload.self, from: data)
        else {
            return nil
        }

        return payload
    }
}

private enum NextLessonBannerResolver {
    static func makeSnapshot(
        from payload: SchedulePayload,
        now: Date = Date(),
        calendar: Calendar = .current
    ) -> WidgetSnapshot {
        let entries = makeEntries(from: payload.schedule, now: now, calendar: calendar)
        let upcomingToday = entries.first(where: {
            $0.startDate > now && calendar.isDate($0.startDate, inSameDayAs: now)
        })

        if let upcomingToday {
            return WidgetSnapshot(
                title: "Dzisiaj",
                subtitle: "\(upcomingToday.lesson.subject) \(upcomingToday.lesson.start)",
                detail: roomText(for: upcomingToday.lesson),
                updatedAt: payload.updatedAt
            )
        }

        if let current = entries.first(where: { $0.startDate <= now && now < $0.endDate }) {
            return WidgetSnapshot(
                title: "Dzisiaj",
                subtitle: "Brak kolejnych lekcji",
                detail: roomText(for: current.lesson),
                updatedAt: payload.updatedAt
            )
        }

        return WidgetSnapshot(
            title: "Dzisiaj",
            subtitle: "Brak kolejnych lekcji",
            detail: nil,
            updatedAt: payload.updatedAt
        )
    }

    private static func roomText(for lesson: ScheduleLesson) -> String? {
        let room = lesson.location.trimmingCharacters(in: .whitespacesAndNewlines)
        return room.isEmpty ? "Brak sali" : room
    }

    private static func makeEntries(
        from schedule: [String: [String: ScheduleLesson]],
        now: Date,
        calendar: Calendar
    ) -> [ResolvedLesson] {
        schedule
            .flatMap { dateKey, lessonsByTime in
                lessonsByTime.values.compactMap { lesson in
                    guard
                        let startDate = makeDate(dayKey: dateKey, time: lesson.start, now: now, calendar: calendar),
                        let endDate = makeDate(dayKey: dateKey, time: lesson.end, now: now, calendar: calendar)
                    else {
                        return nil
                    }

                    return ResolvedLesson(lesson: lesson, startDate: startDate, endDate: endDate)
                }
            }
            .sorted { $0.startDate < $1.startDate }
    }

    private static func makeDate(
        dayKey: String,
        time: String,
        now: Date,
        calendar: Calendar
    ) -> Date? {
        let trimmedDayKey = dayKey.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        let timeParts = time
            .split(separator: ":")
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }

        guard
            timeParts.count == 2,
            let hour = Int(timeParts[0]),
            let minute = Int(timeParts[1])
        else {
            return nil
        }

        if let weekdayDate = makeWeekdayDate(
            weekdayKey: trimmedDayKey,
            hour: hour,
            minute: minute,
            now: now,
            calendar: calendar
        ) {
            return weekdayDate
        }

        let dayMonthParts = trimmedDayKey
            .split(separator: ".")
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }

        guard
            dayMonthParts.count == 2,
            let day = Int(dayMonthParts[0]),
            let month = Int(dayMonthParts[1])
        else {
            return nil
        }

        let currentYear = calendar.component(.year, from: now)
        let candidateYears = [currentYear - 1, currentYear, currentYear + 1]

        let candidates = candidateYears.compactMap { year -> Date? in
            var components = DateComponents()
            components.year = year
            components.month = month
            components.day = day
            components.hour = hour
            components.minute = minute
            return calendar.date(from: components)
        }

        return candidates.min(by: {
            abs($0.timeIntervalSince(now)) < abs($1.timeIntervalSince(now))
        })
    }

    private static func makeWeekdayDate(
        weekdayKey: String,
        hour: Int,
        minute: Int,
        now: Date,
        calendar: Calendar
    ) -> Date? {
        let weekdayMap: [String: Int] = [
            "sunday": 1,
            "monday": 2,
            "tuesday": 3,
            "wednesday": 4,
            "thursday": 5,
            "friday": 6,
            "saturday": 7
        ]

        guard
            let targetWeekday = weekdayMap[weekdayKey],
            let weekInterval = calendar.dateInterval(of: .weekOfYear, for: now)
        else {
            return nil
        }

        for offset in 0..<7 {
            guard let candidateDay = calendar.date(byAdding: .day, value: offset, to: weekInterval.start) else {
                continue
            }

            if calendar.component(.weekday, from: candidateDay) == targetWeekday {
                var components = calendar.dateComponents([.year, .month, .day], from: candidateDay)
                components.hour = hour
                components.minute = minute
                return calendar.date(from: components)
            }
        }

        return nil
    }

    private struct ResolvedLesson {
        let lesson: ScheduleLesson
        let startDate: Date
        let endDate: Date
    }
}

struct NextLessonEntry: TimelineEntry {
    let date: Date
    let snapshot: WidgetSnapshot
}

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> NextLessonEntry {
        NextLessonEntry(
            date: Date(),
            snapshot: WidgetSnapshot(
                title: "Dzisiaj",
                subtitle: "Następny Matematyka o 09:40",
                detail: "201",
                updatedAt: Date()
            )
        )
    }

    func getSnapshot(in context: Context, completion: @escaping (NextLessonEntry) -> Void) {
        completion(loadEntry())
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<NextLessonEntry>) -> Void) {
        let entry = loadEntry()
        let nextRefresh = Calendar.current.date(byAdding: .minute, value: 15, to: Date()) ?? Date().addingTimeInterval(900)
        completion(Timeline(entries: [entry], policy: .after(nextRefresh)))
    }

    private func loadEntry(now: Date = Date()) -> NextLessonEntry {
        let snapshot = WidgetStore.loadSchedule().map {
            NextLessonBannerResolver.makeSnapshot(from: $0, now: now)
        } ?? WidgetStore.loadSnapshot() ?? WidgetSnapshot(
            title: "Dzisiaj",
            subtitle: "Otwórz aplikację, aby zsynchronizować plan",
            detail: nil,
            updatedAt: .distantPast
        )

        return NextLessonEntry(date: now, snapshot: snapshot)
    }
}

struct IDU2WidgetEntryView: View {
    @Environment(\.widgetFamily) private var family
    @Environment(\.colorScheme) private var colorScheme

    var entry: Provider.Entry

    var body: some View {
        VStack(alignment: .leading, spacing: contentSpacing) {
            Text(entry.snapshot.title.uppercased())
                .font(.system(size: 13, weight: .semibold, design: .rounded))
                .fontWeight(.semibold)
                .foregroundStyle(secondaryTextColor)

            Spacer(minLength: 0)

            Text(entry.snapshot.subtitle)
                .font(.system(size: mainTextSize, weight: .bold, design: .rounded))
                .foregroundStyle(primaryTextColor)
                .multilineTextAlignment(.leading)
                .lineLimit(mainTextLineLimit)
                .fixedSize(horizontal: false, vertical: true)
                .minimumScaleFactor(mainTextMinimumScale)

            Spacer(minLength: 0)

            if let detail = entry.snapshot.detail, !detail.isEmpty {
                Text(detail)
                    .font(.system(size: 13, weight: .medium, design: .rounded))
                    .foregroundStyle(footerTextColor)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
        .containerBackground(.clear, for: .widget)
    }

    private var mainTextSize: CGFloat {
        switch family {
        case .systemSmall:
            return 18
        default:
            return 20
        }
    }

    private var mainTextLineLimit: Int {
        switch family {
        case .systemSmall:
            return 2
        default:
            return 3
        }
    }

    private var mainTextMinimumScale: CGFloat {
        switch family {
        case .systemSmall:
            return 0.8
        default:
            return 0.9
        }
    }

    private var contentSpacing: CGFloat {
        switch family {
        case .systemSmall:
            return 6
        default:
            return 8
        }
    }

    private var primaryTextColor: Color {
        colorScheme == .dark ? .white : .black
    }

    private var secondaryTextColor: Color {
        colorScheme == .dark
            ? Color(red: 1.0, green: 0.33, blue: 0.29)
            : Color.black.opacity(0.62)
    }

    private var footerTextColor: Color {
        colorScheme == .dark
            ? Color.white.opacity(0.72)
            : Color.black.opacity(0.55)
    }
}

struct IDU2Widget: Widget {
    let kind: String = "IDU2Widget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            IDU2WidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Next Lesson")
        .description("Shows the current or next lesson from the latest synced schedule.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

#Preview(as: .systemSmall) {
    IDU2Widget()
} timeline: {
    NextLessonEntry(
        date: .now,
        snapshot: WidgetSnapshot(
            title: "Dzisiaj",
            subtitle: "Następny Angielski o 10:35",
            detail: "105",
            updatedAt: .now
        )
    )
}
