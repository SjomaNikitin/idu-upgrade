import { h } from 'preact';
import { useWidgetResize } from './widgetResize.js';

export function Grades() {
	const possibleLayout = [
		{ w: 2, h: 2 },
		{ w: 2, h: 4 },
		{ w: 4, h: 2 },
		{ w: 2, h: 1 },
		{ w: 4, h: 1 },
		{ w: 4, h: 4 },
	];
	const {
		width,
		height,
		previewWidth,
		previewHeight,
		widgetRef,
		resizeZoneRef,
	} = useWidgetResize(possibleLayout);

	return (
		<div ref={widgetRef} id="gradesWidget" className={`widget w${width} h${height}`}>
			<div
				className="inner-widget"
				style={{ width: `${previewWidth}px`, height: `${previewHeight}px` }}
			></div>
			<div ref={resizeZoneRef} className="resize-zone"></div>
		</div>
	);
}
