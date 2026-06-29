import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Grades } from './widgets/grades.jsx';

const widgetRegistry = {
	grades: Grades,
};

const initialWidgets = [
	{ id: 'grades', type: 'grades' },
	{ id: 'test-1', type: 'test', width: 2, height: 2 },
	{ id: 'test-2', type: 'test', width: 2, height: 2 },
	{ id: 'test-3', type: 'test', width: 2, height: 2 },
	{ id: 'test-4', type: 'test', width: 2, height: 2 },
];

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

export function MainContent() {
	const [widgets, setWidgets] = useState(initialWidgets);

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
		<div className="widgets-grid">
			{widgets.map(renderWidget)}
		</div>
	);
}
