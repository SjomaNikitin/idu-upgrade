function formatDayKey(date) {
	const weekdayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	return weekdayKeys[date.getDay()];
}

function createLesson(lessonNumber, start, end, day, subject, room, note = '') {
	return {
		lessonNumber: String(lessonNumber),
		time: `${start}-${end}`,
		start,
		end,
		day,
		subject,
		subjectHref: '#',
		location: room,
		locationHref: '#',
		note,
		absence: false,
		lateness: false
	};
}

function buildDaySchedule(dayLabel, subjects) {
	const timeSlots = [
		['08:00', '08:45'],
		['08:55', '09:40'],
		['09:50', '10:35'],
		['10:45', '11:30'],
		['11:40', '12:25'],
		['12:35', '13:20'],
		['13:30', '14:15'],
		['14:25', '15:10'],
		['15:20', '16:05']
	];

	return Object.fromEntries(
		timeSlots.flatMap(([start, end], index) => {
			const slot = subjects[index];
			if (!slot) {
				return [];
			}

			return [
				[
					`${start}-${end}`,
					createLesson(index, start, end, dayLabel, slot.subject, slot.room, slot.note || '')
				]
			];
		})
	);
}

export function buildExampleDashboardData() {
	const todayKey = formatDayKey(new Date());
	const weeklySchedule = {
		monday: buildDaySchedule('Monday', [
			{ subject: 'Matematyka', room: '12' },
			{ subject: 'Jezyk polski', room: '8' },
			{ subject: 'Historia', room: '7' },
			{ subject: 'Biologia', room: '15' },
			{ subject: 'Jezyk angielski', room: '14' },
			{ subject: 'WF', room: 'Sala A' },
			{ subject: 'Informatyka', room: '22' },
			{ subject: 'Hiszpanski', room: '11', note: 'Konwersacje' },
			{ subject: 'Hiszpanski', room: '11', note: 'Konwersacje' }
		]),
		tuesday: buildDaySchedule('Tuesday', [
			{ subject: 'Fizyka', room: '16' },
			{ subject: 'Matematyka', room: '12' },
			{ subject: 'Chemia', room: '18' },
			{ subject: 'Jezyk angielski', room: '14' },
			{ subject: 'Geografia', room: '10' },
			{ subject: 'WF', room: 'Boisko' },
			{ subject: 'Biznes', room: '5' }
		]),
		wednesday: buildDaySchedule('Wednesday', [
			{ subject: 'Jezyk polski', room: '8' },
			{ subject: 'Historia', room: '7' },
			{ subject: 'Matematyka', room: '12' },
			{ subject: 'Informatyka', room: '22' },
			{ subject: 'Biologia', room: '15' },
			{ subject: 'Plastyka', room: '6' },
			{ subject: 'Hiszpanski', room: '11' },
			{ subject: 'WF', room: 'Sala A' },
			{ subject: 'Hiszpanski', room: '11', note: 'Konwersacje' }
		]),
		thursday: buildDaySchedule('Thursday', [
			{ subject: 'Chemia', room: '18' },
			{ subject: 'Geografia', room: '10' },
			{ subject: 'Jezyk angielski', room: '14' },
			{ subject: 'Matematyka', room: '12' },
			{ subject: 'Fizyka', room: '16' },
			{ subject: 'Biznes', room: '5' },
			{ subject: 'Historia', room: '7' },
			{ subject: 'Muzyka', room: '9' },
			{ subject: 'Hiszpanski', room: '11', note: 'Konwersacje' }
		]),
		friday: buildDaySchedule('Friday', [
			{ subject: 'Jezyk polski', room: '8' },
			{ subject: 'Matematyka', room: '12' },
			{ subject: 'Biologia', room: '15' },
			{ subject: 'Jezyk angielski', room: '14' },
			{ subject: 'Informatyka', room: '22' },
			{ subject: 'WF', room: 'Sala A' },
			{ subject: 'Godzina wychowawcza', room: '4' },
			{ subject: 'Hiszpanski', room: '11' },
			{ subject: 'Hiszpanski', room: '11', note: 'Konwersacje' }
		])
	};

	if (!weeklySchedule[todayKey]) {
		weeklySchedule[todayKey] = weeklySchedule.monday;
	}

	return {
		homeworkUrl: '#',
		reviewsUrl: '#',
		messagesUrl: '#',
		attendance: [
			{
				subject: 'Matematyka',
				subjectUrl: '#',
				type: 'Nieobecnosc',
				date: '2026-07-10',
				issuedAt: '2026-07-10 08:15',
				absence: true,
				presence: false,
				lateness: false,
				seeMoreUrl: 'mogData',
				mockData: true,
			},
			{
				subject: 'WF',
				subjectUrl: '#',
				type: 'Obecnosc',
				date: '2026-07-10',
				issuedAt: '2026-07-10 08:15',
				absence: false,
				presence: true,
				lateness: false,
				seeMoreUrl: 'mogData',
				mockData: true,
			},
			{
				subject: 'Hiszpański',
				subjectUrl: '#',
				type: 'Obecnosc',
				date: '2026-07-10',
				issuedAt: '2026-07-10 08:15',
				absence: false,
				presence: true,
				lateness: false,
				seeMoreUrl: 'mogData',
				mockData: true,
			},
			{
				subject: 'Historia',
				subjectUrl: '#',
				type: 'Obecnosc',
				date: '2026-07-10',
				issuedAt: '2026-07-10 08:15',
				absence: false,
				presence: true,
				lateness: false,
				seeMoreUrl: 'mogData',
				mockData: true,
			},
			{
				subject: 'Matematyka',
				subjectUrl: '#',
				type: 'Nieobecnosc',
				date: '2026-07-10',
				issuedAt: '2026-07-10 08:15',
				absence: false,
				presence: true,
				lateness: false,
				seeMoreUrl: 'mogData',
				mockData: true,
			},
			{
				subject: 'Jezyk angielski',
				subjectUrl: '#',
				type: 'Spoznienie',
				date: '2026-07-09',
				issuedAt: '2026-07-09 09:00',
				absence: false,
				presence: false,
				lateness: true,
				seeMoreUrl: 'mogData'
			},
			{
				subject: 'Matematyka',
				subjectUrl: '#',
				type: 'Nieobecnosc',
				date: '2026-07-10',
				issuedAt: '2026-07-10 08:15',
				absence: false,
				presence: true,
				lateness: false,
				seeMoreUrl: 'mogData',
				mockData: true,
			},
			{
				subject: 'Matematyka',
				subjectUrl: '#',
				type: 'Nieobecnosc',
				date: '2026-07-10',
				issuedAt: '2026-07-10 08:15',
				absence: false,
				presence: true,
				lateness: false,
				seeMoreUrl: 'mogData',
				mockData: true,
			},
			{
				subject: 'Jezyk angielski',
				subjectUrl: '#',
				type: 'Nieobecnosc',
				date: '2026-07-10',
				issuedAt: '2026-07-10 08:15',
				absence: false,
				presence: true,
				lateness: false,
				seeMoreUrl: 'mogData',
				mockData: true,
			},
			{
				subject: 'Biznes',
				subjectUrl: '#',
				type: 'Nieobecnosc',
				date: '2026-07-10',
				issuedAt: '2026-07-10 08:15',
				absence: false,
				presence: true,
				lateness: false,
				seeMoreUrl: 'mogData',
				mockData: true,
			},
		],
		news: [
			{
				title: 'Praca szkoły w lato',
				titleUrl: '#',
				date: '2026-07-12',
				updatedAt: '2026-07-12 08:00',
				comments: '3',
				sticky: true,
				read: false,
				priority: 'high'
			},
			{
				title: 'Zmiana planu zajec na przyszly tydzien',
				titleUrl: '#',
				date: '2026-07-11',
				updatedAt: '2026-07-11 18:30',
				comments: '0',
				sticky: false,
				read: true,
				priority: 'normal'
			}
		],
		grades: [
			{
				subject: 'Matematyka',
				subjectUrl: '#',
				grade: '5',
				gradeText: 'Sprawdzian',
				gradeDescriptionUrl: '#',
				description: 'Funkcje liniowe',
				date: '2026-07-08',
				seeMoreUrl: 'mogData'
			},
			{
				subject: 'Historia',
				subjectUrl: '#',
				grade: '4+',
				gradeText: 'Kartkowka',
				gradeDescriptionUrl: '#',
				description: 'Sredniowiecze',
				date: '2026-07-07',
				seeMoreUrl: 'mogData'
			},
			{
				subject: 'Biznes',
				subjectUrl: '#',
				grade: '6',
				gradeText: 'Kartkowka',
				gradeDescriptionUrl: '#',
				description: 'Sredniowiecze',
				date: '2026-07-07',
				seeMoreUrl: 'mogData'
			},
			{
				subject: 'Hiszpański',
				subjectUrl: '#',
				grade: 'ZAL',
				gradeText: 'Kartkowka',
				gradeDescriptionUrl: '#',
				description: 'Sredniowiecze',
				date: '2026-07-07',
				seeMoreUrl: 'mogData'
			},
			{
				subject: 'polski',
				subjectUrl: '#',
				grade: '4',
				gradeText: 'Kartkowka',
				gradeDescriptionUrl: '#',
				description: 'Sredniowiecze',
				date: '2026-07-07',
				seeMoreUrl: 'mogData'
			},
		],
		subjects: {
			classInfo: {
				name: '3A',
				url: '#',
				forumUrl: '#',
				forumName: 'Forum klasy 3A',
				teacher: 'Jan Kowalski',
				teacherUrl: '#'
			},
			subjects: [
				{ name: 'Matematyka', url: '#', title: 'Matematyka', italic: false },
				{ name: 'Jezyk angielski', url: '#', title: 'Jezyk angielski', italic: false },
				{ name: 'Historia', url: '#', title: 'Historia', italic: false }
			]
		},
			schedule: weeklySchedule,
		subjectAnnouncements: [
			{
				subject: 'Matematyka',
				subjectUrl: '#',
				title: 'Praca domowa na poniedzialek',
				titleUrl: '#',
				date: '2026-07-12',
				read: false
			},
			{
				subject: 'Jezyk angielski',
				subjectUrl: '#',
				title: 'Przypomnienie o projekcie',
				titleUrl: '#',
				date: '2026-07-11',
				read: true
			}
		]
	};
}
