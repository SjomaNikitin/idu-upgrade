import { h } from 'preact';
import { useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks';
import { Grades } from './widgets/grades.jsx';
import { Subjects } from './widgets/subjects.jsx';
import { Schedule } from './widgets/schedule.jsx';
import { SubjectNews } from './widgets/subjectNews.jsx';
import { News } from './widgets/news.jsx';
import { Attendance } from './widgets/attendance.jsx';
import { Messages } from './widgets/messages.jsx';
import { ComingEvents } from './widgets/comingEvents.jsx';
import { LastReviews } from './widgets/lastReviews.jsx';
import { LastHomeWork } from './widgets/lastHomeWork.jsx';
import { maybeStartTutorial } from './tutorial.jsx';
import { REFLOW_DURATION, REFLOW_EASING, prefersReducedMotion } from './widgets/widgetMotion.js';

window.editMode = false;
const widgetRegistry = {
	grades: Grades,
	subjects: Subjects,
	schedule: Schedule,
	subjectNews: SubjectNews,
	news: News,
	attendance: Attendance,
	comingEvents: ComingEvents,
	reviews: LastReviews,
	homework: LastHomeWork,
};

let initialWidgets = [
	{ id: 'grades', type: 'grades' },
	{ id: 'subjects', type: 'subjects'},
	{ id: 'schedule', type: 'schedule'},
	{ id: 'subjectNews', type: 'subjectNews'},
	{ id: 'news', type: 'news'},
	{ id: 'attendance', type: 'attendance'},
	{ id: 'comingEvents', type: 'comingEvents'},
	{ id: 'reviews', type: 'reviews'},
	{ id: 'homework', type: 'homework'},
];
if (window.__IDU_MOCK_DATA) {
	initialWidgets = [
		{ id: 'grades', type: 'grades' },
		{ id: 'subjects', type: 'subjects'},
		{ id: 'schedule', type: 'schedule'},
		{ id: 'subjectNews', type: 'subjectNews'},
		{ id: 'news', type: 'news'},
		{ id: 'attendance', type: 'attendance'},
	];
}
const widgetLayoutStorageKey = 'mainContent.widgetOrder';

function moveWidget(list, movedId, targetId) {
	if (movedId === targetId) return list;

	const updated = [...list];
	const fromIndex = updated.findIndex((widget) => widget.id === movedId);
	const toIndex = updated.findIndex((widget) => widget.id === targetId);

	if (fromIndex === -1 || toIndex === -1) return list;

	const [movedWidget] = updated.splice(fromIndex, 1);

	const isLastTarget = toIndex === list.length - 1;
	if (isLastTarget && fromIndex < toIndex) {
		updated.push(movedWidget);
	} else {
		updated.splice(toIndex, 0, movedWidget);
	}

	return updated;
}

function reorderWidgets(list, orderedIds) {
	const byId = new Map(list.map((widget) => [widget.id, widget]));
	const ordered = orderedIds.map((id) => byId.get(id)).filter(Boolean);
	if (ordered.length !== list.length) return list;
	const unchanged = ordered.every((widget, index) => widget === list[index]);
	return unchanged ? list : ordered;
}

function PlaceholderWidget({ widgetId, width = 2, height = 2 }) {
	return (
		<div data-widget-id={widgetId} className={`widget w${width} h${height}`}>
			<div className="inner-widget" style={{ width: '100%', height: '100%' }}></div>
		</div>
	);
}

function saveWidgetLayout(widgets) {
	localStorage.setItem(
		widgetLayoutStorageKey,
		JSON.stringify(widgets.map((widget) => widget.id))
	);
}

function loadWidgetLayout() {
	const raw = localStorage.getItem(widgetLayoutStorageKey);
	if (!raw) return initialWidgets;

	try {
		const savedIds = JSON.parse(raw);
		if (!Array.isArray(savedIds)) return initialWidgets;

		const widgetMap = new Map(initialWidgets.map((widget) => [widget.id, widget]));
		const orderedWidgets = savedIds.map((id) => widgetMap.get(id)).filter(Boolean);
		const missingWidgets = initialWidgets.filter((widget) => !savedIds.includes(widget.id));

		return [...orderedWidgets, ...missingWidgets];
	} catch {
		return initialWidgets;
	}
}

export function MainContent({data}) {
	const [widgets, setWidgets] = useState(loadWidgetLayout);
	const [openPopupId, setOpenPopupId] = useState(null);
	const popupContainerRef = useRef(null);
	const gridRef = useRef(null);
	// Where each widget was on screen right before a reorder (FLIP "first").
	const reflowSnapshotRef = useRef(null);

	useEffect(() => {
		saveWidgetLayout(widgets);
	}, [widgets]);

	// First-run tutorial (shown once; replayable from Settings).
	useEffect(() => {
		maybeStartTutorial();
	}, []);

	useEffect(() => {
		function handleOutsidePointerDown(e) {
			if (!openPopupId) return;

			const popupContainer = popupContainerRef.current;
			if (!popupContainer) return;

			if (e.target.closest('.widget-popup')) return;
			setOpenPopupId(null);
		}

		document.addEventListener('pointerdown', handleOutsidePointerDown);

		return () => {
			document.removeEventListener('pointerdown', handleOutsidePointerDown);
		};
	}, [openPopupId]);

	// Animate widgets sliding to their new slots after a reorder (FLIP).
	useLayoutEffect(() => {
		const before = reflowSnapshotRef.current;
		reflowSnapshotRef.current = null;
		const grid = gridRef.current;
		if (!before || !grid || prefersReducedMotion()) return;

		const moved = [];
		for (const el of grid.children) {
			const prev = before.get(el.dataset.widgetId);
			if (!prev) continue;
			// Measure the new slot without any in-flight animation.
			el.style.transition = 'none';
			el.style.transform = '';
			const next = el.getBoundingClientRect();
			const dx = prev.left - next.left;
			const dy = prev.top - next.top;
			if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
				el.style.transition = '';
				continue;
			}
			el.style.transform = `translate(${dx}px, ${dy}px)`;
			moved.push(el);
		}
		if (!moved.length) return;

		grid.offsetWidth; // commit the inverted positions before playing
		for (const el of moved) {
			el.style.transition = `transform ${REFLOW_DURATION}ms ${REFLOW_EASING}`;
			el.style.transform = '';
			const cleanup = (e) => {
				if (e && (e.target !== el || e.propertyName !== 'transform')) return;
				el.removeEventListener('transitionend', cleanup);
				if (!el.style.transform) el.style.transition = '';
			};
			el.addEventListener('transitionend', cleanup);
		}
	}, [widgets]);

	// targetId is either the id of the widget whose place the moved widget
	// takes, or a full array of widget ids in their new order.
	function handleMoveWidget(movedId, targetId) {
		const grid = gridRef.current;
		if (grid) {
			// Visual rects (including any running animation) so an interrupted
			// reflow continues smoothly from where it is.
			const snapshot = new Map();
			for (const el of grid.children) {
				snapshot.set(el.dataset.widgetId, el.getBoundingClientRect());
			}
			reflowSnapshotRef.current = snapshot;
		}
		setWidgets((currentWidgets) => Array.isArray(targetId)
			? reorderWidgets(currentWidgets, targetId)
			: moveWidget(currentWidgets, movedId, targetId));
	}

	function renderWidget(widget) {
		const WidgetComponent = widgetRegistry[widget.type];

		if (WidgetComponent) {
			return (
				<WidgetComponent
					key={widget.id}
					widgetId={widget.id}
					moveWidget={handleMoveWidget}
					data = {data}
				/>
			);
		}

		return (
			<PlaceholderWidget
				key={widget.id}
				widgetId={widget.id}
				width={widget.width}
				height={widget.height}
			/>
		);
	}

	return (
		<div>
			<div className="widgets-grid" ref={gridRef}>
				{widgets.map(renderWidget)}
			</div>
		</div>

	);
}
