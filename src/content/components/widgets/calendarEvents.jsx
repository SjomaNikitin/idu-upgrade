import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { useWidgetResize } from './widgetResize.js';
import { useWidgetDragging } from './widgetDragging.js';
import { WidgetShell, TitleArrow, ICONS, go } from './parentLinks.jsx';

// "Najbliższe wydarzenia" (parents' home): upcoming school calendar events,
// laid out like the Aktualności widget (day/month tile + title).

function EventRow({ item, isLast }) {
	const linkRef = useRef(null);
	const href = item.detailsUrl || '';

	// IDU opens event details in a fancybox; fall back to the full page.
	useEffect(() => {
		if (!href || !linkRef.current || !window.jQuery?.fn?.fancybox) return;
		window.jQuery(linkRef.current).fancybox({});
	}, [href]);
	const fallbackHref = window.jQuery?.fn?.fancybox ? href : href.replace(/[?&]layout=none/, '');

	return (
		<div className={`widget-news-box parent-event ${isLast ? 'last' : ''}`}>
			<div className="widget-news-box-date">
				<span className="widget-news-box-date-day">{item.day.slice(0, 2)}</span>
				<br/>
				<span className="widget-news-box-date-month">{item.day.slice(3, 6)}</span>
			</div>
			<a ref={linkRef} href={fallbackHref || undefined} className={href ? 'fancybox' : ''}>
				{item.title}
				<br/>
				<span className="widget-news-box-comments">{item.time || 'cały dzień'}</span>
			</a>
		</div>
	);
}

export function CalendarEvents({ widgetId, moveWidget, data }) {
	const events = data.events || [];
	const calendarHref = data.calendarUrl || '/calendar';
	const possibleLayout = [
		{ w: 4, h: 2 },
		{ w: 2, h: 2 },
		{ w: 2, h: 4 },
		{ w: 4, h: 4 },
		{ w: 2, h: 1 },
		{ w: 4, h: 1 },
	];
	const resize = useWidgetResize(possibleLayout, widgetId, 16, { w: 4, h: 6 }, true, { w: 4, h: 2 });
	useWidgetDragging(resize.widgetRef, resize.previewWidth, resize.previewHeight, resize.resizingRef, resize.resizeZoneRef, moveWidget, widgetId);
	const { width, height, previewWidth, previewHeight } = resize;
	const size = { width: `${previewWidth}px`, height: `${previewHeight}px` };

	if (height === 1) {
		const next = events[0];
		const title = width === 4 && next ? next.title : 'Wydarzenia';
		return (
			<WidgetShell resize={resize} widgetId={widgetId} elementId="calendarEventsWidget">
				<div style={size} className="widget-content-container parent-events-small" onClick={() => go(calendarHref)}>
					<div className="small-title-box">
						{width === 4 && <div className="titleIcon">{ICONS.calendar}</div>}
						<div className="parent-child-text">
							<h1>{title}</h1>
							{width === 4 && next && <span className="parent-child-class">{next.date}</span>}
						</div>
						<TitleArrow/>
					</div>
				</div>
			</WidgetShell>
		);
	}

	const limits = { '22': 2, '42': 2, '24': 5, '44': 8, '46': 12 };
	const limit = limits[`${width}${height}`] || 2;
	const visible = events.slice(0, limit);
	const showGradient = height >= 4;

	return (
		<WidgetShell resize={resize} widgetId={widgetId} elementId="calendarEventsWidget">
			<div style={size} className="widget-content-container parent-events">
				<div className="widget-title-box" style={{ marginBottom: 'var(--padding-1)' }}>
					<h1>Wydarzenia</h1>
					<TitleArrow/>
				</div>
				{visible.length === 0 && <div className="parent-widget-muted">Brak nadchodzących wydarzeń</div>}
				{visible.map((item, index) => (
					<EventRow key={`${item.detailsUrl}-${index}`} item={item} isLast={index === visible.length - 1}/>
				))}
				{showGradient && visible.length > 0 && <div className="widget-news-gradient"></div>}
				{height >= 4 && <a className="grades-all-link" href={calendarHref}>Kalendarz</a>}
			</div>
		</WidgetShell>
	);
}
