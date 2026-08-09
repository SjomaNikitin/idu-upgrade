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
					<svg className={"titleArrow"} fill="currentColor" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
					     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
					     width="16px" height="16px" viewBox="0 0 42 42" xml:space="preserve">
					<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "/>
					</svg>
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
			<div className={"small-title-box"}>
				<h1>Przedmioty</h1>
				<svg className={"titleArrow"} fill="currentColor" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
				     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
				     width="16px" height="16px" viewBox="0 0 42 42" xml:space="preserve">
					<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "/>
			</svg>
			</div>
		</div>)
	}

	function Subjects41 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<div className={"small-title-box"}>
				<div className={"titleIcon"}>
					<svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
					     viewBox="0 0 32 32" xml:space="preserve" stroke="currentColor" fill="none" width="28px" height="28px">
						<polygon class="st0" points="4,11 15,18 28,9 17,2 " stroke="currentColor"/>
						<path class="st0" d="M4,11v6l11,7l13-9l0,0c-1.2-1.2-1.5-3-0.7-4.5L28,9" stroke="currentColor"/>
						<path class="st0" d="M4,17v6l11,7l13-9l0,0c-1.2-1.2-1.5-3-0.7-4.5L28,15" stroke="currentColor"/>
					</svg>
				</div>
				<h1>Przedmioty</h1>
				<svg className={"titleArrow"} fill="currentColor" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
				     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
				     width="16px" height="16px" viewBox="0 0 42 42" xml:space="preserve">
					<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "/>
			</svg>
			</div>
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
		<div ref={widgetRef} id="subjectsWidget" data-widget-id={widgetId} className={`widget w${width} h${height} ${window.editMode ? 'edit-mode' : ''}`}>
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
