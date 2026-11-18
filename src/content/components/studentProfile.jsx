import { h } from 'preact';
import { createPortal, memo } from 'preact/compat';
import { useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks';
import { normalizeGrade, shortageNames } from './widgets/grades.jsx';
import { AttendanceChart, AttendanceRow } from './widgets/attendance.jsx';
import { ScheduleGrid } from './widgets/schedule.jsx';
import { levelLabel } from '../subjectLevels.js';

const LIST_PREVIEW_COUNT = 5;
const MONTHS = { sty: 0, lut: 1, mar: 2, kwi: 3, maj: 4, cze: 5, lip: 6, sie: 7, wrz: 8, paź: 9, paz: 9, lis: 10, gru: 11 };

// ---------- small helpers ----------

function parsePolishDate(text) {
	const match = (text || '').match(/(\d{1,2})\s+([a-ząćęłńóśźż]{3})\w*\s+(\d{4})/i);
	if (!match) return null;
	const month = MONTHS[match[2].toLocaleLowerCase('pl-PL')];
	return month === undefined ? null : new Date(Number(match[3]), month, Number(match[1]));
}

function daysUntilLabel(date) {
	if (!date) return '';
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const days = Math.round((date - today) / 86400000);
	if (days < 0) return '';
	if (days === 0) return 'dziś';
	if (days === 1) return 'jutro';
	return `za ${days} dni`;
}

function phoneHref(value) {
	const digits = (value || '').replace(/[^\d+]/g, '');
	return digits.length >= 6 ? `tel:${digits}` : '';
}

function initialsOf(name) {
	return (name || '').split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toLocaleUpperCase('pl-PL');
}

// Lay out half-width fields so none is left alone next to an empty cell:
// a half field that would sit alone in its row (before a wide one, or last) spans the row.
function layoutFields(fields) {
	const result = [];
	let column = 0;
	fields.forEach((field, index) => {
		if (field.wide) {
			result.push(field);
			column = 0;
			return;
		}
		const next = fields[index + 1];
		const alone = column === 0 && (!next || next.wide);
		result.push(alone ? { ...field, wide: true } : field);
		column = alone ? 0 : (column + 1) % 2;
	});
	return result;
}

function Chevron({ open = false }) {
	return (
		<svg className={`idu-profile-chevron-icon${open ? ' open' : ''}`} width="14" height="14" viewBox="0 0 42 42" fill="currentColor" aria-hidden="true">
			<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933" />
		</svg>
	);
}

function Card({ index, title, href, subtitle, children, className = '' }) {
	const heading = <h2 className="idu-profile-card-title">{title}</h2>;
	return (
		<article className={`idu-profile-card ${className}`} style={{ '--i': index }}>
			{title && (
				<div className="idu-profile-card-head">
					{href ? <a className="idu-profile-card-link" href={href}>{heading}<Chevron /></a> : heading}
					{subtitle && <p className="idu-profile-card-subtitle">{subtitle}</p>}
				</div>
			)}
			{children}
		</article>
	);
}

function MoreButton({ expanded, total, onClick }) {
	return (
		<button type="button" className="idu-profile-more" onClick={onClick} aria-expanded={expanded}>
			{expanded ? 'Pokaż mniej ↑' : `Pokaż wszystkie (${total}) ↓`}
		</button>
	);
}

function SeeAllLink({ href }) {
	return href ? <a className="idu-profile-see-all" href={href}>Zobacz wszystkie →</a> : null;
}

function CardFoot({ button, href }) {
	if (!button && !href) return null;
	return <div className="idu-profile-card-foot">{button}<SeeAllLink href={href} /></div>;
}

function usePreview(items) {
	const [expanded, setExpanded] = useState(false);
	const canExpand = items.length > LIST_PREVIEW_COUNT;
	return {
		visible: expanded || !canExpand ? items : items.slice(0, LIST_PREVIEW_COUNT),
		button: canExpand ? <MoreButton expanded={expanded} total={items.length} onClick={() => setExpanded(!expanded)} /> : null,
	};
}

// ---------- profile card ----------

// Full-screen photo popup. Rendered into <body> so the card's transforms/animations
// can't trap the fixed overlay. Closes with the X, a tap on the backdrop, or Escape.
function PhotoViewer({ src, fallback, name, onClose }) {
	const closeRef = useRef(null);
	// The blurred preview (if any) fills the frame straight away; the sharp photo fades in over it.
	const [loaded, setLoaded] = useState(false);
	const [failed, setFailed] = useState(false);
	const [closing, setClosing] = useState(false);

	const close = () => {
		if (closing) return;
		const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
		if (reduce) return onClose();
		setClosing(true);
		setTimeout(onClose, 180);
	};

	useEffect(() => {
		const previousFocus = document.activeElement;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		closeRef.current?.focus();
		const onKey = (event) => { if (event.key === 'Escape') close(); };
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = previousOverflow;
			previousFocus?.focus?.();
		};
	}, []);

	return createPortal(
		<div
			className={`idu-photo-viewer${closing ? ' closing' : ''}`}
			role="dialog"
			aria-modal="true"
			aria-label={name ? `Zdjęcie: ${name}` : 'Zdjęcie'}
			onClick={(event) => { if (event.target === event.currentTarget) close(); }}
		>
			<button ref={closeRef} type="button" className="idu-photo-viewer-close" aria-label="Zamknij" onClick={close}>
				<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />
				</svg>
			</button>
			{/* Scrolls on its own layer so the X above stays put (the backdrop blur makes position: fixed relative to the popup). */}
			<div className="idu-photo-viewer-scroll" onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
			<figure className="idu-photo-viewer-figure" onClick={(event) => event.stopPropagation()}>
				<div className={`idu-photo-viewer-frame${fallback ? ' has-preview' : ''}`}>
					{fallback && <img className="idu-photo-viewer-preview" src={fallback} alt="" aria-hidden="true" />}
					{!failed && (
						<img
							className={`idu-photo-viewer-full${loaded ? ' loaded' : ''}`}
							src={src}
							alt={name}
							onLoad={() => setLoaded(true)}
							onError={() => setFailed(true)}
						/>
					)}
				</div>
				{name && <figcaption>{name}</figcaption>}
			</figure>
			</div>
		</div>,
		document.body
	);
}

// The custom-photo mapping and the blur -> sharp fade live in css/content/29-image-replace.js.
const Avatar = memo(function Avatar({ name, photoUrl }) {
	const imgRef = useRef(null);
	const [viewer, setViewer] = useState(null);
	const replacement = window.getProfileImageReplacement?.(name) || null;
	// Mapped students start on the tiny inline preview so the original photo never flashes.
	const src = replacement ? replacement.tiny : photoUrl;

	useLayoutEffect(() => {
		if (replacement && imgRef.current) window.upgradeProfileImage?.(imgRef.current, name);
	}, [name]);

	if (!src) {
		return (
			<div className="idu-profile-avatar">
				<span className="idu-profile-avatar-initials">{initialsOf(name) || '?'}</span>
			</div>
		);
	}

	const open = () => {
		// Show the full custom photo if there is one, else whatever the avatar is showing now;
		// fall back to the blurred preview if the full photo can't load.
		const shown = imgRef.current?.currentSrc || imgRef.current?.src || src;
		setViewer({ src: replacement ? replacement.full : shown, fallback: replacement ? shown : '' });
	};

	// An array instead of a fragment: the build has no JSX fragment factory configured.
	return [
		<button key="avatar" type="button" className="idu-profile-avatar clickable" onClick={open} aria-label="Powiększ zdjęcie" aria-haspopup="dialog">
			<img ref={imgRef} src={src} alt={name} data-idu-profile-photo="" data-student-name={name} />
		</button>,
		viewer && <PhotoViewer key="viewer" src={viewer.src} fallback={viewer.fallback} name={name} onClose={() => setViewer(null)} />,
	];
});

function FieldValue({ field }) {
	if (field.type === 'email') {
		const address = field.lines.join(' ').match(/\S+@\S+/)?.[0];
		return address ? <a href={`mailto:${address}`}>{field.lines.join(' ')}</a> : field.lines.join(' ');
	}
	if (field.type === 'phone') {
		const href = phoneHref(field.lines.join(' '));
		return href ? <a href={href}>{field.lines.join(' ')}</a> : field.lines.join(' ');
	}
	if (field.type === 'links' && field.links.length) {
		return field.links.map((link, index) => (
			<span key={link.href}>{index > 0 && ', '}<a href={link.href} target="_blank" rel="noopener noreferrer">{link.text}</a></span>
		));
	}
	if (field.href) return <a href={field.href}>{field.lines.join(' ')}</a>;
	return field.lines.map((line, index) => <span key={index} className="idu-profile-line">{line}</span>);
}

function FieldGrid({ fields }) {
	if (!fields.length) return null;
	return (
		<dl className="idu-profile-grid">
			{layoutFields(fields).map((field) => (
				<div key={field.key} className={`idu-profile-field${field.wide ? ' wide' : ''}`}>
					<dt>{field.label}</dt>
					<dd><FieldValue field={field} /></dd>
				</div>
			))}
		</dl>
	);
}

function Section({ title, children }) {
	return (
		<section className="idu-profile-section">
			<h3 className="idu-profile-section-title">{title}</h3>
			{children}
		</section>
	);
}

// Identical addresses (often all three) are shown once with a combined label.
function mergeAddresses(fields) {
	const merged = [];
	for (const field of fields) {
		const same = merged.find((other) => other.lines.join('\n') === field.lines.join('\n'));
		if (same) {
			same.labels.push(field.label);
		} else {
			merged.push({ ...field, labels: [field.label] });
		}
	}
	return merged.map((field) => ({
		...field,
		label: field.labels.length === 1
			? field.labels[0]
			: `Adres ${field.labels.map((label) => label.replace(/^Adres\s+/i, '')).join(' · ')}`,
	}));
}

function ProfileCard({ profile, index }) {
	const headerFields = [
		profile.year && { key: 'year', label: 'Rocznik', lines: [profile.year] },
		profile.klass && { key: 'klass', label: 'Klasa', lines: [profile.klass], href: profile.klassUrl },
	].filter(Boolean);
	const tutors = profile.tutors || [];
	const { contact, addresses, student } = profile.sections;

	return (
		<Card index={index} className="idu-profile-main">
			<div className="idu-profile-identity">
				<Avatar name={profile.name} photoUrl={profile.photoUrl} />
				<div className="idu-profile-identity-text">
					<h2 className="idu-profile-name">{profile.name || 'Uczeń'}</h2>
					{profile.editUrl && <a className="idu-profile-edit" href={profile.editUrl}>Edytuj profil</a>}
				</div>
			</div>
			{profile.messageUrl && (
				<a className="idu-profile-action" href={profile.messageUrl}>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
						<path d="M4 6.5h16v11H4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
						<path d="m4.5 7 7.5 6 7.5-6" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
					</svg>
					Wyślij wiadomość
				</a>
			)}

			{(headerFields.length > 0 || tutors.length > 0) && (
				<dl className="idu-profile-grid idu-profile-header-grid">
					{layoutFields([
						...headerFields,
						...(tutors.length ? [{ key: 'tutor', label: tutors.length > 1 ? 'Wychowawcy' : 'Wychowawca', tutors, wide: true }] : []),
					]).map((field) => (
						<div key={field.key} className={`idu-profile-field${field.wide ? ' wide' : ''}`}>
							<dt>{field.label}</dt>
							<dd>
								{field.tutors
									? field.tutors.map((tutor, i) => (
										<span key={i}>{i > 0 && ', '}{tutor.href ? <a href={tutor.href}>{tutor.name}</a> : tutor.name}</span>
									))
									: <FieldValue field={field} />}
							</dd>
						</div>
					))}
				</dl>
			)}

			{profile.parents.length > 0 && (
				<Section title="Rodzice / opiekunowie">
					<div className="idu-profile-chips parents">
						{profile.parents.map((parent, i) => (
							parent.href
								? <a key={i} className="idu-profile-chip" style={{ '--i': i }} href={parent.href}>{parent.name}</a>
								: <span key={i} className="idu-profile-chip" style={{ '--i': i }}>{parent.name}</span>
						))}
					</div>
				</Section>
			)}

			{contact.length > 0 && <Section title="Dane kontaktowe"><FieldGrid fields={contact} /></Section>}
			{addresses.length > 0 && <Section title="Adresy"><FieldGrid fields={mergeAddresses(addresses)} /></Section>}
			{student.length > 0 && <Section title="Dane ucznia"><FieldGrid fields={student} /></Section>}
		</Card>
	);
}

// ---------- event cards ----------

function ExamsCard({ exams, index }) {
	const { visible, button } = usePreview(exams);
	return (
		<Card index={index} title="Sprawdziany" subtitle="Najbliższe zapowiedziane">
			<ul className="idu-profile-list">
				{visible.map((exam, i) => {
					const date = parsePolishDate(exam.date);
					const until = daysUntilLabel(date);
					return (
						<li key={i} className="idu-profile-row" style={{ '--i': i }}>
							<div className="idu-profile-date-badge">
								{date && <span className="day">{date.getDate()}</span>}
								<span className="month">{date ? exam.date.split(/\s+/)[1] : exam.date}</span>
							</div>
							<div className="idu-profile-row-main">
								<div className="idu-profile-row-top">
									{exam.subjectUrl ? <a className="idu-profile-row-title" href={exam.subjectUrl}>{exam.subject}</a> : <span className="idu-profile-row-title">{exam.subject}</span>}
									{until && <span className={`idu-profile-tag${/dziś|jutro/.test(until) ? ' soon' : ''}`}>{until}</span>}
								</div>
								{(exam.name || exam.description) && (
									<p className="idu-profile-row-text">
										{exam.name}{exam.name && exam.description && exam.description !== exam.name ? ' · ' : ''}{exam.description !== exam.name ? exam.description : ''}
									</p>
								)}
							</div>
						</li>
					);
				})}
			</ul>
			<CardFoot button={button} />
		</Card>
	);
}

// ---------- cards built from the home-page widgets ----------
// Same markup, classes and ids as the dashboard widgets (grades.jsx, attendance.jsx,
// schedule.jsx) so they look identical; only the fixed grid size is replaced by full width.

function WidgetTitle({ title, href }) {
	const arrow = (
		<svg className="titleArrow" fill="currentColor" width="16px" height="16px" viewBox="0 0 42 42" aria-hidden="true">
			<polygon fill-rule="evenodd" points="13.933,1 34,21.068 14.431,40.637 9.498,35.704 24.136,21.068 9,5.933 " />
		</svg>
	);
	return (
		<div className="widget-title-box" style={{ marginBottom: 'var(--padding-1)' }}>
			<h1>{title}</h1>
			{href ? <a className="idu-profile-widget-arrow" href={href} aria-label={`${title}: zobacz wszystkie`}>{arrow}</a> : arrow}
		</div>
	);
}

function WidgetCard({ id, size, index, gap = 'var(--padding-1)', hasFooterLink = false, children }) {
	return (
		<div className="idu-profile-widget" style={{ '--i': index }}>
			<div id={id} className={`widget ${size}`}>
				<div className="inner-widget" style={{ position: 'relative' }}>
					<div className={`widget-content-container${hasFooterLink ? ' with-footer-link' : ''}`} style={{ gap }}>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}

const GRADES_WIDGET_LIMIT = 6;

// Like the large "Oceny" widget (Grades46): value box, subject, description, "Wszystkie oceny".
function GradesCard({ grades, href, index }) {
	const [open, setOpen] = useState(null);
	const items = grades.slice(0, GRADES_WIDGET_LIMIT);
	return (
		<WidgetCard id="gradesWidget" size="w4 h6" index={index} hasFooterLink={Boolean(href)}>
			<WidgetTitle title="Oceny" href={href} />
			{items.map((grade, i) => {
				const isOpen = open === i;
				const description = grade.description || grade.grade;
				// An array instead of a fragment (no JSX fragment factory in this build):
				// the full comment opens as its own block under the row, so rows keep a fixed height.
				return [
					<div key={`row-${i}`} className="widget-grade-box with-description" title={description}>
						<div className="widget-grade-box-value">
							<span>{normalizeGrade(grade.grade)}</span>
						</div>
						<div className="grade-text">
							<a href={grade.subjectUrl} title={grade.subject}>{shortageNames(grade.subject || '')}</a>
							{grade.detail
								? (
									<button type="button" className="grade-description idu-profile-grade-toggle" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
										{description}
									</button>
								)
								: <span className="grade-description">{description}</span>}
						</div>
					</div>,
					isOpen && <p key={`detail-${i}`} className="idu-profile-grade-detail">{grade.detail}</p>,
				];
			})}
			{href && <a className="grades-all-link" href={href}>Wszystkie oceny</a>}
		</WidgetCard>
	);
}

// Like the "Obecności" widget (Attendance44): rows with coloured dots + the donut chart.
function AttendanceCard({ attendance, href, showChart, index }) {
	const half = 'calc(50% - var(--padding-1))';
	return (
		<WidgetCard id="attendanceWidget" size="w4 h4" index={index} gap="8px" hasFooterLink={Boolean(href)}>
			<WidgetTitle title="Obecności" href={href} />
			<div className="attendance-grid" style={{ width: showChart ? half : '100%' }}>
				{attendance.slice(0, 10).map((item, i) => (
					<AttendanceRow key={`${item.subjectUrl}-${i}`} item={item} rowWidth="100%" />
				))}
			</div>
			{showChart && <AttendanceChart width={half} seeMoreUrl={href} />}
			{href && <a href={href} className="grades-all-link">Zobacz więcej</a>}
		</WidgetCard>
	);
}

function EventsCard({ title, events, href, index }) {
	const { visible, button } = usePreview(events);
	return (
		<Card index={index} title={title} href={href}>
			<ul className="idu-profile-list">
				{visible.map((event, i) => (
					<li key={i} className="idu-profile-row" style={{ '--i': i }}>
						<div className="idu-profile-row-main">
							<div className="idu-profile-row-top">
								{event.subjectUrl ? <a className="idu-profile-row-title" href={event.subjectUrl}>{event.subject}</a> : <span className="idu-profile-row-title">{event.subject || event.name}</span>}
								{event.date && <span className="idu-profile-row-date">{event.date}</span>}
							</div>
							{event.subject && event.name && <p className="idu-profile-row-text">{event.name}</p>}
							{event.description && <p className="idu-profile-row-text">{event.description}</p>}
						</div>
					</li>
				))}
			</ul>
			<CardFoot button={button} href={href} />
		</Card>
	);
}

function FilesCard({ files, index }) {
	return (
		<Card index={index} title="Przypisane pliki">
			<div className="idu-profile-chips">
				{files.map((file, i) => <a key={file.href} className="idu-profile-chip" style={{ '--i': i }} href={file.href}>{file.text}</a>)}
			</div>
		</Card>
	);
}

// ---------- subjects & timetable ----------

function SubjectsCard({ groups, className, index }) {
	const [selected, setSelected] = useState(null);
	const total = groups.reduce((sum, group) => sum + group.subjects.length, 0);

	return (
		<Card index={index} title="Przedmioty" subtitle={[className, `${total} ${total === 1 ? 'przedmiot' : 'przedmiotów'}`].filter(Boolean).join(' · ')}>
			{groups.map((group, groupIndex) => (
				<div key={groupIndex} className="idu-profile-subject-group">
					{group.level && <h3 className="idu-profile-group-title">{levelLabel(group.level)}</h3>}
					<div className="idu-profile-chips">
						{group.subjects.map((subject, i) => {
							const id = `${groupIndex}-${i}`;
							const isOpen = selected === id;
							return (
								<button
									key={id}
									type="button"
									className={`idu-profile-chip subject${subject.italic ? ' extra' : ''}${isOpen ? ' active' : ''}`}
									style={{ '--i': i }}
									aria-expanded={isOpen}
									onClick={() => setSelected(isOpen ? null : id)}
								>
									{subject.name}
								</button>
							);
						})}
					</div>
					{group.subjects.map((subject, i) => (selected === `${groupIndex}-${i}` && (
						<div key={i} className="idu-profile-detail">
							<div className="idu-profile-detail-title">{subject.name}</div>
							{subject.title && subject.title !== subject.name && <div className="idu-profile-detail-text">{subject.title}</div>}
							{subject.teachers.length > 0 && (
								<div className="idu-profile-detail-text">
									{subject.teachers.length > 1 ? 'Nauczyciele: ' : 'Nauczyciel: '}
									{subject.teachers.map((teacher, t) => (
										<span key={t}>{t > 0 && ', '}<a href={teacher.href}>{teacher.name}</a></span>
									))}
								</div>
							)}
							{subject.url && <a className="idu-profile-see-all" href={subject.url}>Otwórz przedmiot →</a>}
						</div>
					)))}
				</div>
			))}
		</Card>
	);
}

// Like the weekly "Plan Lekcji" widget (Schedule46), fed from the profile's own timetable.
function TimetableCard({ timetable, subjectNames, index }) {
	// The timetable says "drugi język 2"; the subjects list knows it's "język hiszpański".
	const nameOf = (lesson) => subjectNames.get(lesson.subjectUrl) || lesson.subject;
	const scheduleData = {};
	for (const day of timetable.days) scheduleData[day.key] = {};
	for (const row of timetable.rows) {
		for (const [dayKey, lessons] of Object.entries(row.lessons)) {
			const lesson = lessons[0];
			const day = timetable.days.find((d) => d.key === dayKey);
			scheduleData[dayKey][`${row.start}-${row.end}`] = {
				lessonNumber: row.number,
				subject: nameOf(lesson),
				subjectHref: lesson.subjectUrl,
				day: day?.label || dayKey,
			};
		}
	}

	return (
		<WidgetCard id="scheduleWidget" size="w4 h6" index={index}>
			<WidgetTitle title="Plan Lekcji" href={timetable.url} />
			<ScheduleGrid scheduleData={scheduleData} mode="all" />
		</WidgetCard>
	);
}

export function StudentProfile({ data }) {
	const { profile } = data;
	const cards = [];
	const add = (key, render) => cards.push({ key, render });

	add('profile', (index) => <ProfileCard profile={profile} index={index} />);
	if (data.exams?.length) add('exams', (index) => <ExamsCard exams={data.exams} index={index} />);
	if (data.grades?.length) add('grades', (index) => <GradesCard grades={data.grades} href={data.gradesUrl} index={index} />);
	// The donut reads this student's attendance page; only on your own profile (it shares the home widget's cache).
	if (data.attendance?.length) add('attendance', (index) => <AttendanceCard attendance={data.attendance} href={data.attendanceUrl} showChart={Boolean(profile.editUrl && data.attendanceUrl)} index={index} />);
	if (data.subjectGroups?.length) add('subjects', (index) => <SubjectsCard groups={data.subjectGroups} className={profile.klass} index={index} />);
	const subjectNames = new Map((data.subjectGroups || []).flatMap((group) => group.subjects.map((subject) => [subject.url, subject.name])));
	if (data.timetable?.rows?.length) add('timetable', (index) => <TimetableCard timetable={data.timetable} subjectNames={subjectNames} index={index} />);
	if (data.reviews?.length) add('reviews', (index) => <EventsCard title="Ostatnie recenzje" events={data.reviews} href={data.reviewsUrl} index={index} />);
	if (data.files?.length) add('files', (index) => <FilesCard files={data.files} index={index} />);

	return (
		<div id="idu-profile" className="idu-profile">
			<h1 className="idu-profile-title">Profil ucznia</h1>
			{cards.map((card, index) => <div key={card.key} className="idu-profile-card-slot">{card.render(index)}</div>)}
		</div>
	);
}
