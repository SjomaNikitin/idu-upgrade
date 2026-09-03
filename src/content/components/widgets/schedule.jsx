import { h } from 'preact';
import { useEffect, useRef, useState} from 'preact/hooks';
import { useWidgetResize } from './widgetResize.js';
import { useWidgetDragging } from './widgetDragging.js';

const LESSON_ABBREVIATIONS = [
	{ abbreviation: 'ang', aliases: ['język angielski', 'angielski', 'english'] },
	{ abbreviation: 'pol', aliases: ['język polski', 'polski'] },
	{ abbreviation: 'nie', aliases: ['język niemiecki', 'niemiecki'] },
	{ abbreviation: 'his', aliases: ['język hiszpański', 'hiszpański'] },
	{ abbreviation: 'fra', aliases: ['język francuski', 'francuski'] },
	{ abbreviation: 'wło', aliases: ['język włoski', 'włoski'] },
	{ abbreviation: 'ros', aliases: ['język rosyjski', 'rosyjski'] },
	{ abbreviation: 'ukr', aliases: ['język ukraiński', 'ukraiński'] },
	{ abbreviation: 'łac', aliases: ['język łaciński', 'łaciński', 'łacina'] },
	{ abbreviation: 'mat', aliases: ['matematyka'] },
	{ abbreviation: 'inf', aliases: ['informatyka', 'technologia informacyjna', 'technologie informacyjne'] },
	{ abbreviation: 'bio', aliases: ['biologia'] },
	{ abbreviation: 'geo', aliases: ['geografia'] },
	{ abbreviation: 'che', aliases: ['chemia'] },
	{ abbreviation: 'fiz', aliases: ['fizyka'] },
	{ abbreviation: 'his', aliases: ['historia'] },
	{ abbreviation: 'wos', aliases: ['wiedza o społeczeństwie'] },
	{ abbreviation: 'biz', aliases: ['biznes i zarządzanie', 'biznes'] },
	{ abbreviation: 'prz', aliases: ['podstawy przedsiębiorczości', 'przedsiębiorczość', 'przyroda'] },
	{ abbreviation: 'wf', aliases: ['wychowanie fizyczne', 'w-f', 'wf'] },
	{ abbreviation: 'edb', aliases: ['edukacja dla bezpieczeństwa'] },
	{ abbreviation: 'rel', aliases: ['religia'] },
	{ abbreviation: 'ety', aliases: ['etyka'] },
	{ abbreviation: 'fil', aliases: ['filozofia'] },
	{ abbreviation: 'psy', aliases: ['psychologia'] },
	{ abbreviation: 'soc', aliases: ['socjologia'] },
	{ abbreviation: 'muz', aliases: ['muzyka'] },
	{ abbreviation: 'pla', aliases: ['plastyka'] },
	{ abbreviation: 'tec', aliases: ['technika'] },
	{ abbreviation: 'kul', aliases: ['wiedza o kulturze', 'kultura'] },
	{ abbreviation: 'wyc', aliases: ['godzina wychowawcza', 'zajęcia z wychowawcą', 'wychowawcza'] },
	{ abbreviation: 'edu', aliases: ['edukacja wczesnoszkolna'] },
	{ abbreviation: 'eko', aliases: ['ekonomia'] },
	{ abbreviation: 'pra', aliases: ['prawo'] },
	{ abbreviation: 'sta', aliases: ['statystyka'] },
	{ abbreviation: 'ast', aliases: ['astronomia'] },
	{ abbreviation: 'med', aliases: ['edukacja zdrowotna', 'medycyna'] },
	{ abbreviation: 'pie', aliases: ['pierwsza pomoc'] },
	{ abbreviation: 'dor', aliases: ['doradztwo zawodowe'] },
	{ abbreviation: 'log', aliases: ['logopedia'] },
	{ abbreviation: 'rew', aliases: ['zajęcia rewalidacyjne', 'rewalidacja'] },
	{ abbreviation: 'ter', aliases: ['terapia pedagogiczna'] },
	{ abbreviation: 'bib', aliases: ['zajęcia biblioteczne'] },
	{ abbreviation: 'zaw', aliases: ['przedmiot zawodowy', 'zajęcia zawodowe'] },
];

function normalizeLessonName(name) {
	return name
		.toLocaleLowerCase('pl-PL')
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/ł/g, 'l')
		.replace(/[._/\\-]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function shortenLessonName(name) {
	const trimmedName = name.trim();
	if (!trimmedName) return '';

	const normalizedName = normalizeLessonName(trimmedName);
	const matchedSubject = LESSON_ABBREVIATIONS.find(({ aliases }) =>
		aliases.some((alias) => normalizedName.includes(normalizeLessonName(alias)))
	);

	if (matchedSubject) return matchedSubject.abbreviation;

	const languageName = normalizedName.match(/(?:^|\s)jezyk\s+([a-z]+)/)?.[1];
	if (languageName) return languageName.slice(0, 3);

	return Array.from(trimmedName.toLocaleLowerCase('pl-PL')).slice(0, 3).join('');
}


export function Schedule({ widgetId, moveWidget, data }) {
	const schedule = data.schedule;
	const possibleLayout = [
		{ w: 4, h: 6 },
		{ w: 2, h: 1 },
		{ w: 4, h: 1 },
		{ w: 2, h: 5 },
	];
	const fullSize = {w: 4, h: 6}
	const {
		width,
		height,
		previewWidth,
		previewHeight,
		widgetRef,
		resizeZoneRef,
		resizingRef,
	} = useWidgetResize(possibleLayout, widgetId, 16, fullSize, true, {w: 2, h: 1});
	useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget, widgetId);

	function formatTodayKey() {
		const weekdayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
		return weekdayKeys[new Date().getDay()];
	}

	function compareTimes(left, right) {
		const leftStart = left.split('-')[0];
		const rightStart = right.split('-')[0];
		const [leftHour, leftMinute] = leftStart.split(':').map(Number);
		const [rightHour, rightMinute] = rightStart.split(':').map(Number);

		return leftHour * 60 + leftMinute - (rightHour * 60 + rightMinute);
	}

	function formatDayLabel(day, label) {
		const dayLabels = {
			monday: 'Pon',
			tuesday: 'Wt',
			wednesday: 'Śr',
			thursday: 'Czw',
			friday: 'Pt',
			saturday: 'Sob',
			sunday: 'Niedz',
		};

		return dayLabels[day] || label;
	}

	function ScheduleGrid({ scheduleData, mode = 'today' }) {
		const allDays = Object.keys(scheduleData || {});
		const todayKey = formatTodayKey();
		const visibleDays = mode === 'today'
			? allDays.filter((day) => day === todayKey)
			: allDays;
		const fallbackDays = mode === 'today' && visibleDays.length === 0 && allDays.length > 0
			? [allDays[0]]
			: visibleDays;
		const scheduleDays = fallbackDays;
		const visibleTimes = Array.from(
			new Set(
				scheduleDays.flatMap((day) => Object.keys(scheduleData?.[day] || {}))
			)
		).sort(compareTimes);

		if (scheduleDays.length === 0 || visibleTimes.length === 0) {
			return null;
		}

		if (mode === 'today') {
			const day = scheduleDays[0];

			return (
				<div className="schedule-grid today">
					{visibleTimes.map((time) => (
						<div
							key={`${day}-${time}`}
							className="schedule-row"
							style={{ gridTemplateColumns: '42px minmax(0, 1fr)' }}
						>
							<div className="time-cell">
								<span>{time.split('-')[0]}</span>
								<span>{time.split('-')[1]}</span>
							</div>
							<div className="lesson-cell">
								<a href={scheduleData?.[day]?.[time]?.subjectHref}>
									{shortenLessonName(scheduleData?.[day]?.[time]?.subject || '')}
								</a>
							</div>
						</div>
					))}
				</div>
			);
		}

		return (
			<div className="schedule-grid weekly">
				<div
					className="schedule-days-header"
					style={{ gridTemplateColumns: `repeat(${scheduleDays.length}, minmax(0, 1fr))` }}
				>
					{scheduleDays.map((day) => {
						const firstLesson = Object.values(scheduleData?.[day] || {})[0];
						const label = firstLesson?.day || day;

						return <div key={day} className="schedule-head">{formatDayLabel(day, label)}</div>;
					})}
				</div>

				{visibleTimes.map((time) => (
					<div
						key={time}
						className="schedule-row"
						style={{ gridTemplateColumns: `42px repeat(${scheduleDays.length}, minmax(0, 1fr))` }}
					>
						<div className="time-cell">
							<span>{time.split('-')[0]}</span>
							<span>{time.split('-')[1]}</span>
						</div>

						{scheduleDays.map((day) => {
							const lesson = scheduleData?.[day]?.[time];

							return (
								<div key={`${day}-${time}`} className="lesson-cell">
									<a href={lesson?.subjectHref}>
										{shortenLessonName(lesson?.subject || '')}
									</a>
								</div>
							);
						})}
					</div>
				))}
			</div>
		);
	}



	function Schedule21 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<div className={"small-title-box"}>
				<h1>Plan Lekcji</h1>
				<svg className={"titleArrow"} fill="currentColor" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
				     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
				     width="16px" height="16px" viewBox="0 0 42 42" xml:space="preserve">
					<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "/>
			</svg>
			</div>
		</div>)
	}

	function Schedule41 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<div className={"small-title-box"}>
				<div className={"titleIcon"}>
					<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M3 9.5H21M3 14.5H21M8 4.5V19.5M6.2 19.5H17.8C18.9201 19.5 19.4802 19.5 19.908 19.282C20.2843 19.0903 20.5903 18.7843 20.782 18.408C21 17.9802 21 17.4201 21 16.3V7.7C21 6.5799 21 6.01984 20.782 5.59202C20.5903 5.21569 20.2843 4.90973 19.908 4.71799C19.4802 4.5 18.9201 4.5 17.8 4.5H6.2C5.0799 4.5 4.51984 4.5 4.09202 4.71799C3.71569 4.90973 3.40973 5.21569 3.21799 5.59202C3 6.01984 3 6.57989 3 7.7V16.3C3 17.4201 3 17.9802 3.21799 18.408C3.40973 18.7843 3.71569 19.0903 4.09202 19.282C4.51984 19.5 5.07989 19.5 6.2 19.5Z" stroke="currentColor" stroke-width="2"/>
					</svg>
				</div>
				<h1>Plan Lekcji</h1>
				<svg className={"titleArrow"} fill="currentColor" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
				     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
				     width="16px" height="16px" viewBox="0 0 42 42" xml:space="preserve">
					<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "/>
			</svg>
			</div>
		</div>)
	}

	function Schedule25 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<div className="widget-title-box">
				<h1>Plan Lekcji</h1>
				<svg className={"titleArrow"} fill="currentColor" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
				     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
				     width="16px" height="16px" viewBox="0 0 42 42" xml:space="preserve">
					<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "/>
					</svg>
			</div>

			<ScheduleGrid scheduleData={schedule} mode="today" />
		</div>)
	}

	function Schedule46 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<div className="widget-title-box">
				<h1>Plan Lekcji</h1>
				<svg className={"titleArrow"} fill="currentColor" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
				     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
				     width="16px" height="16px" viewBox="0 0 42 42" xml:space="preserve">
					<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "/>
					</svg>
			</div>

			<ScheduleGrid scheduleData={schedule} mode="all" />
		</div>)
	}

	const gradeVariants = {
		'21': Schedule21,
		'41': Schedule41,
		'46': Schedule46,
		'25': Schedule25,
	};

	const Variant = gradeVariants[`${width}${height}`] || Schedule21;

	return (
		<div ref={widgetRef} id="scheduleWidget" data-widget-id={widgetId} className={`widget w${width} h${height} ${window.editMode ? 'edit-mode' : ''}`}>
			<div
				className="inner-widget"
				style={{ width: `${previewWidth}px`, height: `${previewHeight}px`, position: 'relative' }}
			>
				<Variant />
				<div ref={resizeZoneRef} className="resize-zone"></div>
			</div>
		</div>
	);
}
