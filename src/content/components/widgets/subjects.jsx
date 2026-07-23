import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { useWidgetResize } from './widgetResize.js';
import { useWidgetDragging } from './widgetDragging.js';


export function Subjects({ widgetId, moveWidget, data }) {
	const subjects = data.subjects;
	const possibleLayout = [
		{ w: 4, h: 4 },
		{ w: 2, h: 1 },
		{ w: 4, h: 1 },
	];
	const fullSize = {w: 4, h: 5}
	const {
		width,
		height,
		previewWidth,
		previewHeight,
		openPopup,
		widgetRef,
		resizeZoneRef,
		resizingRef,
	} = useWidgetResize(possibleLayout, widgetId, 16, fullSize);
	useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget, widgetId);

	function SubjectRow({ item, isLast = false, showDescription = false }) {
		return (
			<div className={`widget-subject-box ${isLast ? 'last' : ''}`}>
				<a href={item.url}>{item.name}</a>
			</div>
		);
	}

	function SubjectsList({lastLine = 1, classInfo = false}) {
		return (
			<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
				<div className="widget-title-box">
					<h1>Przedmioty</h1>
				</div>
				{classInfo ? <a href={subjects.classInfo.url} className="widget-subjects-class">{subjects.classInfo.name}</a> : null}
				<div className="widget-subjects-list">
					{subjects.subjects.map((item, index) => (
						<SubjectRow
							key={`${item.name}-${index}`}
							item={item}
							isLast={index === subjects.subjects.length - lastLine || index === subjects.subjects.length - 1}
						/>
					))}
				</div>

			</div>
		);
	}

	function Subjects44 () {
		return(<SubjectsList lastLine={2} />)
	}


	function Subjects21 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<h1>Przedmiot</h1>
		</div>)
	}

	function Subjects41 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<h1>Przedmioty</h1>
		</div>)
	}

	function Subjects45 () {
		return(<SubjectsList lastLine={2} classInfo={true}/>)
	}

	const gradeVariants = {
		'44': Subjects44,
		'21': Subjects21,
		'41': Subjects41,
		'45': Subjects45,
	};

	const Variant = gradeVariants[`${width}${height}`] || Subjects21;

	return (
		<div ref={widgetRef} id="subjectsWidget" data-widget-id={widgetId} className={`widget w${width} h${height} ${window.editMode ? 'edit-mode' : ''} ${openPopup ? 'popup-open' : ''}`}>
			<div
				className={`inner-widget ${openPopup ? 'widget-popup open widget-popup-open' : ''}`}
				style={{ width: `${previewWidth}px`, height: `${previewHeight}px`, position: 'relative' }}
			>
				<Variant />
				<div ref={resizeZoneRef} className="resize-zone"></div>
			</div>
		</div>
	);
}
