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
			<h1>Plan Lekcji</h1>
		</div>)
	}

	function Schedule41 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<h1>Plan Lekcji</h1>
		</div>)
	}

	function Schedule25 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<div className="widget-title-box" style={{marginBottom: '1rem'}}>
				<h1>Plan Lekcji</h1>
			</div>
			<ScheduleGrid scheduleData={schedule} mode="today" />
		</div>)
	}

	function Schedule46 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<div className="widget-title-box" style={{marginBottom: '1rem'}}>
				<h1>Plan Lekcji</h1>
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
