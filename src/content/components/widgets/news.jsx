import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { useWidgetResize } from './widgetResize.js';
import { useWidgetDragging } from './widgetDragging.js';


export function News({ widgetId, moveWidget, data }) {
	const news = data.news;
	const possibleLayout = [
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
	} = useWidgetResize(possibleLayout, widgetId, 16, fullSize, true, {w: 2, h: 1});
	useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget, widgetId);


	function NewsRow({ item, isLast = false}) {
		return (
			<div className={`widget-news-box ${isLast ? 'last' : ''}`}>
				<div className={'widget-news-box-date'}>
					<span className={"widget-news-box-date-day"}>{item.date.slice(0, 2)}</span>
					<br></br>
					<span className={"widget-news-box-date-month"}>{item.date.slice(3, 6)}</span>
				</div>
				<a href={item.titleUrl}>{item.title} <br></br> <span className={"widget-news-box-comments"}>komentarze: {item.comments}</span></a>
			</div>
		);
	}

	function NewsList({ limit, lastLine = 1, gradient = false, allHref = true}) {
		const visibleNews = news.slice(0, limit);
		const allNewsHref = '/informations';
		const shouldShowSeeMore = allHref && allNewsHref !== 'mogData';

		return (
			<div
				style={{ width: `${previewWidth}px`, height: `${previewHeight}px` }}
				className="widget-content-container"
			>
				<div className="widget-title-box" style={{marginBottom: 'var(--padding-1)'}}>
					<h1>Aktualności</h1>
					<svg className={"titleArrow"} fill="currentColor" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
					     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
					     width="16px" height="16px" viewBox="0 0 42 42" xml:space="preserve">
					<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "/>
					</svg>
				</div>

				{visibleNews.map((item, index) => (
					<NewsRow
						key={`${item.subjectUrl}-${index}`}
						item={item}
						isLast={index === visibleNews.length - lastLine || index === visibleNews.length - 1}
					/>
				))}
				{gradient && <div className="widget-news-gradient"></div>}
				{shouldShowSeeMore && !window.__IDU_MOCK_DATA &&<a className="grades-all-link" href={allNewsHref}>Zobacz Wszystkie</a>}
			</div>
		);
	}

	function Announcements22 () {
		return(<NewsList limit={2} gradient={true}/>)
	}

	function Announcements42 () {
		return(<NewsList limit={2} lastLine={2} gradient={false} allHref={false}/>)
	}
	function Announcements24 () {
		return(<NewsList limit={6} gradient={true}/>)
	}

	function Announcements44 () {
		return(<NewsList limit={8} lastLine={2} gradient={true}/>)
	}

	function Announcements21 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<div className={"small-title-box"}>
				<h1>Aktualności</h1>
				<svg className={"titleArrow"} fill="currentColor" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
				     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
				     width="16px" height="16px" viewBox="0 0 42 42" xml:space="preserve">
					<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "/>
			</svg>
			</div>
		</div>)
	}

	function Announcements41 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<div className={"small-title-box"}>
				<div className={"titleIcon"}>
					<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M9.00195 17H5.60636C4.34793 17 3.71872 17 3.58633 16.9023C3.4376 16.7925 3.40126 16.7277 3.38515 16.5436C3.37082 16.3797 3.75646 15.7486 4.52776 14.4866C5.32411 13.1835 6.00031 11.2862 6.00031 8.6C6.00031 7.11479 6.63245 5.69041 7.75766 4.6402C8.88288 3.59 10.409 3 12.0003 3C13.5916 3 15.1177 3.59 16.2429 4.6402C17.3682 5.69041 18.0003 7.11479 18.0003 8.6C18.0003 11.2862 18.6765 13.1835 19.4729 14.4866C20.2441 15.7486 20.6298 16.3797 20.6155 16.5436C20.5994 16.7277 20.563 16.7925 20.4143 16.9023C20.2819 17 19.6527 17 18.3943 17H15.0003M9.00195 17L9.00031 18C9.00031 19.6569 10.3435 21 12.0003 21C13.6572 21 15.0003 19.6569 15.0003 18V17M9.00195 17H15.0003" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
				<h1>Aktualności</h1>
				<svg className={"titleArrow"} fill="currentColor" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
				     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
				     width="16px" height="16px" viewBox="0 0 42 42" xml:space="preserve">
					<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "/>
			</svg>
			</div>
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
		<div ref={widgetRef} id="newsWidget" data-widget-id={widgetId} className={`widget w${width} h${height} ${window.editMode ? 'edit-mode' : ''}`}>
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
