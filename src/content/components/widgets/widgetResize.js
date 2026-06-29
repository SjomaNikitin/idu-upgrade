import { useEffect, useRef, useState } from 'preact/hooks';

function getPreviewSize(width, height, cellSize, gap) {
	return {
		width: (cellSize - 20) * width + gap * (width - 1),
		height: (cellSize - 20) * height + gap * (height - 1),
	};
}

export function useWidgetResize(possibleLayout, gap = 16) {
	function getCellSize() {
		const gridWidth = window.innerWidth;
		return gridWidth / 4;
	}

	const [width, setWidth] = useState(2);
	const [height, setHeight] = useState(2);
	const [previewWidth, setPreviewWidth] = useState(getPreviewSize(2, 2, getCellSize(), gap).width);
	const [previewHeight, setPreviewHeight] = useState(getPreviewSize(2, 2, getCellSize(), gap).height);
	const resizingRef = useRef(false);
	const widgetRef = useRef(null);
	const resizeZoneRef = useRef(null);

	function calcCornerPositions() {
		const widget = widgetRef.current;
		if (!widget) return [];

		const cellSize = getCellSize();
		const positions = [];

		for (let i = 0; i < possibleLayout.length; i++) {
			const layout = possibleLayout[i];
			const x = (layout.w) * cellSize;
			const y = (layout.h) * cellSize;
			const realX = widget.getBoundingClientRect().left + x;
			const realY = widget.getBoundingClientRect().top + y;
			positions.push({ realX, realY });
		}

		return positions;
	}

	function dynamicSizeUpdate(e) {
		if (!resizingRef.current) return;

		const positions = calcCornerPositions();
		if (!positions.length) return;

		const pointerPos = { x: e.clientX, y: e.clientY };
		const bestOption = { index: -1, distance: 99999 };

		for (let i = 0; i < positions.length; i++) {
			const position = positions[i];
			const distance = Math.hypot(
				pointerPos.x - position.realX,
				pointerPos.y - position.realY
			);

			if (distance < bestOption.distance) {
				bestOption.index = i;
				bestOption.distance = distance;
			}
		}

		const nextLayout = possibleLayout[bestOption.index];
		const preview = getPreviewSize(nextLayout.w, nextLayout.h, getCellSize(), gap);

		setWidth(nextLayout.w);
		setHeight(nextLayout.h);
		setPreviewWidth(preview.width);
		setPreviewHeight(preview.height);
	}

	useEffect(() => {
		const resizeZone = resizeZoneRef.current;
		if (!resizeZone) return undefined;

		function startResize() {
			resizingRef.current = true;
		}

		function stopResize() {
			resizingRef.current = false;
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

	return {
		width,
		height,
		previewWidth,
		previewHeight,
		widgetRef,
		resizeZoneRef,
	};
}
