import { useEffect, useRef, useState } from 'preact/hooks';
import { DROP_DURATION, DROP_EASING, getSettledRect, prefersReducedMotion } from './widgetMotion.js';

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
	let pressFeedbackTimeout;
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
		let finishPendingDrop = null;
		const editModeMoveTolerance = 10;
		const detectScrollZoneHeight = 140;
		const autoScrollDelay = 180;
		const autoScrollStep = 18;
		const autoScrollIntervalMs = 16;

		if (!widget) return;
		const handle = document.createElement('span');
		handle.className = 'widget-drag-handle';
		widget.appendChild(handle);

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

			if (betWidgetIndex < 0) return;
			if (currentWidgetIndex < betWidgetIndex && widthRef.current > getCellSize() * 2) {
				if(!widgets[betWidgetIndex + 1]) {return null}
				moveWidget(widgetID, widgets[betWidgetIndex + 1].dataset.widgetId);
			} else if (currentWidgetIndex !== betWidgetIndex) {
				moveWidget(widgetID, widgets[betWidgetIndex].dataset.widgetId);
			}
		}

		function getOverlapArea(el1, el2) {
			const r1 = el1.getBoundingClientRect();
			// Use the slot a widget is heading to, not where a reflow animation
			// currently has it, so targets don't flicker mid-animation.
			const r2 = getSettledRect(el2);
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
			clearTimeout(pressFeedbackTimeout);
			editModeTimeOut = null;
			editModePointerId = null;
			widget.classList.remove('widget-pressing');
		}

		function schedulePressFeedback() {
			clearTimeout(pressFeedbackTimeout);
			pressFeedbackTimeout = setTimeout(() => {
				if (!dragging) widget.classList.add('widget-pressing');
			}, 150);
		}

		function startDragging(e){
			cancelEditModeActivation();
			if (!window.editMode) {
				const pointerId = e.pointerId;
				editModePointerId = pointerId;
				pointerPosition = {x: e.clientX , y: e.clientY };
				currentPointerPosition = {x: e.clientX , y: e.clientY };
				schedulePressFeedback();
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
			schedulePressFeedback();
			const beginDrag = () => {
				clearTimeout(pressFeedbackTimeout);
				if (pointerPosition.x !== currentPointerPosition.x || pointerPosition.y !== currentPointerPosition.y) {
					widget.classList.remove('widget-pressing');
					return;
				}
				e.preventDefault();
				finishPendingDrop?.();
				activePointerId = e.pointerId;
				widget.setPointerCapture?.(e.pointerId);
				dragging = true;
				handle.hidden = true;
				widget.classList.remove('widget-pressing');
				setDraggingMode(true);
				widgetClone = widgetRef.current.children[0].cloneNode(false);
				widgetClone.className = "widget-clone inner-widget wiggle";
				document.body.appendChild(widgetClone);
				// Hide the content via CSS (not per-node inline styles) so nodes that
				// re-render while the layout preview reflows stay hidden too.
				widget.setAttribute('data-drag-placeholder', '');
				setClonePosition(e.clientX, e.clientY);
			};
			if (e.target === handle) beginDrag();
			else widgetDragTimeOut = setTimeout(beginDrag, 500);
		}

		function stopDragging (e) {
			cancelEditModeActivation(e);
			clearTimeout(widgetDragTimeOut);
			clearTimeout(pressFeedbackTimeout);
			widget.classList.remove('widget-pressing');
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
				handle.hidden = false;
				if (visualUpdateTimer && e.type === 'pointerup') updateLayout();
				clearTimeout(visualUpdateTimer);
				visualUpdateTimer = null;
				clearAutoScroll();
				dropCloneIntoSlot(widgetClone);
				widgetClone = null;
			}
		}

		function restoreWidget() {
			widget.removeAttribute('data-drag-placeholder');
		}

		// Fly the floating clone from under the finger into the widget's
		// (possibly new) slot, then hand over to the real widget.
		function dropCloneIntoSlot(clone) {
			finishPendingDrop?.();

			// Freeze the wiggle at its current angle so stopping it doesn't jump.
			const frozen = getComputedStyle(clone).transform;
			clone.style.transform = frozen && frozen !== 'none' ? frozen : '';
			clone.classList.remove('wiggle');

			let frame = 0;
			let fallback = 0;
			let fadeTimer = 0;
			let done = false;

			const finish = () => {
				if (done) return;
				done = true;
				cancelAnimationFrame(frame);
				clearTimeout(fallback);
				clone.removeEventListener('transitionend', onEnd);
				if (finishPendingDrop === finishNow) finishPendingDrop = null;
				restoreWidget();
				// Let the glass clone melt into the real widget underneath.
				clone.style.transition = 'opacity 140ms ease-out';
				clone.style.opacity = '0';
				fadeTimer = setTimeout(() => clone.remove(), 160);
			};
			const finishNow = () => {
				finish();
				clearTimeout(fadeTimer);
				clone.remove();
			};
			const onEnd = (e) => {
				if (e.target === clone && e.propertyName === 'transform') finish();
			};
			finishPendingDrop = finishNow;

			if (prefersReducedMotion()) {
				finish();
				return;
			}

			// Wait a frame so a reorder committed on release has rendered and
			// the target slot is in its final place.
			frame = requestAnimationFrame(() => {
				const inner = widgetRef.current?.children[0];
				if (!inner || !clone.isConnected) {
					finishNow();
					return;
				}

				const keep = clone.style.transform;
				clone.style.transition = 'none';
				clone.style.transform = 'none';
				const base = clone.getBoundingClientRect();
				clone.style.transform = keep;
				clone.offsetWidth;

				const target = getSettledRect(inner);
				const dx = target.left - base.left;
				const dy = target.top - base.top;
				const d = DROP_DURATION;

				clone.classList.add('widget-clone-dropping');
				clone.style.transition = [
					`transform ${d}ms ${DROP_EASING}`,
					`width ${d}ms ${DROP_EASING}`,
					`height ${d}ms ${DROP_EASING}`,
					`box-shadow ${d}ms ease-out`,
					`background-color ${d}ms ease-out`,
				].join(', ');
				clone.style.transform = `translate(${dx}px, ${dy}px)`;
				clone.style.width = `${target.width}px`;
				clone.style.height = `${target.height}px`;

				clone.addEventListener('transitionend', onEnd);
				fallback = setTimeout(finish, d + 120);
			});
		}

		function preventNativeScroll(e) {
			if (!dragging) return;
			e.preventDefault();
		}

		function preventWidgetActivation(e) {
			if (!window.editMode) return;
			e.preventDefault();
			e.stopPropagation();
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
				if (
					window.editMode &&
					!dragging &&
					pointerPosition &&
					Math.hypot(
						currentPointerPosition.x - pointerPosition.x,
						currentPointerPosition.y - pointerPosition.y
					) > editModeMoveTolerance
				) {
					clearTimeout(widgetDragTimeOut);
					clearTimeout(pressFeedbackTimeout);
					widget.classList.remove('widget-pressing');
				}
			}
			if (dragging) {
				if (activePointerId !== null && e.pointerId !== activePointerId) return;
				e.preventDefault();
				setClonePosition(currentPointerPosition.x, currentPointerPosition.y);
				clearTimeout(visualUpdateTimer);
				visualUpdateTimer = setTimeout(() => {
					visualUpdateTimer = null;
					updateLayout()
				}, 200);
				scheduleAutoScroll(getAutoScrollDirection());
			}
		}

		widget.addEventListener('pointerdown', startDragging);
		widget.addEventListener('click', preventWidgetActivation, true);
		document.addEventListener("pointermove", updatePos)
		document.addEventListener("pointerup", stopDragging)
		document.addEventListener("pointercancel", stopDragging)
		document.addEventListener("scroll", cancelEditModeActivation, true)
		document.addEventListener("touchmove", preventNativeScroll, { passive: false })
		return () => {
			finishPendingDrop?.();
			widget.removeAttribute('data-drag-placeholder');
			handle.remove();
			cancelEditModeActivation();
			clearTimeout(widgetDragTimeOut);
			clearTimeout(pressFeedbackTimeout);
			clearTimeout(visualUpdateTimer);
			clearAutoScroll();
			setDraggingMode(false);
			widget.classList.remove('widget-pressing');
			widget.removeEventListener('pointerdown', startDragging);
			widget.removeEventListener('click', preventWidgetActivation, true);
			document.removeEventListener("pointermove", updatePos);
			document.removeEventListener("pointerup", stopDragging);
			document.removeEventListener("pointercancel", stopDragging);
			document.removeEventListener("scroll", cancelEditModeActivation, true);
			document.removeEventListener("touchmove", preventNativeScroll);
		};
	}, []);

}
