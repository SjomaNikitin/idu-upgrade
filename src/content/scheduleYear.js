export const SCHEDULE_YEAR_STORAGE_KEY = 'iduScheduleYear';
export const SCHEDULE_YEAR_CHANGE_EVENT = 'idu-schedule-year-change';

export const SCHEDULE_YEAR_OPTIONS = [
	{ value: '1', label: 'Rocznik 1' },
	{ value: '2', label: 'Rocznik 2' },
	{ value: '3', label: 'Rocznik 3' },
	{ value: '4', label: 'Rocznik 4' },
];

const DEFAULT_SCHEDULE_YEAR = '1';

const SCHEDULE_TIMES_BY_YEAR = {
	'1': {
		0: '7:55-8:40',
		1: '8:45-9:30',
		2: '9:35-10:20',
		3: '10:30-11:15',
		4: '11:25-12:10',
		5: '12:15-13:00',
		6: '13:10-13:55',
		7: '14:25-15:10',
		8: '15:15-16:00',
	},
	'2': {
		0: '7:55-8:40',
		1: '8:45-9:30',
		2: '9:35-10:20',
		3: '10:30-11:15',
		4: '11:25-12:10',
		5: '12:20-13:05',
		6: '13:30-14:15',
		7: '14:25-15:10',
		8: '15:15-16:00',
	},
	'3': {
		0: '7:55-8:40',
		1: '8:45-9:30',
		2: '9:35-10:20',
		3: '10:30-11:15',
		4: '11:25-12:10',
		5: '12:35-13:20',
		6: '13:30-14:15',
		7: '14:25-15:10',
		8: '15:15-16:00',
	},
	'4': {
		0: '7:55-8:40',
		1: '8:45-9:30',
		2: '9:35-10:20',
		3: '10:30-11:15',
		4: '11:25-12:10',
		5: '12:30-13:15',
		6: '13:25-14:10',
		7: '14:30-15:15',
		8: '15:20-16:05',
	},
};

export function normalizeScheduleYear(year) {
	const normalizedYear = String(year || '');
	return Object.prototype.hasOwnProperty.call(SCHEDULE_TIMES_BY_YEAR, normalizedYear)
		? normalizedYear
		: DEFAULT_SCHEDULE_YEAR;
}

export function getSelectedScheduleYear() {
	return normalizeScheduleYear(localStorage.getItem(SCHEDULE_YEAR_STORAGE_KEY));
}

export function selectScheduleYear(year) {
	const selectedYear = normalizeScheduleYear(year);
	localStorage.setItem(SCHEDULE_YEAR_STORAGE_KEY, selectedYear);
	window.dispatchEvent(new CustomEvent(SCHEDULE_YEAR_CHANGE_EVENT, {
		detail: { year: selectedYear },
	}));
	return selectedYear;
}

export function applyScheduleYearTimes(schedule, year) {
	const selectedTimes = SCHEDULE_TIMES_BY_YEAR[normalizeScheduleYear(year)];

	return Object.fromEntries(
		Object.entries(schedule || {}).map(([day, lessons]) => {
			const remappedLessons = Object.fromEntries(
				Object.entries(lessons || {}).map(([sourceTime, lesson]) => {
					const lessonNumber = Number.parseInt(lesson?.lessonNumber, 10);
					const time = selectedTimes[lessonNumber] || lesson?.time || sourceTime;
					const [start, end] = time.split('-');

					return [time, {
						...lesson,
						time,
						start,
						end,
					}];
				})
			);

			return [day, remappedLessons];
		})
	);
}
