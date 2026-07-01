import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { useWidgetResize } from './widgetResize.js';
import { useWidgetDragging } from './widgetDragging.js';


export function SubjectNews({ widgetId, moveWidget, data }) {
	const subjectNews = data.subjectAnnouncements;
	const possibleLayout = [
		{ w: 2, h: 2 },
		{ w: 4, h: 2 },
		{ w: 2, h: 1 },
		{ w: 4, h: 1 },
	];
	const fullSize = {w: 4, h: 4}
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


	function GradeRow({ item, isLast = false, showDescription = false }) {
		return (
			<div className={`widget-grade-box ${isLast ? 'last' : ''}`}>
				<p>{item.value}</p>
				<a href={item.subjectUrl}> | {item.subject}</a>
				{showDescription && <a className="grade-description">{item.description}</a>}
			</div>
		);
	}

	function GradesList({ limit, lastLine = 1,showDescription = false}) {
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
			</div>
		);
	}

	function Announcements22 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<div className="widget-title-box">
				<h1>OGŁOSZENIA PRZEDMIOTOWE</h1>
			</div>
		</div>)
	}

	function Announcements42 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<div className="widget-title-box">
				<h1>OGŁOSZENIA PRZEDMIOTOWE</h1>
			</div>
		</div>)
	}

	function Announcements21 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<h1>OGŁOSZENIA PRZEDMIOTOWE</h1>
		</div>)
	}

	function Announcements41 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<h1>OGŁOSZENIA PRZEDMIOTOWE</h1>
		</div>)
	}

	function Announcements44 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<div className="widget-title-box">
				<h1>OGŁOSZENIA PRZEDMIOTOWE</h1>
			</div>
		</div>)
	}

	const gradeVariants = {
		'22': Announcements22,
		'42': Announcements42,
		'21': Announcements21,
		'41': Announcements41,
		'46': Announcements44,
	};

	const Variant = gradeVariants[`${width}${height}`] || Announcements22;

	return (
		<div ref={widgetRef} id="announcementsWidget" data-widget-id={widgetId} className={`widget w${width} h${height}`}>
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
