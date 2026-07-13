import Foundation

struct SchedulePayload: Codable {
    let schedule: [String: [String: ScheduleLesson]]
    let updatedAt: Date

    init(schedule: [String: [String: ScheduleLesson]], updatedAt: Date = Date()) {
        self.schedule = schedule
        self.updatedAt = updatedAt
    }
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

enum NextLessonBannerResolver {
    static func makeSnapshot(
        from payload: SchedulePayload,
        now: Date = Date(),
        calendar: Calendar = .current
    ) -> WidgetSnapshot {
        let entries = makeEntries(from: payload.schedule, now: now, calendar: calendar)

        if let current = entries.first(where: { $0.startDate <= now && now < $0.endDate }) {
            return WidgetSnapshot(
                title: "Now",
                subtitle: makeLessonSubtitle(for: current.lesson, suffix: "until \(current.lesson.end)"),
                updatedAt: payload.updatedAt
            )
        }

        if let next = entries.first(where: { $0.startDate > now }) {
            let title = calendar.isDate(next.startDate, inSameDayAs: now) ? "Next lesson" : "Next up"
            let suffix = calendar.isDate(next.startDate, inSameDayAs: now)
                ? "at \(next.lesson.start)"
                : "\(next.lesson.day) \(next.lesson.start)"

            return WidgetSnapshot(
                title: title,
                subtitle: makeLessonSubtitle(for: next.lesson, suffix: suffix),
                updatedAt: payload.updatedAt
            )
        }

        return WidgetSnapshot(
            title: "No lessons",
            subtitle: "No upcoming classes in saved schedule",
            updatedAt: payload.updatedAt
        )
    }

    private static func makeLessonSubtitle(for lesson: ScheduleLesson, suffix: String) -> String {
        if lesson.location.isEmpty {
            return "\(lesson.subject) \(suffix)"
        }

        return "\(lesson.subject) \(suffix) • \(lesson.location)"
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
                        let startDate = makeDate(
                            dayMonth: dateKey,
                            time: lesson.start,
                            now: now,
                            calendar: calendar
                        ),
                        let endDate = makeDate(
                            dayMonth: dateKey,
                            time: lesson.end,
                            now: now,
                            calendar: calendar
                        )
                    else {
                        return nil
                    }

                    return ResolvedLesson(
                        dateKey: dateKey,
                        lesson: lesson,
                        startDate: startDate,
                        endDate: endDate
                    )
                }
            }
            .sorted { $0.startDate < $1.startDate }
    }

    private static func makeDate(
        dayMonth: String,
        time: String,
        now: Date,
        calendar: Calendar
    ) -> Date? {
        let dayMonthParts = dayMonth.split(separator: ".").map(String.init)
        let timeParts = time.split(separator: ":").map(String.init)

        guard
            dayMonthParts.count == 2,
            timeParts.count == 2,
            let day = Int(dayMonthParts[0]),
            let month = Int(dayMonthParts[1]),
            let hour = Int(timeParts[0]),
            let minute = Int(timeParts[1])
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

    private struct ResolvedLesson {
        let dateKey: String
        let lesson: ScheduleLesson
        let startDate: Date
        let endDate: Date
    }
}
