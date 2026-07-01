import { h, Fragment } from 'preact';
import { useEffect, useRef, useState} from 'preact/hooks';
import { useWidgetResize } from './widgetResize.js';
import { useWidgetDragging } from './widgetDragging.js';


export function Schedule({ widgetId, moveWidget, data }) {
	const schedule = data.schedule;
	const possibleLayout = [
		{ w: 4, h: 4 },
		{ w: 2, h: 1 },
		{ w: 4, h: 1 },
		{ w: 2, h: 4 },
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
		const today = new Date();
		return `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}`;
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
				className="schedule-grid"
				style={{
					gridTemplateColumns: `72px repeat(${scheduleDays.length}, 1fr)`,
				}}
			>
				<div className="schedule-head"></div>

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
						<div className="time-cell">{time}</div>

						{scheduleDays.map((day) => {
							const lesson = scheduleData?.[day]?.[time];

							return (
								<div key={`${day}-${time}`} className="lesson-cell">
									{lesson?.subject || ''}
								</div>
							);
						})}
					</Fragment>
				))}
			</div>
		);
	}

	function Schedule44 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<div className="widget-title-box">
				<h1>PLAN LEKCJI</h1>
			</div>
		</div>)
	}


	function Schedule21 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<h1>PLAN LEKCJI</h1>
		</div>)
	}

	function Schedule41 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<h1>PLAN LEKCJI</h1>
		</div>)
	}

	function Schedule24 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<div className="widget-title-box">
				<h1>PLAN LEKCJI</h1>
			</div>
			<ScheduleGrid scheduleData={schedule} mode="today" />
		</div>)
	}

	function Schedule46 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<h1>PLAN LEKCJI</h1>
		</div>)
	}

	const gradeVariants = {
		'44': Schedule44,
		'21': Schedule21,
		'41': Schedule41,
		'46': Schedule46,
		'24': Schedule24,
	};

	const Variant = gradeVariants[`${width}${height}`] || Schedule21;

	return (
		<div ref={widgetRef} id="scheduleWidget" data-widget-id={widgetId} className={`widget w${width} h${height}`}>
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
