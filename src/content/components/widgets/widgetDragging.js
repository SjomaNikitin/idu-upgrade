import { useEffect, useRef, useState } from 'preact/hooks';

export function useWidgetDragging(widgetRef, width, height, resizeRef, resizingZoneRef, moveWidget, widgetID) {
	let dragging = false;
	let widgetClone = null;
	const widthRef = useRef(width);
	const heightRef = useRef(height);
	widthRef.current = width;
	heightRef.current = height;
	let visualUpdateTimer;
	let editModeTimeOut;
	let pointerPosition;
	let currentPointerPosition;
	let widgetDragTimeOut;
	let autoScrollStartTimeout;
	let autoScrollInterval;
	let autoScrollDirection = null;

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
		let activePointerId = null;
		let editModePointerId = null;
		const editModeMoveTolerance = 10;
		const detectScrollZoneHeight = 140;
		const autoScrollDelay = 180;
		const autoScrollStep = 18;
		const autoScrollIntervalMs = 16;

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
			widgetRef.current.children[0].querySelectorAll('*').forEach((child) => {
				child.style.opacity = '0';
			});
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

		function setClonePosition(clientX, clientY) {
			if (!widgetClone) return;

			if (widthRef.current <= getCellSize() * 2) {
				widgetClone.style.left = clientX - widthRef.current / 2 + "px";
			} else {
				widgetClone.style.left = 16 + "px";
			}

			widgetClone.style.top = clientY + window.scrollY - heightRef.current / 2 + "px";
		}

		function clearAutoScroll() {
			clearTimeout(autoScrollStartTimeout);
			clearInterval(autoScrollInterval);
			autoScrollStartTimeout = null;
			autoScrollInterval = null;
			autoScrollDirection = null;
		}

		function setDraggingMode(active) {
			document.documentElement.classList.toggle('dragging-widget', active);
			document.body.classList.toggle('dragging-widget', active);
		}

		function getScrollElement() {
			return document.scrollingElement || document.documentElement;
		}

		function getCurrentScrollTop() {
			return getScrollElement().scrollTop || window.scrollY || 0;
		}

		function getMaxScrollTop() {
			const scrollElement = getScrollElement();
			const body = document.body;
			const documentElement = document.documentElement;
			const contentHeight = Math.max(
				scrollElement.scrollHeight || 0,
				scrollElement.offsetHeight || 0,
				body?.scrollHeight || 0,
				body?.offsetHeight || 0,
				documentElement.scrollHeight || 0,
				documentElement.offsetHeight || 0
			);

			return Math.max(0, contentHeight - window.innerHeight);
		}

		function setPageScrollTop(top) {
			const scrollElement = getScrollElement();
			scrollElement.scrollTop = top;
			window.scrollTo(0, top);
		}

		function getAutoScrollDirection() {
			if (!widgetClone) return null;

			const rect = widgetClone.getBoundingClientRect();
			if (rect.top < detectScrollZoneHeight) {
				return "up";
			}

			if (rect.bottom > window.innerHeight - detectScrollZoneHeight) {
				return "down";
			}

			return null;
		}

		function startAutoScroll(direction) {
			clearInterval(autoScrollInterval);
			autoScrollInterval = setInterval(() => {
				if (!dragging || !widgetClone || !currentPointerPosition) {
					clearAutoScroll();
					return;
				}

				const currentScrollTop = getCurrentScrollTop();
				const maxScrollTop = getMaxScrollTop();
				const nextScrollTop = direction === "up"
					? Math.max(0, currentScrollTop - autoScrollStep)
					: Math.min(maxScrollTop, currentScrollTop + autoScrollStep);

				if (nextScrollTop === currentScrollTop) {
					clearAutoScroll();
					return;
				}

				setPageScrollTop(nextScrollTop);
				setClonePosition(currentPointerPosition.x, currentPointerPosition.y);

				const nextDirection = getAutoScrollDirection();
				if (nextDirection !== direction) {
					if (nextDirection) {
						scheduleAutoScroll(nextDirection);
					} else {
						clearAutoScroll();
					}
				}
			}, autoScrollIntervalMs);
		}

		function scheduleAutoScroll(direction) {
			if (!direction) {
				clearAutoScroll();
				return;
			}

			if (autoScrollDirection === direction && (autoScrollStartTimeout || autoScrollInterval)) {
				return;
			}

			clearTimeout(autoScrollStartTimeout);
			clearInterval(autoScrollInterval);
			autoScrollDirection = direction;
			autoScrollStartTimeout = setTimeout(() => {
				autoScrollStartTimeout = null;
				startAutoScroll(direction);
			}, autoScrollDelay);
		}

		function cancelEditModeActivation(e) {
			if (
				e?.pointerId !== undefined &&
				editModePointerId !== null &&
				e.pointerId !== editModePointerId
			) {
				return;
			}

			clearTimeout(editModeTimeOut);
			editModeTimeOut = null;
			editModePointerId = null;
		}

		function startDragging(e){
			cancelEditModeActivation();
			if (!window.editMode) {
				const pointerId = e.pointerId;
				editModePointerId = pointerId;
				pointerPosition = {x: e.clientX , y: e.clientY };
				currentPointerPosition = {x: e.clientX , y: e.clientY };
				editModeTimeOut = setTimeout(() => {
					if (window.editMode || editModePointerId !== pointerId) return;

					editModeTimeOut = null;
					editModePointerId = null;
					window.switchEditMode();
				}, 750)
				return;
			}
			if (resizingZoneRef.current?.contains(e.target)) return;
			if (resizeRef.current) return;
			pointerPosition = {x: e.clientX , y: e.clientY };
			currentPointerPosition = {x: e.clientX , y: e.clientY };
			widgetDragTimeOut = setTimeout(() => {
				if (pointerPosition.x !== currentPointerPosition.x || pointerPosition.y !== currentPointerPosition.y) return;
				e.preventDefault();
				activePointerId = e.pointerId;
				widget.setPointerCapture?.(e.pointerId);
				dragging = true;
				setDraggingMode(true);
				widgetClone = widgetRef.current.children[0].cloneNode(false);
				widgetClone.className = "widget-clone inner-widget wiggle";
				document.body.appendChild(widgetClone);
				widgetRef.current.children[0].style.opacity = "0.3";
				widgetRef.current.children[0].querySelectorAll('*').forEach((child) => {
					child.style.opacity = '0';
				});
				setClonePosition(e.clientX, e.clientY);
			}, 500)
		}

		function stopDragging (e) {
			cancelEditModeActivation(e);
			clearTimeout(widgetDragTimeOut);
			setDraggingMode(false);
			if (activePointerId !== null && e.pointerId !== activePointerId) return;
			dragging = false;
			if (activePointerId !== null) {
				try {
					widget.releasePointerCapture?.(activePointerId);
				} catch {}
				activePointerId = null;
			}
			if (widgetClone) {
				document.body.removeChild(widgetClone);
				widgetClone = null;
				clearAutoScroll();
				widgetRef.current.children[0].style.opacity = "1";
				widgetRef.current.children[0].querySelectorAll('*').forEach((child) => {
					child.style.opacity = '1';
				});
				clearTimeout(visualUpdateTimer);
			}
		}

		function preventNativeScroll(e) {
			if (!dragging) return;
			e.preventDefault();
		}

		function updatePos (e) {
			if (typeof e.clientX === "number" && typeof e.clientY === "number") {
				currentPointerPosition = {x: e.clientX , y: e.clientY };
				if (
					editModePointerId === e.pointerId &&
					Math.hypot(
						currentPointerPosition.x - pointerPosition.x,
						currentPointerPosition.y - pointerPosition.y
					) > editModeMoveTolerance
				) {
					cancelEditModeActivation(e);
				}
			}
			if (dragging) {
				if (activePointerId !== null && e.pointerId !== activePointerId) return;
				e.preventDefault();
				setClonePosition(currentPointerPosition.x, currentPointerPosition.y);
				clearTimeout(visualUpdateTimer);
				visualUpdateTimer = setTimeout(() => {
					updateLayout()
				}, 200);
				scheduleAutoScroll(getAutoScrollDirection());
			}
		}

		widget.addEventListener('pointerdown', startDragging);
		document.addEventListener("pointermove", updatePos)
		document.addEventListener("pointerup", stopDragging)
		document.addEventListener("pointercancel", stopDragging)
		document.addEventListener("scroll", cancelEditModeActivation, true)
		document.addEventListener("touchmove", preventNativeScroll, { passive: false })
		return () => {
			cancelEditModeActivation();
			clearTimeout(widgetDragTimeOut);
			clearTimeout(visualUpdateTimer);
			clearAutoScroll();
			setDraggingMode(false);
			widget.removeEventListener('pointerdown', startDragging);
			document.removeEventListener("pointermove", updatePos);
			document.removeEventListener("pointerup", stopDragging);
			document.removeEventListener("pointercancel", stopDragging);
			document.removeEventListener("scroll", cancelEditModeActivation, true);
			document.removeEventListener("touchmove", preventNativeScroll);
		};
	}, []);

}
