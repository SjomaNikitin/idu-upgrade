import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { useWidgetResize } from './widgetResize.js';
import { useWidgetDragging } from './widgetDragging.js';
import { WidgetShell, SmallTitle, TitleArrow, ICONS, go } from './parentLinks.jsx';

// "Dzieci" (parents' home): each child with photo, class and quick links to
// their attendance, grades, payments and PZO files.

const QUICK_LINKS = [
	['presencesUrl', 'Obecności'],
	['gradesUrl', 'Oceny'],
	['paymentsUrl', 'Płatności'],
	['filesUrl', 'Pliki PZO'],
];

function ChildAvatar({ child }) {
	const imgRef = useRef(null);
	useEffect(() => {
		// Custom photos (29-image-replace.js) are keyed by full name.
		if (imgRef.current) window.upgradeProfileImage?.(imgRef.current, child.fullName || child.name);
	}, [child.avatar, child.fullName]);

	return (
		<div className="parent-child-avatar">
			{child.avatar
				? <img ref={imgRef} src={child.avatar} alt=""/>
				: <span>{(child.name || '?').charAt(0)}</span>}
		</div>
	);
}

function ChildRow({ child, links = 0 }) {
	const quickLinks = QUICK_LINKS.filter(([key]) => child[key]).slice(0, links);
	return (
		<div className="parent-child">
			<div className="parent-child-head">
				<ChildAvatar child={child}/>
				<div className="parent-child-text">
					<a href={child.url} className="parent-child-name">{child.fullName || child.name}</a>
					{child.className && <span className="parent-child-class">{child.className}</span>}
				</div>
			</div>
			{quickLinks.length > 0 && (
				<div className="parent-child-links">
					{quickLinks.map(([key, label]) => (
						<div key={key} className="widget-subject-box"><a href={child[key]}>{label}</a></div>
					))}
				</div>
			)}
		</div>
	);
}

export function Children({ widgetId, moveWidget, data }) {
	const children = data.children || [];
	const possibleLayout = [
		{ w: 2, h: 1 },
		{ w: 4, h: 1 },
		{ w: 2, h: 2 },
		{ w: 4, h: 2 },
	];
	const resize = useWidgetResize(possibleLayout, widgetId, 16, { w: 4, h: 2 }, false, { w: 4, h: 1 });
	useWidgetDragging(resize.widgetRef, resize.previewWidth, resize.previewHeight, resize.resizingRef, resize.resizeZoneRef, moveWidget, widgetId);
	const { width, height, previewWidth, previewHeight } = resize;
	const size = { width: `${previewWidth}px`, height: `${previewHeight}px` };
	const first = children[0];

	let content;
	if (!first) {
		content = <SmallTitle style={size} icon={width === 4 ? ICONS.child : null} title="Dzieci"/>;
	} else if (height === 1) {
		// One line: photo + name (+ class on the wide one).
		content = (
			<div style={size} className="widget-content-container parent-children-small" onClick={() => go(first.url)}>
				<div className="small-title-box">
					<ChildAvatar child={first}/>
					<div className="parent-child-text">
						<h1>{width === 4 ? (first.fullName || first.name) : first.name}</h1>
						{width === 4 && first.className && <span className="parent-child-class">{first.className}</span>}
					</div>
					{children.length > 1 && <span className="parent-child-more">+{children.length - 1}</span>}
					<TitleArrow/>
				</div>
			</div>
		);
	} else {
		content = (
			<div style={size} className={`widget-content-container parent-children-list${children.length === 1 ? ' single' : ''}`}>
				<div className="widget-title-box">
					<h1>{children.length > 1 ? 'Dzieci' : 'Twoje dziecko'}</h1>
				</div>
				{children.slice(0, width === 4 ? 2 : 1).map((child) => (
					<ChildRow key={child.url} child={child} links={children.length > 1 && width === 2 ? 2 : 4}/>
				))}
			</div>
		);
	}

	return <WidgetShell resize={resize} widgetId={widgetId} elementId="childrenWidget">{content}</WidgetShell>;
}
