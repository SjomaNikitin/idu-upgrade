import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { useWidgetResize } from './widgetResize.js';
import { useWidgetDragging } from './widgetDragging.js';

function Grades22 () {
	return(<div>22</div>)
}

function Grades24 () {
	return(<div>24</div>)
}

function Grades42 () {
	return(<div>42</div>)
}

function Grades21 () {
	return(<div>21</div>)
}

function Grades41 () {
	return(<div>41</div>)
}

export function Grades({ widgetId, moveWidget }) {
	const possibleLayout = [
		{ w: 2, h: 2 },
		{ w: 2, h: 4 },
		{ w: 4, h: 2 },
		{ w: 2, h: 1 },
		{ w: 4, h: 1 },
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
	} = useWidgetResize(possibleLayout, "grades",16, fullSize);
	useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget, widgetId);

	const gradeVariants = {
		'22': Grades22,
		'24': Grades24,
		'42': Grades42,
		'21': Grades21,
		'41': Grades41,
	};

	const Variant = gradeVariants[`${width}${height}`] || Grades22;

	return (
		<div ref={widgetRef} id="gradesWidget" data-widget-id={widgetId} className={`widget w${width} h${height}`}>
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
