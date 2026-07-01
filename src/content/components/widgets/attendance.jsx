import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { useWidgetResize } from './widgetResize.js';
import { useWidgetDragging } from './widgetDragging.js';


export function Attendance({ widgetId, moveWidget, data }) {
	const attendance = data.attendance;
	const possibleLayout = [
		{ w: 2, h: 2 },
		{ w: 2, h: 4 },
		{ w: 4, h: 2 },
		{ w: 2, h: 1 },
		{ w: 4, h: 1 },
		{ w: 4, h: 4 },
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

	async function fetchAttendanceStats() {
		const res = await fetch(attendance[0].seeMoreUrl, {
			credentials: 'include',
		});

		const html = await res.text();
		const doc = new DOMParser().parseFromString(html, 'text/html');

		const table = doc.querySelectorAll('table')[1];
		if (!table) return null;

		const summaryRow = table.querySelector('tbody tr');

		const summaryCells = summaryRow?.querySelectorAll('td span');
		if (summaryCells.length < 3) return null
		const summary = {
			presence: Number(
				summaryCells?.[0].innerHTML.match(/\(([\d,]+)%\)/)?.[1].replace(',', '.')
			),
			absence: Number(
				summaryCells?.[1].innerHTML.match(/\(([\d,]+)%\)/)?.[1].replace(',', '.')
			),
			lateness: Number(
				summaryCells?.[2].innerHTML.match(/\(([\d,]+)%\)/)?.[1].replace(',', '.')
			),
		};

		return summary;
	}


	function GradeRow({ item, isLast = false, showDescription = false }) {
		return (
			<div className={`widget-grade-box ${isLast ? 'last' : ''}`}>
				<p>{item.value}</p>
				<a href={item.subjectUrl}> | {item.subject}</a>
				{showDescription && <a className="grade-description">{item.description}</a>}
			</div>
		);
	}

	function GradesList({ limit, lastLine = 1,showDescription = false,allHref=false}) {
		const visibleGrades = preparedGrades.slice(0, limit);

		return (
			<div
				style={{ width: `${previewWidth}px`, height: `${previewHeight}px` }}
				className="widget-content-container"
			>
				<div className="widget-title-box">
					<h1>OCENY</h1>
				</div>

				{visibleGrades.map((item, index) => (
					<GradeRow
						key={`${item.subjectUrl}-${index}`}
						item={item}
						isLast={index === visibleGrades.length - lastLine || index === visibleGrades.length - 1}
						showDescription={showDescription}
					/>
				))}

				{allHref && <a className="grades-all-link" href={gradesData[0].seeMoreUrl}>Wszystkie oceny</a>}
			</div>
		);
	}

	function AttendanceChart({ stats }) {
		if (!stats) return null;
		let attendancePercentage = stats.presence;
		if (Number.isNaN(attendancePercentage)) attendancePercentage = 0;
		let latencyPercentage = stats.lateness;
		if (Number.isNaN(latencyPercentage)) latencyPercentage = 0;
		let absencePercentage = stats.absence;
		if (Number.isNaN(absencePercentage)) absencePercentage = 0;
		return (
			<div
				className="donut-3"
				style={{
					'--part1': `${attendancePercentage}%`,
					'--part2': `${latencyPercentage}%`,
					'--part3': `${absencePercentage}%`,
				}}
			>
				<div className="donut-inner">{Math.round(attendancePercentage)}%</div>
			</div>
		);
	}

	function Attendance22 () {
		const [stats, setStats] = useState(null);

		useEffect(() => {
			async function loadStats() {
				const data = await fetchAttendanceStats();
				setStats(data);
			}

			loadStats();
		}, []);

		if (!stats) return <div style={{padding: '16px'}}>Loading...</div>;
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<AttendanceChart stats={stats} />
		</div>)
	}

	function Attendance24 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<h1>OBECNOŚĆ</h1>
		</div>)
	}

	function Attendance42 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<h1>OBECNOŚĆ</h1>
		</div>)
	}

	function Attendance21 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<h1>OBECNOŚĆ</h1>
		</div>)
	}

	function Attendance41 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<h1>OBECNOŚĆ</h1>
		</div>)
	}

	function Attendance44 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<h1>OBECNOŚĆ</h1>
		</div>)
	}

	function Attendance46 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<h1>OBECNOŚĆ</h1>
		</div>)
	}

	const widgetVariants = {
		'22': Attendance22,
		'24': Attendance24,
		'42': Attendance42,
		'21': Attendance21,
		'41': Attendance41,
		'44': Attendance44,
		'46': Attendance46,
	};

	const Variant = widgetVariants[`${width}${height}`] || Grades22;

	return (
		<div ref={widgetRef} id="newsWidget" data-widget-id={widgetId} className={`widget w${width} h${height}`}>
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
