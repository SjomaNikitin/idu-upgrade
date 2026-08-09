import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
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

	useEffect(() => {
		saveWidgetLayout(widgets);
	}, [widgets]);

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

	function handleMoveWidget(movedId, targetId) {
		setWidgets((currentWidgets) => moveWidget(currentWidgets, movedId, targetId));
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
			<div className="widgets-grid">
				{widgets.map(renderWidget)}
			</div>
		</div>

	);
}
