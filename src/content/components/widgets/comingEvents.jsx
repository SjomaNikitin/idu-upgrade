import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { useWidgetResize } from './widgetResize.js';
import { useWidgetDragging } from './widgetDragging.js';


export function ComingEvents({ widgetId, moveWidget, data }) {
	const schoolNR = 35;
	const possibleLayout = [
		{ w: 2, h: 1 },
		{ w: 4, h: 1 },
	];
	const fullSize = {w: 4, h: 1}
	const {
		width,
		height,
		previewWidth,
		previewHeight,
		widgetRef,
		resizeZoneRef,
		resizingRef,
	} = useWidgetResize(possibleLayout, widgetId, 16, fullSize, false, possibleLayout[0]);
	useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget, widgetId);

	function Messages21 () {
		return(<div onClick={() => window.open("/public_calendar/" + schoolNR, "_self")} style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<h1>Nadchodzące Wydarzenia</h1>
		</div>)
	}

	function Messages41 () {
		return(<div onClick={() => window.open("/public_calendar/" + schoolNR, "_self")} style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<h1>Nadchodzące Wydarzenia</h1>
		</div>)
	}

	const contentVariants = {
		'21': Messages21,
		'41': Messages41,
	};

	const Variant = contentVariants[`${width}${height}`] || Messages21;

	return (
		<div ref={widgetRef} id="comingEventsWidgetWidget" data-widget-id={widgetId} className={`widget w${width} h${height}`}>
			<div
				className="inner-widget"
				style={{ width: `${previewWidth}px`, height: `${previewHeight}px`, position: 'relative' }}
			>
				<Variant/>
				<div ref={resizeZoneRef} className="resize-zone"></div>
			</div>
		</div>
	);
}
