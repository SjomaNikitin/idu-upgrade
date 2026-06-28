import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

export function Grades() {
	function getPreviewSize(width, height, cellSize, gap) {
		return {
			width: (cellSize - 20) * width + gap * (width - 1),
			height: (cellSize - 20) * height + gap * (height - 1),
		};
	}

	const [width, setWidth] = useState(2);
	const [height, setHeight] = useState(2);
	const [previewWidth, setPreviewWidth] = useState(getPreviewSize(width, height, getCellSize(), 16).width);
	const [previewHeight, setPreviewHeight] = useState(getPreviewSize(width, height, getCellSize(), 16).height);
	const possibleLayout = [{ w: 2, h: 2 }, { w: 2, h: 4 }, { w: 4, h: 2 }, { w: 2, h: 1 }, { w: 4, h: 1 }, {w: 4, h: 4}];
	const resizingRef = useRef(false);
	const gradesWidgetRef = useRef(null);
	const resizeZoneRef = useRef(null);

	function getCellSize() {
		const gridWidth = window.innerWidth;
		return gridWidth / 4;
	}

	function calcCornerPositions () {
		const resizeZone = resizeZoneRef.current;
		const gradesWidget = gradesWidgetRef.current;
		if (!resizeZone || !gradesWidget) return [];

		let cellSize = getCellSize();
		let positions = [];
		for (let i = 0; i < possibleLayout.length; i++) {
			let layout = possibleLayout[i];
			let x = (layout.w - 1) * cellSize;
			let y = (layout.h - 1) * cellSize;
			let realX = gradesWidgetRef.current.getBoundingClientRect().left + x;
			let realY = gradesWidgetRef.current.getBoundingClientRect().top + y;
			positions.push({realX, realY});
		}
		return positions;
	}

	function dynamicSizeUpdate (e) {
		if (!resizingRef.current) return;

		let positions = calcCornerPositions();
		if (!positions.length) return;

		let pointerPos = {x: e.clientX, y: e.clientY};
		let bestOption = {index: -1, distance: 99999};
		for (let i=0; i<positions.length; i++) {
			let position = positions[i];
			let distance = Math.hypot(
				pointerPos.x - position.realX,
				pointerPos.y - position.realY
			);
			if (distance < bestOption.distance) {
				bestOption.index = i;
				bestOption.distance = distance;
			}
		}
		setWidth(possibleLayout[bestOption.index].w);
		setHeight(possibleLayout[bestOption.index].h);
		setPreviewWidth(getPreviewSize(possibleLayout[bestOption.index].w, possibleLayout[bestOption.index].h, getCellSize(), 16).width);
		setPreviewHeight(getPreviewSize(possibleLayout[bestOption.index].w, possibleLayout[bestOption.index].h, getCellSize(), 16).height);
	}



	useEffect(() => {
		const resizeZone = resizeZoneRef.current;
		if (!resizeZone) return undefined;

		function startResize() {
			resizingRef.current = true;
		}

		function stopResize(e) {
			if (resizingRef.current) {
				resizingRef.current = false;
			}
		}

		resizeZone.addEventListener('pointerdown', startResize);
		document.addEventListener('pointerup', stopResize);
		document.addEventListener('pointermove', dynamicSizeUpdate);

		return () => {
			resizeZone.removeEventListener('pointerdown', startResize);
			document.removeEventListener('pointerup', stopResize);
			document.removeEventListener('pointermove', dynamicSizeUpdate);
		};
	}, []);

	return (
		<div ref={gradesWidgetRef} id="gradesWidget" className={`widget w${width} h${height}`}>
			<div className="inner-widget" style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}}></div>
			<div ref={resizeZoneRef} className="resize-zone"></div>
		</div>
	);
}
