import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { useWidgetResize } from './widgetResize.js';
import { useWidgetDragging } from './widgetDragging.js';


export function News({ widgetId, moveWidget, data }) {
	const news = data.news;
	const possibleLayout = [
		{ w: 2, h: 2 },
		{ w: 4, h: 2 },
		{ w: 2, h: 4},
		{ w: 4, h: 4},
		{ w: 2, h: 1 },
		{ w: 4, h: 1 },
	];
	const fullSize = {w: 4, h: 6}
	const {
		width,
		height,
		previewWidth,
		previewHeight,
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

	function NewsList({ limit, lastLine = 1, gradient = false, allHref = true}) {
		const visibleNews = news.slice(0, limit);

		return (
			<div
				style={{ width: `${previewWidth}px`, height: `${previewHeight}px` }}
				className="widget-content-container"
			>
				<div className="widget-title-box">
					<h1>AKTUALNOŚCI</h1>
				</div>

				{visibleNews.map((item, index) => (
					<NewsRow
						key={`${item.subjectUrl}-${index}`}
						item={item}
						isLast={index === visibleNews.length - lastLine || index === visibleNews.length - 1}
					/>
				))}
				{gradient && <div className="widget-news-gradient"></div>}
				{allHref && <a className="grades-all-link" href={"/informations"}>Zobacz Wszystkie</a>}
			</div>
		);
	}

	function Announcements22 () {
		return(<NewsList limit={2} gradient={true}/>)
	}

	function Announcements42 () {
		return(<NewsList limit={4} lastLine={2} gradient={true}/>)
	}
	function Announcements24 () {
		return(<NewsList limit={6} gradient={true}/>)
	}

	function Announcements44 () {
		return(<NewsList limit={8} lastLine={2} gradient={true}/>)
	}

	function Announcements21 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<h1>AKTUALNOŚCI</h1>
		</div>)
	}

	function Announcements41 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<h1>AKTUALNOŚCI</h1>
		</div>)
	}

	function Announcements46 () {
		return(<NewsList limit={12} lastLine={2} gradient={true}/>)
	}

	const gradeVariants = {
		'22': Announcements22,
		'42': Announcements42,
		'21': Announcements21,
		'41': Announcements41,
		'44': Announcements44,
		'24': Announcements24,
		'46': Announcements46,
	};

	const Variant = gradeVariants[`${width}${height}`] || Announcements22;

	return (
		<div ref={widgetRef} id="newsWidget" data-widget-id={widgetId} className={`widget w${width} h${height}`}>
			<div
				className="inner-widget"
				style={{ width: `${previewWidth}px`, height: `${previewHeight}px`, position: 'relative' }}
			>
				<Variant />
				<div ref={resizeZoneRef} className="resize-zone"></div>
			</div>
		</div>
	);
}
