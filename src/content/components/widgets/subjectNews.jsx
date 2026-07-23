import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { useWidgetResize } from './widgetResize.js';
import { useWidgetDragging } from './widgetDragging.js';


export function SubjectNews({ widgetId, moveWidget, data }) {
	const subjectNews = data.subjectAnnouncements;
	const possibleLayout = [
		{ w: 2, h: 2 },
		{ w: 4, h: 2 },
		{ w: 2, h: 1 },
		{ w: 4, h: 1 },
	];
	const fullSize = {w: 4, h: 5}
	const {
		width,
		height,
		previewWidth,
		previewHeight,
		openPopup,
		widgetRef,
		resizeZoneRef,
		resizingRef,
	} = useWidgetResize(possibleLayout, widgetId, 16, fullSize);
	useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget, widgetId);


	function NewsRow({ item, isLast = false}) {
		return (
			<div className={`widget-news-box ${isLast ? 'last' : ''}`}>
				<a href={item.titleUrl}>{item.title}</a>
			</div>
		);
	}

	function NewsList({ limit, lastLine = 1}) {
		const visibleNews = subjectNews.slice(0, limit);

		return (
			<div
				style={{ width: `${previewWidth}px`, height: `${previewHeight}px` }}
				className="widget-content-container"
			>
				<div className="widget-title-box">
					<h1>Ogłoszenia Przedmiotowe</h1>
				</div>

				{visibleNews.map((item, index) => (
					<NewsRow
						key={`${item.subjectUrl}-${index}`}
						item={item}
						isLast={index === visibleNews.length - lastLine || index === visibleNews.length - 1}
					/>
				))}
			</div>
		);
	}

	function Announcements22 () {
		return(<NewsList limit={2}/>)
	}

	function Announcements42 () {
		return(<NewsList limit={4} lastLine={2}/>)
	}

	function Announcements21 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<h1>Ogłoszenia Przedmiotowe</h1>
		</div>)
	}

	function Announcements41 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<h1>Ogłoszenia Przedmiotowe</h1>
		</div>)
	}

	function Announcements45 () {
		return(<NewsList limit={8} lastLine={2}/>)
	}

	const gradeVariants = {
		'22': Announcements22,
		'42': Announcements42,
		'21': Announcements21,
		'41': Announcements41,
		'45': Announcements45,
	};

	const Variant = gradeVariants[`${width}${height}`] || Announcements22;

	return (
		<div ref={widgetRef} id="announcementsWidget" data-widget-id={widgetId} className={`widget w${width} h${height} ${window.editMode ? 'edit-mode' : ''} ${openPopup ? 'popup-open' : ''}`}>
			<div
				className={`inner-widget ${openPopup ? 'widget-popup open widget-popup-open' : ''}`}
				style={{ width: `${previewWidth}px`, height: `${previewHeight}px`, position: 'relative' }}
			>
				<Variant />
				<div ref={resizeZoneRef} className="resize-zone"></div>
			</div>
		</div>
	);
}
