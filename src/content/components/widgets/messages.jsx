import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { useWidgetResize } from './widgetResize.js';
import { useWidgetDragging } from './widgetDragging.js';


export function Messages({ widgetId, moveWidget, data }) {

	const possibleLayout = [
		{ w: 2, h: 1 },
		{ w: 4, h: 1 },
	];
	const fullSize = {w: 4, h: 1}
	const {
		width,
		height,
		previewWidth,
		previewHeight,
		widgetRef,
		resizeZoneRef,
		resizingRef,
	} = useWidgetResize(possibleLayout, widgetId, 16, fullSize, false, possibleLayout[0]);
	useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget, widgetId);

	function Messages21 () {
		return(<div onClick={() => window.open("/internal_messages", "_self")} style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<div className={"small-title-box"}>
				<h1>Wiadomości</h1>
				<svg className={"titleArrow"} fill="currentColor" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
				     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
				     width="16px" height="16px" viewBox="0 0 42 42" xml:space="preserve">
					<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "/>
			</svg>
			</div>
		</div>)
	}

	function Messages41 () {
		return(<div onClick={() => window.open("/internal_messages", "_self")} style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<div className={"small-title-box"}>
				<div className={"titleIcon"}>
					<svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
					     width="20px" height="20px" viewBox="0 0 50.215 50.215"
					     xml:space="preserve">
<g>
	<path d="M25.108,0C11.357,0,0.171,9.396,0.171,20.946c0,6.226,3.339,12.146,9.01,16.104c-0.18,3.082-2.679,7.061-3.664,8.358
		c-0.686,0.903-0.803,2.121-0.301,3.14c0.506,1.02,1.545,1.666,2.683,1.666c6.839,0,14.323-5.353,17.957-8.33
		c13.403-0.334,24.188-9.599,24.188-20.938C50.044,9.396,38.858,0,25.108,0z M25.12,35.906h-0.003
		c-0.82-0.057-1.662,0.168-2.291,0.707c-2.559,2.191-5.783,4.473-8.912,5.96c0.938-2.38,1.565-5.128,1.1-7.738
		c-0.15-0.846-0.659-1.587-1.395-2.032c-4.742-2.877-7.463-7.199-7.463-11.856c0-8.249,8.502-14.961,18.952-14.961
		c10.449,0,18.951,6.712,18.951,14.961S35.56,35.906,25.12,35.906z"/>
</g>
</svg>
				</div>
				<h1>Wiadomości</h1>
				<svg className={"titleArrow"} fill="currentColor" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
				     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
				     width="16px" height="16px" viewBox="0 0 42 42" xml:space="preserve">
					<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "/>
			</svg>
			</div>
		</div>)
	}

	const contentVariants = {
		'21': Messages21,
		'41': Messages41,
	};

	const Variant = contentVariants[`${width}${height}`] || Messages21;

	return (
		<div ref={widgetRef} id="messagesWidget" data-widget-id={widgetId} className={`widget w${width} h${height} ${window.editMode ? 'edit-mode' : ''}`}>
			<div
				className="inner-widget"
				style={{ width: `${previewWidth}px`, height: `${previewHeight}px`, position: 'relative' }}
			>
				<Variant/>
				<div ref={resizeZoneRef} className="resize-zone"></div>
			</div>
		</div>
	);
}
