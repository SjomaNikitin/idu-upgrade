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
        let upcomingToday = entries.first(where: {
            $0.startDate > now && calendar.isDate($0.startDate, inSameDayAs: now)
        })

        if let upcomingToday {
            return WidgetSnapshot(
                title: "Dzisiaj",
                subtitle: "Następny \(upcomingToday.lesson.subject) o \(upcomingToday.lesson.start)",
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
                        let startDate = makeDate(
                            dayKey: dateKey,
                            time: lesson.start,
                            now: now,
                            calendar: calendar
                        ),
                        let endDate = makeDate(
                            dayKey: dateKey,
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
        let dateKey: String
        let lesson: ScheduleLesson
        let startDate: Date
        let endDate: Date
    }
}
