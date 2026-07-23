import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { useWidgetResize } from './widgetResize.js';
import { useWidgetDragging } from './widgetDragging.js';


export function Attendance({ widgetId, moveWidget, data }) {
	const attendance = data.attendance;
	const mockData = data.attendance[0].mockData;
	let possibleLayout;
	if (mockData) {
		possibleLayout = [
			{ w: 2, h: 4 },
			{ w: 4, h: 2 },
			{ w: 2, h: 1 },
			{ w: 4, h: 1 },
			{ w: 4, h: 4 },
		];
	} else {
		possibleLayout = [
			{ w: 2, h: 2 },
			{ w: 2, h: 4 },
			{ w: 4, h: 2 },
			{ w: 2, h: 1 },
			{ w: 4, h: 1 },
			{ w: 4, h: 4 },
		];
	}

	const fullSize = {w: 4, h: 4}
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

	function normalizePercentage(value) {
		const number = Number(value);
		return Number.isFinite(number) ? number : 0;
	}

	function normalizeLessonName(lessonName) {
		let names = ['fizyczne', 'WF', 'godzina', 'GW', 'biznes', 'BIZ', 'kultura', 'kultura']
		for (let i=0; i<names.length; i+=2) {
			if (lessonName.includes(names[i])){
				return names[i+1]
			}
		}
		return lessonName;
	}

	function loadData(storageKey) {
		const saved = localStorage.getItem(storageKey);

		if (!saved) return null;

		try {
			return JSON.parse(saved);
		} catch {
			return null;
		}
	}

	async function fetchAttendanceStats() {
		let attendanceData = loadData('attendance')
		if (attendanceData && attendanceData.date === new Date().getDate()) {
			return attendanceData.summary;
		}
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
		localStorage.setItem('attendance', JSON.stringify({summary: summary, date: new Date().getDate()}));
		return summary;
	}

	function AttendanceRow ({item, rowWidth}){
		return(<div className="attendance-row" style={{width: rowWidth}}>
			<div className="attendance-row-subject" >{normalizeLessonName(item.subject)}</div>
			<div className={`attendance-row-value ${item.presence? 'ob' : ''} ${item.absence? 'nob' : ''} ${item.lateness? 'sp' : ''}`}>{item.presence? `OB` : ''} {item.absence? `NOB` : ''} {item.lateness? `SP` : ''}</div>
		</div>)
	}

	function AttendanceGrid ({limit, width = "100%", graph = false, rowWidth = "100%", showMore = false}) {
		let usableData = attendance.slice(0, limit);
		const seeMoreHref = attendance[0]?.seeMoreUrl;
		const shouldShowSeeMore = showMore && seeMoreHref && seeMoreHref !== 'mogData';
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<div className="widget-title-box" style={{marginBottom: 'var(--padding-1)'}}>
				<h1>Obecność</h1>
			</div>
			<div className="attendance-grid" style={{width: width}}>
				{usableData.map((item, index) => (
					<AttendanceRow
						key={`${item.subjectUrl}-${index}`}
						item={item}
						rowWidth={rowWidth}
					/>
				))}
			</div>
			{graph? <AttendanceChart width={width}/> : null}
			{shouldShowSeeMore ? <a href={seeMoreHref} className="grades-all-link">Zobacz więcej</a> : null}
		</div>)
	}

	function AttendanceChart({width = "100%"}) {
		const [stats, setStats] = useState(null);

		if (mockData) {
			return <div style={{ padding: '16px' }}>...</div>;

		}

		useEffect(() => {
			let cancelled = false;

			async function loadStats() {
				const data = await fetchAttendanceStats();
				data.lateness = normalizePercentage(data.lateness);
				data.absence = normalizePercentage(data.absence);
				data.presence = normalizePercentage(data.presence);

				if (!cancelled) {
					setStats(data);
				}
			}

			loadStats();

			return () => {
				cancelled = true;
			};
		}, []);

		if (!stats) {
			return <div style={{ padding: '16px' }}>Loading...</div>;
		}

		let attendancePercentage = stats.presence;
		if (Number.isNaN(attendancePercentage)) attendancePercentage = 0;

		let latenessPercentage = stats.lateness;
		if (Number.isNaN(latenessPercentage)) latenessPercentage = 0;

		let absencePercentage = stats.absence;
		if (Number.isNaN(absencePercentage)) absencePercentage = 0;

		return (
			<div
				className="donut-3"
				style={{
					'--part1': `${attendancePercentage}%`,
					'--part2': `${latenessPercentage}%`,
					'--part3': `${absencePercentage}%`,
					'width': width,
				}}
			>
				<div className="donut-inner">{Math.round(attendancePercentage)}%</div>
			</div>
		);
	}

	function Attendance22 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<AttendanceChart/>
		</div>)
	}

	function Attendance24 () {
		return(<AttendanceGrid limit={10} />)
	}

	function Attendance42 () {
		return(<AttendanceGrid limit={8} graph = {false} width={"100%"} rowWidth={"calc(50% - var(--padding-1))"}/>)
	}

	function Attendance21 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<h1>Obecność</h1>
		</div>)
	}

	function Attendance41 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<h1>Obecność</h1>
		</div>)
	}

	function Attendance44 () {
		return(<AttendanceGrid limit={10} width={"calc(50% - var(--padding-1))"} graph = {true} showMore={true}/>)
	}

	function Attendance46 () {
		return(<AttendanceGrid limit={attendance.length} width={"calc(50% - var(--padding-1))"} graph = {true}/>)
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
		<div ref={widgetRef} id="attendanceWidget" data-widget-id={widgetId} className={`widget w${width} h${height} ${window.editMode ? 'edit-mode' : ''}`}>
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
