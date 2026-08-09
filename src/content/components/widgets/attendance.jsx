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
			<div className={"small-title-box"}>
				<h1>Obecność</h1>
				<svg className={"titleArrow"} fill="currentColor" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
				     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
				     width="16px" height="16px" viewBox="0 0 42 42" xml:space="preserve">
					<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "/>
			</svg>
			</div>
		</div>)
	}

	function Attendance41 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<div className={"small-title-box"}>
				<div className={"titleIcon"}>
					<svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transform: "translateY(-1px)"}}>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M6.31317 12.463C6.20006 9.29213 8.60976 6.6252 11.701 6.5C14.7923 6.6252 17.202 9.29213 17.0889 12.463C17.0889 13.78 18.4841 15.063 18.525 16.383C18.525 16.4017 18.525 16.4203 18.525 16.439C18.5552 17.2847 17.9124 17.9959 17.0879 18.029H13.9757C13.9786 18.677 13.7404 19.3018 13.3098 19.776C12.8957 20.2372 12.3123 20.4996 11.701 20.4996C11.0897 20.4996 10.5064 20.2372 10.0923 19.776C9.66161 19.3018 9.42346 18.677 9.42635 18.029H6.31317C5.48869 17.9959 4.84583 17.2847 4.87602 16.439C4.87602 16.4203 4.87602 16.4017 4.87602 16.383C4.91795 15.067 6.31317 13.781 6.31317 12.463Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M9.42633 17.279C9.01212 17.279 8.67633 17.6148 8.67633 18.029C8.67633 18.4432 9.01212 18.779 9.42633 18.779V17.279ZM13.9757 18.779C14.3899 18.779 14.7257 18.4432 14.7257 18.029C14.7257 17.6148 14.3899 17.279 13.9757 17.279V18.779ZM12.676 5.25C13.0902 5.25 13.426 4.91421 13.426 4.5C13.426 4.08579 13.0902 3.75 12.676 3.75V5.25ZM10.726 3.75C10.3118 3.75 9.97601 4.08579 9.97601 4.5C9.97601 4.91421 10.3118 5.25 10.726 5.25V3.75ZM9.42633 18.779H13.9757V17.279H9.42633V18.779ZM12.676 3.75H10.726V5.25H12.676V3.75Z" fill="currentColor"/>
					</svg>
				</div>
				<h1>Obecność</h1>
				<svg className={"titleArrow"} fill="currentColor" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
				     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
				     width="16px" height="16px" viewBox="0 0 42 42" xml:space="preserve">
					<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "/>
			</svg>
			</div>
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
