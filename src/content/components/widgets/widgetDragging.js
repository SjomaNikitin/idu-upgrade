import { useEffect, useRef, useState } from 'preact/hooks';

export function useWidgetDragging(widgetRef, width, height, resizeRef, resizingZoneRef, moveWidget, widgetID) {
	let dragging = false;
	let widgetClone = null;
	const widthRef = useRef(width);
	const heightRef = useRef(height);
	widthRef.current = width;
	heightRef.current = height;
	let visualUpdateTimer;

	function getCellSize() {
		const gridWidth = window.innerWidth;
		return gridWidth / 4;
	}

	function getPreviewSize(width, height, cellSize, gap) {
		return {
			width: (cellSize - 20) * width + gap * (width - 1),
			height: (cellSize - 20) * height + gap * (height - 1),
		};
	}


	useEffect(() => {
		const widget = widgetRef.current;

		if (!widget) return;

		function updateLayout () {
			const widgets = document.querySelectorAll("div.widget");
			let betWidgetIndex = -1;
			let bestWidgetOverlap = 0;
			const currentWidgetIndex = Array.from(widgets).findIndex(
				(widget) => widget.dataset.widgetId === widgetID
			);
			for (let i=0; i< widgets.length; i++) {
				const overlapArea = getOverlapArea(widgetClone, widgets[i]);
				if (overlapArea > bestWidgetOverlap) {
					bestWidgetOverlap = overlapArea;
					betWidgetIndex = i;
				}
			}

			if (currentWidgetIndex < betWidgetIndex && widthRef.current > getCellSize() * 2) {
				if(!widgets[betWidgetIndex + 1]) {return null}
				moveWidget(widgetID, widgets[betWidgetIndex + 1].dataset.widgetId);
			} else if (currentWidgetIndex !== betWidgetIndex) {
				moveWidget(widgetID, widgets[betWidgetIndex].dataset.widgetId);
			}
		}

		function getOverlapArea(el1, el2) {
			const r1 = el1.getBoundingClientRect();
			const r2 = el2.getBoundingClientRect();
			let newRight = r1.left + getPreviewSize(2, 2, getCellSize(), 16).width;
			let newBottom= r1.top + getPreviewSize(2, 2, getCellSize(), 16).height;

			const overlapWidth = Math.max(
				0,
				Math.min(newRight, r2.right) - Math.max(r1.left, r2.left)
			);

			const overlapHeight = Math.max(
				0,
				Math.min(newBottom, r2.bottom) - Math.max(r1.top, r2.top)
			);

			return overlapWidth * overlapHeight;
		}

		function startDragging(e) {
			if (resizingZoneRef.current?.contains(e.target)) return;
			if (resizeRef.current) return;
				dragging = true;
				widgetClone = widgetRef.current.children[0].cloneNode(true);
				widgetClone.className = "widget-clone inner-widget";
				document.body.appendChild(widgetClone);
				widgetRef.current.children[0].style.opacity = "0.3";
		}
		function stopDragging () {
			dragging = false;
			if (widgetClone) {
				document.body.removeChild(widgetClone);
				widgetClone = null;
				widgetRef.current.children[0].style.opacity = "1";
				clearTimeout(visualUpdateTimer);
			}
		}
		function updatePos (e) {
			if (dragging) {
				if (widthRef.current <= getCellSize() * 2) {
					widgetClone.style.left = e.clientX - widthRef.current / 2 + "px";
				} else {
					widgetClone.style.left = 16 + "px";
				}
				widgetClone.style.top = e.clientY - heightRef.current / 2 + "px";
				clearTimeout(visualUpdateTimer);
				visualUpdateTimer = setTimeout(() => {
					updateLayout()
				}, 200);
			}
		}

		widget.addEventListener('pointerdown', startDragging);
		document.addEventListener("pointermove", updatePos)
		document.addEventListener("pointerup", stopDragging)

		return () => {
			widget.removeEventListener('pointerdown', startDragging);
		};
	}, []);

}
