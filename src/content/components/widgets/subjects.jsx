import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { useWidgetResize } from './widgetResize.js';
import { useWidgetDragging } from './widgetDragging.js';
import { groupSubjectsByLevel, levelLabel, subjectPath } from '../../subjectLevels.js';


export function Subjects({ widgetId, moveWidget, data }) {
	const subjects = data.subjects;
	// Levels come from the home markup when it has them, else from the user's own
	// profile (cached by loadSubjectLevels in 28-extracter.js).
	const [levelMap, setLevelMap] = useState(null);
	useEffect(() => {
		const list = subjects?.subjects || [];
		if (!list.length || list.every((subject) => subject.level)) return undefined;
		if (typeof window.loadSubjectLevels !== 'function') return undefined;
		let cancelled = false;
		window.loadSubjectLevels(data.ownProfileUrl)
			.then((map) => { if (!cancelled && map) setLevelMap(map); })
			.catch((error) => console.warn('[IDU2] Could not load subject levels', error));
		return () => { cancelled = true; };
	}, []);
	const subjectGroups = groupSubjectsByLevel((subjects?.subjects || []).map((subject) => ({
		...subject,
		level: subject.level || levelMap?.[subjectPath(subject.url)] || '',
	})));
	const hasLevels = subjectGroups.some((group) => group.level);
	const possibleLayout = [
		{ w: 4, h: 5 },
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
	} = useWidgetResize(possibleLayout, widgetId, 16, fullSize, true, {w: 4, h: 1});
	useWidgetDragging(widgetRef, previewWidth, previewHeight, resizingRef, resizeZoneRef, moveWidget, widgetId);

	function SubjectRow({ item, isLast = false, showDescription = false }) {
		return (
			<div className={`widget-subject-box ${isLast ? 'last' : ''}`}>
				<a href={item.url}>{item.name}</a>
			</div>
		);
	}

	function SubjectsList({lastLine = 1, classInfo = false}) {
		return (
			<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
				<div className="widget-title-box">
					<h1>Przedmioty</h1>
					<svg className={"titleArrow"} fill="currentColor" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
					     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
					     width="16px" height="16px" viewBox="0 0 42 42" xml:space="preserve">
					<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "/>
					</svg>
				</div>
				{hasLevels
					? (
						// Grouped by level like the profile's Przedmioty card; scrolls inside the widget if it doesn't fit.
						<div className="widget-subjects-groups" style={{ maxHeight: `${Math.max(previewHeight - 80, 48)}px` }}>
							{subjectGroups.map((group) => (
								<div key={group.level || 'none'} className="widget-subjects-group">
									<div className="widget-subjects-level">{levelLabel(group.level)}</div>
									<div className="widget-subjects-list">
										{group.subjects.map((item, index) => (
											<SubjectRow key={`${item.name}-${index}`} item={item} />
										))}
									</div>
								</div>
							))}
						</div>
					)
					: (
						<div className="widget-subjects-list">
							{subjects.subjects.map((item, index) => (
								<SubjectRow
									key={`${item.name}-${index}`}
									item={item}
									isLast={index === subjects.subjects.length - lastLine || index === subjects.subjects.length - 1}
								/>
							))}
						</div>
					)}

			</div>
		);
	}

	function Subjects45 () {
		return(<SubjectsList lastLine={2} />)
	}
	function Subjects46 () {
		return(<SubjectsList lastLine={2} />)
	}


	function Subjects21 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<div className={"small-title-box"}>
				<h1>Przedmioty</h1>
				<svg className={"titleArrow"} fill="currentColor" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
				     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
				     width="16px" height="16px" viewBox="0 0 42 42" xml:space="preserve">
					<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "/>
			</svg>
			</div>
		</div>)
	}

	function Subjects41 () {
		return(<div style={{ width: `${previewWidth}px`, height: `${previewHeight}px`}} className="widget-content-container">
			<div className={"small-title-box"}>
				<div className={"titleIcon"}>
					<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M5.63604 14.1238L7.05026 15.538M8.46447 11.2953L9.87868 12.7096M11.2929 8.46691L12.7071 9.88113M14.1213 5.63849L15.5355 7.0527M2.80762 16.9522L7.05026 21.1948L21.1924 7.0527L16.9498 2.81006L2.80762 16.9522Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
				<h1>Przedmioty</h1>
				<svg className={"titleArrow"} fill="currentColor" version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
				     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
				     width="16px" height="16px" viewBox="0 0 42 42" xml:space="preserve">
					<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 "/>
			</svg>
			</div>
		</div>)
	}


	const gradeVariants = {
		'21': Subjects21,
		'41': Subjects41,
		'45': Subjects45,
		'46': Subjects46,
	};

	const Variant = gradeVariants[`${width}${height}`] || Subjects21;

	return (
		<div ref={widgetRef} id="subjectsWidget" data-widget-id={widgetId} className={`widget w${width} h${height} ${window.editMode ? 'edit-mode' : ''}`}>
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
