import { h, Fragment } from 'preact';
import { useEffect, useRef, useState} from 'preact/hooks';
import { useWidgetResize } from './widgetResize.js';
import { useWidgetDragging } from './widgetDragging.js';


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
	} = useWidgetResize(possibleLayout, widgetId, 16, fullSize);
	useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget, widgetId);

	function formatTodayKey() {
		const weekdayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
		return weekdayKeys[new Date().getDay()];
	}

	function shortageNames (name) {
		const names = ['ang', 'angielski', 'pol', 'polski', 'biol', 'biologia', 'his', 'historia', 'biz', 'biznes', 'kul', 'kultura', 'wiedza', 'wos', 'fizyczne', 'wf'];
		for (let i=0; i < names.length / 2; i+=2) {
			if (name.includes(names[i])) {
				return names[i+1];
			}
		}
		return name;
	}

	function compareTimes(left, right) {
		const leftStart = left.split('-')[0];
		const rightStart = right.split('-')[0];
		const [leftHour, leftMinute] = leftStart.split(':').map(Number);
		const [rightHour, rightMinute] = rightStart.split(':').map(Number);

		return leftHour * 60 + leftMinute - (rightHour * 60 + rightMinute);
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

			return (
				<div
						className={mode !== 'today' ? 'schedule-grid' : 'schedule-grid today'}
						style={{
							gridTemplateColumns: mode === 'today'
								? '1fr'
								: `72px repeat(${scheduleDays.length}, 1fr)`,
						}}
					>
					{mode === 'today' ? null : <div className="schedule-head"></div>}

					{scheduleDays.map((day) => {
						const firstLesson = Object.values(scheduleData?.[day] || {})[0];
						const label = firstLesson?.day || day;

					return (
					<div key={day} className="schedule-head">
						{label}
					</div>
					);
				})}

					{visibleTimes.map((time) => (
						<Fragment key={time}>
							{mode === 'today' ? null : (
								<div className="time-cell">
									<span>{time.split('-')[0]}</span>
									<span>{time.split('-')[1]}</span>
								</div>
							)}

						{scheduleDays.map((day) => {
							const lesson = scheduleData?.[day]?.[time];

							return (
								<div key={`${day}-${time}`} className={mode !== 'today' ? 'lesson-cell' : 'lesson-cell today'}>
									{shortageNames(lesson?.subject || '')}
								</div>
							);
						})}
					</Fragment>
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
					<svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4 9L20 9M8 9V20M6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V7.2C21 6.0799 21 5.51984 20.782 5.09202C20.5903 4.71569 20.2843 4.40973 19.908 4.21799C19.4802 4 18.9201 4 17.8 4H6.2C5.0799 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.07989 3 7.2V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20Z" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
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
