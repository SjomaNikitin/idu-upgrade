import { useEffect, useRef, useState } from 'preact/hooks';

function getPreviewSize(width, height, cellSize, gap) {
	return {
		width: (cellSize - 20) * width + gap * (width - 1),
		height: (cellSize - 20) * height + gap * (height - 1),
	};
}

export function useWidgetResize(possibleLayout, name, gap = 16, fullSize, popup = true,defaultSize = {w: 2, h: 2}) {
	function getCellSize() {
		const gridWidth = window.innerWidth;
		return gridWidth / 4;
	}

	const [width, setWidth] = useState(loadWidgetSize(name)?.w || defaultSize.w);
	const [height, setHeight] = useState(loadWidgetSize(name)?.h || defaultSize.h);
	const [previewWidth, setPreviewWidth] = useState(getPreviewSize(loadWidgetSize(name)?.w || defaultSize.w, loadWidgetSize(name)?.h || defaultSize.h, getCellSize(), gap).width);
	const [previewHeight, setPreviewHeight] = useState(getPreviewSize(loadWidgetSize(name)?.w || defaultSize.w, loadWidgetSize(name)?.h || defaultSize.h, getCellSize(), gap).height);
	const [openPopup, setOpenPopup] = useState(false);
	const resizingRef = useRef(false);
	const widgetRef = useRef(null);
	const resizeZoneRef = useRef(null);
	const widgetLastSizeRef = useRef(defaultSize);
	const widthRef = useRef(width);
	const heightRef = useRef(height);
	const openPopupRef = useRef(openPopup);
	const hiddenWidgetsRef = useRef([]);

	widthRef.current = width;
	heightRef.current = height;
	openPopupRef.current = openPopup;

	function setBlockingWidgetsHidden(hidden) {
		const widget = widgetRef.current;
		if (!widget) return;

		const widgets = Array.from(document.querySelectorAll('.widgets-grid .widget'));
		const currentIndex = widgets.findIndex((item) => item.dataset.widgetId === name);

		if (currentIndex === -1) return;

		if (!hidden) {
			hiddenWidgetsRef.current.forEach((item) => item.classList.remove('widget-popup-hidden'));
			hiddenWidgetsRef.current = [];
			return;
		}

		const rect = widget.getBoundingClientRect();
		const widgetCenter = rect.left + rect.width / 2;
		const isRightSided = widgetCenter > window.innerWidth / 2;

		if (!isRightSided) {
			hiddenWidgetsRef.current = [];
			return;
		}

		const blockingWidgets = widgets.slice(0, currentIndex).filter((candidate) => {
			const candidateRect = candidate.getBoundingClientRect();
			return candidateRect.top < rect.bottom && candidateRect.left < rect.left;
		});

		blockingWidgets.forEach((item) => item.classList.add('widget-popup-hidden'));
		hiddenWidgetsRef.current = blockingWidgets;
	}

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
		e.preventDefault();

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
		saveWidgetSize(nextLayout.w, nextLayout.h);
	}

	function saveWidgetSize(w, h) {
		localStorage.setItem(name, JSON.stringify({ w, h }));
	}

	function loadWidgetSize() {
		const raw = localStorage.getItem(name);
		if (!raw) return defaultSize;

		try {
			return JSON.parse(raw);
		} catch {
			return null;
		}
	}

	useEffect(() => {
		const resizeZone = resizeZoneRef.current;
		let activePointerId = null;
		if (!resizeZone) return undefined;

		function startResize(e) {
			if (!window.editMode) return;
			e.preventDefault();
			activePointerId = e.pointerId;
			resizeZone.setPointerCapture?.(e.pointerId);
			resizingRef.current = true;
		}

		function stopResize(e) {
			if (activePointerId !== null && e.pointerId !== activePointerId) return;
			resizingRef.current = false;
			if (activePointerId !== null) {
				resizeZone.releasePointerCapture?.(activePointerId);
				activePointerId = null;
			}
		}

		function togglePopup (e) {
			if (window.editMode) return;
			if (e.target.closest('a[href]')) return;
			if (!popup) return;
			let finalSize;
			if (openPopupRef.current) {
				finalSize = widgetLastSizeRef.current;
				setBlockingWidgetsHidden(false);
			} else {
				setBlockingWidgetsHidden(true);
				finalSize = fullSize;
				widgetLastSizeRef.current = { w: widthRef.current, h: heightRef.current };
			}
			const preview = getPreviewSize(finalSize.w, finalSize.h, getCellSize(), gap);
			setWidth(finalSize.w);
			setHeight(finalSize.h);
			setPreviewWidth(preview.width);
			setPreviewHeight(preview.height);
			setOpenPopup(!openPopupRef.current);
		}

		resizeZone.addEventListener('pointerdown', startResize);
		document.addEventListener('pointerup', stopResize);
		document.addEventListener('pointermove', dynamicSizeUpdate);

		widgetRef.current.addEventListener('click', togglePopup);

		return () => {
			resizeZone.removeEventListener('pointerdown', startResize);
			document.removeEventListener('pointerup', stopResize);
			document.removeEventListener('pointermove', dynamicSizeUpdate);
			widgetRef.current.removeEventListener('click', togglePopup);
			setBlockingWidgetsHidden(false);
		};
	}, []);

	return {
		width,
		height,
		previewWidth,
		previewHeight,
		openPopup,
		widgetRef,
		resizeZoneRef,
		resizingRef
	};
}
