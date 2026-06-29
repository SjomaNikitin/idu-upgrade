import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Grades } from './widgets/grades.jsx';
import { GradesPopup } from './widgets/grades.jsx';

window.editMode = false;
const widgetRegistry = {
	grades: Grades,
};

const initialWidgets = [
	{ id: 'grades', type: 'grades' },
	{ id: 'test-1', type: 'test', width: 2, height: 2 },
	{ id: 'test-2', type: 'test', width: 2, height: 2 },
	{ id: 'test-3', type: 'test', width: 2, height: 2 },
	{ id: 'test-4', type: 'test', width: 2, height: 2 },
	{ id: 'test-5', type: 'test', width: 4, height: 1 },
	{ id: 'test-6', type: 'test', width: 2, height: 2 },
	{ id: 'test-7', type: 'test', width: 2, height: 4 },
	{ id: 'test-8', type: 'test', width: 2, height: 2 },

];

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

export function MainContent() {
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
					openPopup={setOpenPopupId}
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
			<div ref={popupContainerRef} className="popups-container">
				<GradesPopup openPopup={setOpenPopupId} className={`widget-popup ${openPopupId === 'grades' ? 'open' : ''}`}></GradesPopup>
			</div>
		</div>

	);
}
