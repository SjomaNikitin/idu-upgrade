import { h } from 'preact';
import { useWidgetResize } from './widgetResize.js';
import { useWidgetDragging } from './widgetDragging.js';

// Small link widgets for the parents' home page, built like the student
// Messages / Ostatnie Recenzje widgets (2x1 title, 4x1 icon + title).

export function TitleArrow() {
	return (
		<svg className="titleArrow" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 42 42">
			<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "/>
		</svg>
	);
}

export const ICONS = {
	justify: (
		<svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M9 15L11 17L15 13M8 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V17.2C2 18.8802 2 19.7202 2.32698 20.362C2.6146 20.9265 3.07354 21.3854 3.63803 21.673C4.27976 22 5.11984 22 6.8 22H17.2C18.8802 22 19.7202 22 20.362 21.673C20.9265 21.3854 21.3854 20.9265 21.673 20.362C22 19.7202 22 18.8802 22 17.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H16M8 4V3M8 4V5M16 4V3M16 4V5M8 4H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	),
	documents: (
		<svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M14 2.26946V6.4C14 6.96005 14 7.24008 14.109 7.45399C14.2049 7.64215 14.3578 7.79513 14.546 7.89101C14.7599 8 15.0399 8 15.6 8H19.7305M16 13H8M16 17H8M10 9H8M14 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362C20 19.7202 20 18.8802 20 17.2V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	),
	calendar: (
		<svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	),
	child: (
		<svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	),
};

function go(href) {
	if (href) window.open(href, '_self');
}

function useSmallWidget(widgetId, moveWidget, possibleLayout, defaultSize) {
	const resize = useWidgetResize(possibleLayout, widgetId, 16, possibleLayout[possibleLayout.length - 1], false, defaultSize);
	useWidgetDragging(resize.widgetRef, resize.previewWidth, resize.previewHeight, resize.resizingRef, resize.resizeZoneRef, moveWidget, widgetId);
	return resize;
}

function SmallTitle({ title, icon, onClick, style }) {
	return (
		<div onClick={onClick} style={style} className="widget-content-container">
			<div className="small-title-box">
				{icon && <div className="titleIcon">{icon}</div>}
				<h1>{title}</h1>
				<TitleArrow/>
			</div>
		</div>
	);
}

function WidgetShell({ resize, widgetId, elementId, children }) {
	const { width, height, previewWidth, previewHeight, widgetRef, resizeZoneRef } = resize;
	return (
		<div ref={widgetRef} id={elementId} data-widget-id={widgetId} className={`widget w${width} h${height} ${window.editMode ? 'edit-mode' : ''}`}>
			<div className="inner-widget" style={{ width: `${previewWidth}px`, height: `${previewHeight}px`, position: 'relative' }}>
				{children}
				<div ref={resizeZoneRef} className="resize-zone"></div>
			</div>
		</div>
	);
}

export { WidgetShell, SmallTitle, go };

// "Usprawiedliwienia": send a new absence excuse, or see the ones already sent.
export function JustifyAbsence({ widgetId, moveWidget, data }) {
	const resize = useSmallWidget(widgetId, moveWidget, [
		{ w: 2, h: 1 },
		{ w: 4, h: 1 },
		{ w: 2, h: 2 },
	], { w: 2, h: 1 });
	const { width, height, previewWidth, previewHeight } = resize;
	const size = { width: `${previewWidth}px`, height: `${previewHeight}px` };
	const newHref = data.justifyNewUrl || '/justify_absence_requests/new';
	const listHref = data.justifyListUrl || '/justify_absence_requests';
	const sent = data.justifyRequests || [];

	let content;
	if (width === 2 && height === 2) {
		content = (
			<div style={size} className="widget-content-container parent-justify">
				<div className="widget-title-box">
					<h1>{"Usprawie\u00ADdliwienia"}</h1>
				</div>
				<div className="parent-widget-muted">
					{sent.length ? `Wysłane prośby: ${sent.length}` : 'Brak wysłanych próśb'}
				</div>
				<div className="parent-actions">
					<a className="parent-action primary" href={newHref}>Nowa prośba</a>
					<a className="parent-action" href={listHref}>Wszystkie</a>
				</div>
			</div>
		);
	} else if (width === 4) {
		content = <SmallTitle style={size} icon={ICONS.justify} title="Usprawiedliw nieobecność" onClick={() => go(newHref)}/>;
	} else {
		content = <SmallTitle style={size} title={"Usprawie\u00ADdliwienia"} onClick={() => go(newHref)}/>;
	}

	return <WidgetShell resize={resize} widgetId={widgetId} elementId="justifyWidget">{content}</WidgetShell>;
}

// "Dokumenty": the school's documents and attachments.
export function Documents({ widgetId, moveWidget, data }) {
	const resize = useSmallWidget(widgetId, moveWidget, [
		{ w: 2, h: 1 },
		{ w: 4, h: 1 },
	], { w: 2, h: 1 });
	const { width, previewWidth, previewHeight } = resize;
	const size = { width: `${previewWidth}px`, height: `${previewHeight}px` };
	const href = data.documentsUrl || '/documents/attachments';

	return (
		<WidgetShell resize={resize} widgetId={widgetId} elementId="documentsWidget">
			<SmallTitle style={size} icon={width === 4 ? ICONS.documents : null} title="Dokumenty" onClick={() => go(href)}/>
		</WidgetShell>
	);
}
