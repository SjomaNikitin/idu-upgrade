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

	function shortageNames(name) {
		const names = ['ang', 'angielski', 'pol', 'polski', 'biol', 'biologia', 'his', 'historia', 'biz', 'biznes', 'kul', 'kultura', 'wiedza', 'wos', 'fizyczne', 'wf'];
		for (let i = 0; i < names.length / 2; i += 2) {
			if (name.includes(names[i])) {
				return names[i + 1];
			}
		}
		return name;
	}

	function truncateSubject(name, maxLength = 10) {
		return name.length > maxLength
			? `${name.slice(0, maxLength)}...`
			: name;
	}

	const preparedGrades = gradesData.map((item) => ({
		value: normalizeGrade(item.grade),
		subject: shortageNames(item.subject || ''),
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
			<div className={`widget-grade-box ${showDescription ? 'with-description' : ''}`}>
				<div className="widget-grade-box-value">
					<span>{item.value}</span>
				</div>

				<div className="grade-text">
					<a href={item.subjectUrl} title={item.subject}>
						{item.subject}
					</a>

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
			</div>
		);
	}

	function GradesList({ limit, lastLine = 1,showDescription = false,allHref=false}) {
		const visibleGrades = preparedGrades.slice(0, limit);
		const seeMoreHref = gradesData[0]?.seeMoreUrl;
		const shouldShowSeeMore = allHref && seeMoreHref && seeMoreHref !== 'mogData';

		return (
			<div
				style={{ width: `${previewWidth}px`, height: `${previewHeight}px`, gap: 'var(--padding-1)'}}
				className="widget-content-container"
			>
				<div className="widget-title-box" style={{marginBottom: 'var(--padding-1)'}}>
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
					<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8 8H8.01M16 8H16.01M12 12H12.01M16 16H16.01M8 16H8.01M7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V7.2C20 6.0799 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.07989 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
		return <GradesList limit={7} lastLine={2} showDescription={true} allHref={true}/>;
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
