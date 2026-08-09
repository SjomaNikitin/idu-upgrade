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
					<svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transform: "translateY(-1px)"}}>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M6.31317 12.463C6.20006 9.29213 8.60976 6.6252 11.701 6.5C14.7923 6.6252 17.202 9.29213 17.0889 12.463C17.0889 13.78 18.4841 15.063 18.525 16.383C18.525 16.4017 18.525 16.4203 18.525 16.439C18.5552 17.2847 17.9124 17.9959 17.0879 18.029H13.9757C13.9786 18.677 13.7404 19.3018 13.3098 19.776C12.8957 20.2372 12.3123 20.4996 11.701 20.4996C11.0897 20.4996 10.5064 20.2372 10.0923 19.776C9.66161 19.3018 9.42346 18.677 9.42635 18.029H6.31317C5.48869 17.9959 4.84583 17.2847 4.87602 16.439C4.87602 16.4203 4.87602 16.4017 4.87602 16.383C4.91795 15.067 6.31317 13.781 6.31317 12.463Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M9.42633 17.279C9.01212 17.279 8.67633 17.6148 8.67633 18.029C8.67633 18.4432 9.01212 18.779 9.42633 18.779V17.279ZM13.9757 18.779C14.3899 18.779 14.7257 18.4432 14.7257 18.029C14.7257 17.6148 14.3899 17.279 13.9757 17.279V18.779ZM12.676 5.25C13.0902 5.25 13.426 4.91421 13.426 4.5C13.426 4.08579 13.0902 3.75 12.676 3.75V5.25ZM10.726 3.75C10.3118 3.75 9.97601 4.08579 9.97601 4.5C9.97601 4.91421 10.3118 5.25 10.726 5.25V3.75ZM9.42633 18.779H13.9757V17.279H9.42633V18.779ZM12.676 3.75H10.726V5.25H12.676V3.75Z" fill="currentColor"/>
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
