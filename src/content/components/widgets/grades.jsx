import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { useWidgetResize } from './widgetResize.js';
import { useWidgetDragging } from './widgetDragging.js';


export function Grades({ widgetId, moveWidget, data }) {
	const gradesData = data.grades;
	const possibleLayout = [
		{ w: 2, h: 2 },
		{ w: 2, h: 4 },
		{ w: 4, h: 2 },
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

	function normalizeGrade(grade) {
		const value = grade.trim().toLowerCase();

		if (/^[0-9]+[+-]?$/.test(value) || value === '+' || value === '-') {
			return value;
		}

		if (['zal', 'zaliczone'].includes(value)) {
			return 'zal';
		}

		if (['brak pracy'].includes(value)) {
			return 'BP';
		}

		if (['nzal', 'niezal', 'niezaliczone'].includes(value)) {
			return 'nzal';
		}

		return '...';
	}

	const preparedGrades = gradesData.map((item) => ({
		value: normalizeGrade(item.grade),
		subject: item.subject.split(' ')[0],
		subjectUrl: item.subjectUrl,
		description: item.description,
		gradeDescriptionUrl: item.gradeDescriptionUrl,
	}));

	function GradeRow({ item, isLast = false, showDescription = false }) {
		const descriptionLinkRef = useRef(null);

		useEffect(() => {
			if (!showDescription) return;
			if (!descriptionLinkRef.current) return;
			if (!window.jQuery?.fn?.fancybox) return;

			const options = {
				onComplete: function() {
					if (window.CKEDITOR) {
						window.ckeditorsInFancybox = window.ckeditorsInFancybox || [];
						window.jQuery('textarea.ckeditor').each(function(index, element) {
							const $element = window.jQuery(element);
							if (!$element.data('ckeditorInstance')) {
								$element.ckeditor();
								window.ckeditorsInFancybox.push($element.attr('id'));
							}
						});
					}
					if (window.jQuery.datepicker && typeof attachDatepickers === 'function') {
						attachDatepickers();
					}
				},
				onClosed: function() {
					if (window.CKEDITOR && Array.isArray(window.ckeditorsInFancybox)) {
						let id;
						while ((id = window.ckeditorsInFancybox.pop())) {
							const instance = CKEDITOR.instances[id];
							if (instance) {
								CKEDITOR.remove(instance);
							}
						}
					}
				}
			};

			window.jQuery(descriptionLinkRef.current).fancybox(options);
		}, [showDescription, item.gradeDescriptionUrl]);

		return (
			<div className={`widget-grade-box ${isLast ? 'last' : ''}`}>
				<p>{item.value}</p>
				<a href={item.subjectUrl}> | {item.subject}</a>
				{showDescription && (
					<a
						ref={descriptionLinkRef}
						href={item.gradeDescriptionUrl}
						className="grade-description fancybox"
					>
						{item.description}
					</a>
				)}
			</div>
		);
	}

	function GradesList({ limit, lastLine = 1,showDescription = false,allHref=false}) {
		const visibleGrades = preparedGrades.slice(0, limit);
		const seeMoreHref = gradesData[0]?.seeMoreUrl;
		const shouldShowSeeMore = allHref && seeMoreHref && seeMoreHref !== 'mogData';

		return (
			<div
				style={{ width: `${previewWidth}px`, height: `${previewHeight}px` }}
				className="widget-content-container"
			>
				<div className="widget-title-box">
					<h1>Oceny</h1>
					<svg className={"titleArrow"} fill="currentColor" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
					     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
					     width="16px" height="16px" viewBox="0 0 42 42" xml:space="preserve">
					<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "/>
					</svg>
				</div>


				{visibleGrades.map((item, index) => (
					<GradeRow
						key={`${item.subjectUrl}-${index}`}
						item={item}
						isLast={index === visibleGrades.length - lastLine || index === visibleGrades.length - 1}
						showDescription={showDescription}
					/>
				))}

				{shouldShowSeeMore && <a className="grades-all-link" href={seeMoreHref}>Wszystkie oceny</a>}
			</div>
		);
	}

	function Grades22 () {
		return <GradesList limit={2} />;
	}

	function Grades24 () {
		return <GradesList limit={5} />;
	}

	function Grades42 () {
		return <GradesList limit={4} lastLine={2}/>;
	}

	function Grades21 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<div className={"small-title-box"}>
				<h1>Oceny</h1>
				<svg className={"titleArrow"} fill="currentColor" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
				     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
				     width="16px" height="16px" viewBox="0 0 42 42" xml:space="preserve">
					<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "/>
			</svg>
			</div>
		</div>)
	}

	function Grades41 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<div className={"small-title-box"}>
				<div className={"titleIcon"}>
					<svg fill="currentColor" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<rect x="0" fill="none" width="24" height="24"/>
						<g>
							<path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V5h14v14zM9 17H7v-5h2v5zm4 0h-2v-7h2v7zm4 0h-2V7h2v10z"/>
						</g>

					</svg>
				</div>
				<h1>Oceny</h1>
				<svg className={"titleArrow"} fill="currentColor" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
				     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
				     width="16px" height="16px" viewBox="0 0 42 42" xml:space="preserve">
					<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "/>
			</svg>
			</div>
		</div>)
	}

	function Grades46 () {
		return <GradesList limit={6} lastLine={2} showDescription={true} allHref={true}/>;
	}

	const gradeVariants = {
		'22': Grades22,
		'24': Grades24,
		'42': Grades42,
		'21': Grades21,
		'41': Grades41,
		'46': Grades46,
	};

	const Variant = gradeVariants[`${width}${height}`] || Grades22;

	return (
		<div ref={widgetRef} id="gradesWidget" data-widget-id={widgetId} className={`widget w${width} h${height} ${window.editMode ? 'edit-mode' : ''}`}>
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
