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
	} = useWidgetResize(possibleLayout, widgetId, 16, fullSize, true, {w: 4, h: 2});
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
				<div className="widget-title-box">
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
					<svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transform: "translateY(-1px)"}}>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M6.31317 12.463C6.20006 9.29213 8.60976 6.6252 11.701 6.5C14.7923 6.6252 17.202 9.29213 17.0889 12.463C17.0889 13.78 18.4841 15.063 18.525 16.383C18.525 16.4017 18.525 16.4203 18.525 16.439C18.5552 17.2847 17.9124 17.9959 17.0879 18.029H13.9757C13.9786 18.677 13.7404 19.3018 13.3098 19.776C12.8957 20.2372 12.3123 20.4996 11.701 20.4996C11.0897 20.4996 10.5064 20.2372 10.0923 19.776C9.66161 19.3018 9.42346 18.677 9.42635 18.029H6.31317C5.48869 17.9959 4.84583 17.2847 4.87602 16.439C4.87602 16.4203 4.87602 16.4017 4.87602 16.383C4.91795 15.067 6.31317 13.781 6.31317 12.463Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M9.42633 17.279C9.01212 17.279 8.67633 17.6148 8.67633 18.029C8.67633 18.4432 9.01212 18.779 9.42633 18.779V17.279ZM13.9757 18.779C14.3899 18.779 14.7257 18.4432 14.7257 18.029C14.7257 17.6148 14.3899 17.279 13.9757 17.279V18.779ZM12.676 5.25C13.0902 5.25 13.426 4.91421 13.426 4.5C13.426 4.08579 13.0902 3.75 12.676 3.75V5.25ZM10.726 3.75C10.3118 3.75 9.97601 4.08579 9.97601 4.5C9.97601 4.91421 10.3118 5.25 10.726 5.25V3.75ZM9.42633 18.779H13.9757V17.279H9.42633V18.779ZM12.676 3.75H10.726V5.25H12.676V3.75Z" fill="currentColor"/>
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
