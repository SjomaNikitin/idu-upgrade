import { useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks';

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
	const resizeFromRightRef = useRef(false);
	const resizeViewportTopRef = useRef(null);

	widthRef.current = width;
	heightRef.current = height;
	openPopupRef.current = openPopup;

	function hidePopupObstacles() {
		const widget = widgetRef.current;
		if (!widget?.parentElement) return;

		const widgetRect = widget.getBoundingClientRect();
		const siblings = Array.from(widget.parentElement.children);
		const widgetIndex = siblings.indexOf(widget);

		hiddenWidgetsRef.current = siblings.slice(0, widgetIndex).filter((sibling) => {
			if (!sibling.classList.contains('widget')) return false;

			const siblingRect = sibling.getBoundingClientRect();
			return siblingRect.top < widgetRect.bottom && siblingRect.bottom > widgetRect.top;
		});

		hiddenWidgetsRef.current.forEach((sibling) => {
			sibling.classList.add('widget-popup-obstacle');
		});

		if (hiddenWidgetsRef.current.length) {
			widget.dataset.popupFromRight = '';
		}
	}

	function restorePopupObstacles() {
		hiddenWidgetsRef.current.forEach((sibling) => {
			sibling.classList.remove('widget-popup-obstacle');
		});
		hiddenWidgetsRef.current = [];
		if (widgetRef.current) delete widgetRef.current.dataset.popupFromRight;
	}

	function updateResizeSide() {
		const widget = widgetRef.current;
		if (!widget) return;

		if (!window.editMode) {
			delete widget.dataset.resizeFromRight;
			return;
		}

		// Preserve the anchor of a full-width widget so it can shrink back
		// toward the side it expanded from.
		if (widthRef.current === 4) return;

		const grid = widget.parentElement;
		if (!grid) return;

		const widgetRect = widget.getBoundingClientRect();
		const gridRect = grid.getBoundingClientRect();
		const gridStyle = getComputedStyle(grid);
		const contentLeft = gridRect.left + parseFloat(gridStyle.paddingLeft || 0);
		const contentRight = gridRect.right - parseFloat(gridStyle.paddingRight || 0);
		const distanceFromLeft = Math.abs(widgetRect.left - contentLeft);
		const distanceFromRight = Math.abs(contentRight - widgetRect.right);

		if (distanceFromRight < distanceFromLeft) {
			widget.dataset.resizeFromRight = '';
		} else {
			delete widget.dataset.resizeFromRight;
		}
	}

	function calcCornerPositions() {
		const widget = widgetRef.current;
		if (!widget) return [];

		const cellSize = getCellSize();
		const positions = [];
		const widgetRect = widget.getBoundingClientRect();

		for (let i = 0; i < possibleLayout.length; i++) {
			const layout = possibleLayout[i];
			const preview = getPreviewSize(layout.w, layout.h, cellSize, gap);
			const realX = resizeFromRightRef.current
				? widgetRect.right - preview.width
				: widgetRect.left + preview.width;
			const realY = widgetRect.top + preview.height;
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
		if (nextLayout.w === widthRef.current && nextLayout.h === heightRef.current) return;

		resizeViewportTopRef.current = widgetRef.current.getBoundingClientRect().top;
		const preview = getPreviewSize(nextLayout.w, nextLayout.h, getCellSize(), gap);

		widthRef.current = nextLayout.w;
		heightRef.current = nextLayout.h;
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

	useLayoutEffect(() => {
		if (resizeViewportTopRef.current === null) return;

		const widget = widgetRef.current;
		const previousTop = resizeViewportTopRef.current;
		resizeViewportTopRef.current = null;
		if (!widget) return;

		const topDelta = widget.getBoundingClientRect().top - previousTop;
		if (Math.abs(topDelta) > 1) window.scrollBy(0, topDelta);
	}, [width, height]);

	useEffect(() => {
		if (!openPopup) restorePopupObstacles();
	}, [openPopup]);

	useEffect(() => {
		const resizeZone = resizeZoneRef.current;
		let activePointerId = null;
		let resizeSideFrame = null;
		if (!resizeZone) return undefined;

		function scheduleResizeSideUpdate() {
			if (resizeSideFrame !== null) cancelAnimationFrame(resizeSideFrame);
			resizeSideFrame = requestAnimationFrame(() => {
				resizeSideFrame = null;
				updateResizeSide();
			});
		}

		function startResize(e) {
			if (!window.editMode) return;
			e.preventDefault();
			updateResizeSide();
			resizeFromRightRef.current = widgetRef.current.hasAttribute('data-resize-from-right');
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
			scheduleResizeSideUpdate();
		}

		function togglePopup (e) {
			if (window.editMode) return;
			if (e.target.closest('a[href]')) return;
			if (!popup) return;
			let finalSize;
			if (openPopupRef.current) {
				finalSize = widgetLastSizeRef.current;
			} else {
				hidePopupObstacles();
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
		window.addEventListener('resize', scheduleResizeSideUpdate);
		window.addEventListener('idu-edit-mode-change', scheduleResizeSideUpdate);

		widgetRef.current.addEventListener('click', togglePopup);
		scheduleResizeSideUpdate();

		return () => {
			if (resizeSideFrame !== null) cancelAnimationFrame(resizeSideFrame);
			resizeZone.removeEventListener('pointerdown', startResize);
			document.removeEventListener('pointerup', stopResize);
			document.removeEventListener('pointermove', dynamicSizeUpdate);
			window.removeEventListener('resize', scheduleResizeSideUpdate);
			window.removeEventListener('idu-edit-mode-change', scheduleResizeSideUpdate);
			widgetRef.current.removeEventListener('click', togglePopup);
			restorePopupObstacles();
		};
	}, []);

	return {
		width,
		height,
		previewWidth,
		previewHeight,
		widgetRef,
		resizeZoneRef,
		resizingRef
	};
}
