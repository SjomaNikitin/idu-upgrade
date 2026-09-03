import { describe, expect, it } from 'vitest';
import { applyScheduleYearTimes, normalizeScheduleYear } from './scheduleYear.js';

const schedule = {
	monday: {
		'12:00-12:45': {
			lessonNumber: '5',
			time: '12:00-12:45',
			start: '12:00',
			end: '12:45',
			subject: 'Matematyka',
		},
		'14:00-14:45': {
			lessonNumber: '7',
			time: '14:00-14:45',
			start: '14:00',
			end: '14:45',
			subject: 'Biologia',
		},
	},
};

describe('schedule year times', () => {
	it.each([
		['1', ['7:55-8:40', '8:45-9:30', '9:35-10:20', '10:30-11:15', '11:25-12:10', '12:15-13:00', '13:10-13:55', '14:25-15:10', '15:15-16:00']],
		['2', ['7:55-8:40', '8:45-9:30', '9:35-10:20', '10:30-11:15', '11:25-12:10', '12:20-13:05', '13:30-14:15', '14:25-15:10', '15:15-16:00']],
		['3', ['7:55-8:40', '8:45-9:30', '9:35-10:20', '10:30-11:15', '11:25-12:10', '12:35-13:20', '13:30-14:15', '14:25-15:10', '15:15-16:00']],
		['4', ['7:55-8:40', '8:45-9:30', '9:35-10:20', '10:30-11:15', '11:25-12:10', '12:30-13:15', '13:25-14:10', '14:30-15:15', '15:20-16:05']],
	])('maps every lesson time shown for year %s', (year, expectedTimes) => {
		const fullDay = Object.fromEntries(
			expectedTimes.map((_, lessonNumber) => [
				`source-${lessonNumber}`,
				{ lessonNumber: String(lessonNumber) },
			])
		);

		expect(Object.keys(applyScheduleYearTimes({ monday: fullDay }, year).monday)).toEqual(expectedTimes);
	});

	it.each([
		['1', '12:15-13:00', '14:25-15:10'],
		['2', '12:20-13:05', '14:25-15:10'],
		['3', '12:35-13:20', '14:25-15:10'],
		['4', '12:30-13:15', '14:30-15:15'],
	])('uses the bell schedule for year %s', (year, lessonFiveTime, lessonSevenTime) => {
		const result = applyScheduleYearTimes(schedule, year);

		expect(result.monday[lessonFiveTime]).toMatchObject({
			lessonNumber: '5',
			start: lessonFiveTime.split('-')[0],
			end: lessonFiveTime.split('-')[1],
		});
		expect(result.monday[lessonSevenTime].subject).toBe('Biologia');
	});

	it('falls back to year 1 for an invalid saved value', () => {
		expect(normalizeScheduleYear('unexpected')).toBe('1');
		expect(applyScheduleYearTimes(schedule, 'unexpected').monday['12:15-13:00']).toBeTruthy();
	});

	it('keeps a lesson with no usable number on its original time', () => {
		const result = applyScheduleYearTimes({
			tuesday: {
				'17:00-17:45': { subject: 'Kółko', time: '17:00-17:45' },
			},
		}, '4');

		expect(result.tuesday['17:00-17:45'].subject).toBe('Kółko');
	});
});
