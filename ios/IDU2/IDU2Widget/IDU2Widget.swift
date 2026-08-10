import WidgetKit
import SwiftUI

private enum WidgetConfig {
    // Must match com.apple.security.application-groups in both target entitlements.
    static let appGroupID = "group.idu"
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

private enum ScheduleGridResolver {
    static let weekdayOrder = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday"
    ]

    static func makeSnapshot(
        from payload: SchedulePayload,
        now: Date = Date(),
        calendar: Calendar = .current
    ) -> FullScheduleSnapshot {
        let dayColumns = makeDayColumns(from: payload.schedule, now: now, calendar: calendar)

        return FullScheduleSnapshot(
            dayColumns: dayColumns,
            updatedAt: payload.updatedAt
        )
    }

    private static func makeDayColumns(
        from schedule: [String: [String: ScheduleLesson]],
        now: Date,
        calendar: Calendar
    ) -> [FullScheduleDayColumn] {
        weekdayOrder.map { weekday in
            let label: String
            if let date = makeRepresentativeDate(for: weekday, from: schedule, now: now, calendar: calendar) {
                let day = calendar.component(.day, from: date)
                label = "\(shortWeekdayLabel(for: weekday)) \(day)"
            } else {
                label = shortWeekdayLabel(for: weekday)
            }

            return FullScheduleDayColumn(
                label: label,
                lessons: flattenedLessons(for: weekday, in: schedule).sorted(by: compareLessons)
            )
        }
    }

    private static func flattenedLessons(
        for weekday: String,
        in schedule: [String: [String: ScheduleLesson]]
    ) -> [ScheduleLesson] {
        schedule
            .filter { key, _ in normalizedWeekday(for: key) == weekday }
            .flatMap { _, lessonsByTime in lessonsByTime.values }
    }

    private static func compareLessons(_ lhs: ScheduleLesson, _ rhs: ScheduleLesson) -> Bool {
        if let leftNumber = Int(lhs.lessonNumber), let rightNumber = Int(rhs.lessonNumber), leftNumber != rightNumber {
            return leftNumber < rightNumber
        }

        return lhs.start < rhs.start
    }

    private static func normalizedWeekday(for key: String) -> String? {
        let normalized = key.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        if weekdayOrder.contains(normalized) {
            return normalized
        }

        return nil
    }

    private static func makeRepresentativeDate(
        for weekday: String,
        from schedule: [String: [String: ScheduleLesson]],
        now: Date,
        calendar: Calendar
    ) -> Date? {
        if let date = makeWeekdayDate(weekdayKey: weekday, hour: 12, minute: 0, now: now, calendar: calendar) {
            return date
        }

        for key in schedule.keys where normalizedWeekday(for: key) == weekday {
            if let date = makeDate(dayKey: key, time: "12:00", now: now, calendar: calendar) {
                return date
            }
        }

        return nil
    }

    private static func shortWeekdayLabel(for weekday: String) -> String {
        switch weekday {
        case "monday":
            return "pon"
        case "tuesday":
            return "wt"
        case "wednesday":
            return "sr"
        case "thursday":
            return "czw"
        case "friday":
            return "pt"
        default:
            return weekday
        }
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
        var components = DateComponents()
        components.year = currentYear
        components.month = month
        components.day = day
        components.hour = hour
        components.minute = minute
        return calendar.date(from: components)
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
}

struct FullScheduleSnapshot {
    let dayColumns: [FullScheduleDayColumn]
    let updatedAt: Date
}

struct FullScheduleDayColumn {
    let label: String
    let lessons: [ScheduleLesson]
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

struct FullScheduleEntry: TimelineEntry {
    let date: Date
    let snapshot: FullScheduleSnapshot
}

struct FullScheduleProvider: TimelineProvider {
    func placeholder(in context: Context) -> FullScheduleEntry {
        FullScheduleEntry(date: Date(), snapshot: unsynchronizedSnapshot())
    }

    func getSnapshot(in context: Context, completion: @escaping (FullScheduleEntry) -> Void) {
        completion(loadEntry())
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<FullScheduleEntry>) -> Void) {
        let entry = loadEntry()
        let nextRefresh = Calendar.current.date(byAdding: .minute, value: 15, to: Date()) ?? Date().addingTimeInterval(900)
        completion(Timeline(entries: [entry], policy: .after(nextRefresh)))
    }

    private func loadEntry(now: Date = Date()) -> FullScheduleEntry {
        let snapshot = WidgetStore.loadSchedule().map {
            ScheduleGridResolver.makeSnapshot(from: $0, now: now)
        } ?? unsynchronizedSnapshot()

        return FullScheduleEntry(date: now, snapshot: snapshot)
    }

    private func unsynchronizedSnapshot() -> FullScheduleSnapshot {
        FullScheduleSnapshot(
            dayColumns: [],
            updatedAt: .distantPast
        )
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

struct IDU2ScheduleWidgetEntryView: View {
    let entry: FullScheduleProvider.Entry

    var body: some View {
        Group {
            if entry.snapshot.dayColumns.isEmpty {
                Text("Otwórz aplikację, aby zsynchronizować plan")
                    .font(.system(size: 18, weight: .bold, design: .rounded))
                    .multilineTextAlignment(.center)
                    .foregroundStyle(.primary)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .padding()
            } else {
                HStack(alignment: .top, spacing: 4) {
                    ForEach(Array(entry.snapshot.dayColumns.enumerated()), id: \.offset) { _, column in
                        VStack(spacing: 4) {
                            Text(column.label)
                                .font(.system(size: 10, weight: .semibold, design: .rounded))
                                .foregroundStyle(.secondary)
                                .frame(maxWidth: .infinity)

                            ForEach(0..<maxLessonCount, id: \.self) { index in
                                if index < column.lessons.count {
                                    ScheduleLessonCell(lesson: column.lessons[index])
                                } else {
                                    ScheduleLessonSpacer()
                                }
                            }
                        }
                        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
                    }
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
            }
        }
        .containerBackground(.clear, for: .widget)
    }

    private var maxLessonCount: Int {
        max(entry.snapshot.dayColumns.map(\.lessons.count).max() ?? 0, 1)
    }
}

private struct ScheduleLessonCell: View {
    let lesson: ScheduleLesson

    var body: some View {
        ZStack {
            RoundedRectangle(cornerRadius: 10, style: .continuous)
                .fill(Color.primary.opacity(0.06))

            Text(shortSubject(lesson.subject))
                .font(.system(size: 11.5, weight: .bold, design: .rounded))
                .foregroundStyle(.primary)
                .lineLimit(1)
                .minimumScaleFactor(0.9)
                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .center)
                .padding(.horizontal, 4)
        }
        .frame(minHeight: 34)
    }

    private func shortSubject(_ subject: String) -> String {
        let trimmed = subject.trimmingCharacters(in: .whitespacesAndNewlines)
        let lowercase = trimmed.lowercased()

        let replacements: [(String, String)] = [
            ("język polski", "pol."),
            ("jezyk polski", "pol."),
            ("język angielski", "ang."),
            ("jezyk angielski", "ang."),
            ("język niemiecki", "niem."),
            ("jezyk niemiecki", "niem."),
            ("język hiszpański", "hiszp."),
            ("jezyk hiszpanski", "hiszp."),
            ("wychowanie fizyczne", "wf"),
            ("religia", "rel."),
            ("informatyka", "inf."),
            ("matematyka", "matma"),
            ("fizyka", "fiz."),
            ("chemia", "chem."),
            ("biologia", "biol."),
            ("geografia", "geogr."),
            ("historia", "hist."),
            ("plastyka", "plast."),
            ("muzyka", "muz."),
            ("biznes", "biz."),
            ("godzina wychowawcza", "godz.")
        ]

        if let match = replacements.first(where: { lowercase == $0.0 }) {
            return shortenToFit(match.1)
        }

        let prefixesToDrop = [
            "język ",
            "jezyk ",
            "zajęcia ",
            "zajecia ",
            "podstawy "
        ]

        for prefix in prefixesToDrop where lowercase.hasPrefix(prefix) {
            let shortened = trimmed.dropFirst(prefix.count).trimmingCharacters(in: .whitespacesAndNewlines)
            if !shortened.isEmpty {
                return shortenToFit(shortened)
            }
        }

        if trimmed.count <= 7 {
            return trimmed
        }

        return shortenToFit(trimmed)
    }

    private func shortenToFit(_ subject: String) -> String {
        if subject.count <= 7 {
            return subject
        }

        return String(subject.prefix(5)) + ".."
    }
}

private struct ScheduleLessonSpacer: View {
    var body: some View {
        Color.clear
            .frame(minHeight: 34)
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

struct IDU2ScheduleWidget: Widget {
    let kind: String = "IDU2ScheduleWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FullScheduleProvider()) { entry in
            IDU2ScheduleWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Full Schedule")
        .description("Shows the full weekly schedule from the latest synced data.")
        .supportedFamilies([.systemLarge])
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

#Preview(as: .systemLarge) {
    IDU2ScheduleWidget()
} timeline: {
    FullScheduleEntry(
        date: .now,
        snapshot: FullScheduleSnapshot(
            dayColumns: [
                FullScheduleDayColumn(label: "pon 14", lessons: [
                    ScheduleLesson(lessonNumber: "1", time: "08:00-08:45", start: "08:00", end: "08:45", day: "monday", subject: "Matematyka", subjectHref: "", location: "201", locationHref: "", note: "", absence: false, lateness: false),
                    ScheduleLesson(lessonNumber: "2", time: "08:55-09:40", start: "08:55", end: "09:40", day: "monday", subject: "Jezyk polski", subjectHref: "", location: "12", locationHref: "", note: "", absence: false, lateness: false),
                    ScheduleLesson(lessonNumber: "3", time: "09:50-10:35", start: "09:50", end: "10:35", day: "monday", subject: "Historia", subjectHref: "", location: "7", locationHref: "", note: "", absence: false, lateness: false)
                ]),
                FullScheduleDayColumn(label: "wt 15", lessons: [
                    ScheduleLesson(lessonNumber: "1", time: "08:00-08:45", start: "08:00", end: "08:45", day: "tuesday", subject: "Jezyk angielski", subjectHref: "", location: "12", locationHref: "", note: "", absence: false, lateness: false),
                    ScheduleLesson(lessonNumber: "2", time: "08:55-09:40", start: "08:55", end: "09:40", day: "tuesday", subject: "Geografia", subjectHref: "", location: "12", locationHref: "", note: "", absence: false, lateness: false)
                ]),
                FullScheduleDayColumn(label: "sr 16", lessons: [
                    ScheduleLesson(lessonNumber: "1", time: "08:00-08:45", start: "08:00", end: "08:45", day: "wednesday", subject: "Informatyka", subjectHref: "", location: "12", locationHref: "", note: "", absence: false, lateness: false)
                ]),
                FullScheduleDayColumn(label: "czw 17", lessons: [
                    ScheduleLesson(lessonNumber: "1", time: "08:00-08:45", start: "08:00", end: "08:45", day: "thursday", subject: "Chemia", subjectHref: "", location: "12", locationHref: "", note: "", absence: false, lateness: false)
                ]),
                FullScheduleDayColumn(label: "pt 18", lessons: [
                    ScheduleLesson(lessonNumber: "1", time: "08:00-08:45", start: "08:00", end: "08:45", day: "friday", subject: "WF", subjectHref: "", location: "12", locationHref: "", note: "", absence: false, lateness: false)
                ])
            ],
            updatedAt: .now
        )
    )
}
