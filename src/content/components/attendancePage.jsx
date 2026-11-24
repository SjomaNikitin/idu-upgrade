import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Card, MoreButton } from './studentProfile.jsx';
import { shortenLessonName } from '../lessonNames.js';

// "Frekwencja ucznia" (/students/<id>/presences), rebuilt with the same cards
// as the profile page. Data: extractAttendancePageData() in 28-extracter.js.

const SUBJECT_PREVIEW = 6;
const WEEK_PREVIEW = 2;
const MARK_LABELS = {
	presence: 'Obecność',
	absence: 'Nieobecność',
	lateness: 'Spóźnienie',
	excused: 'Usprawiedliwiona',
	other: 'Inne',
};
const DAY_SHORT = {
	niedziela: 'Nd', poniedziałek: 'Pn', wtorek: 'Wt', środa: 'Śr', czwartek: 'Cz', piątek: 'Pt', sobota: 'Sb',
};
const MONTHS_SHORT = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'];

function formatPercent(value) {
	if (value === null || value === undefined || Number.isNaN(value)) return '–';
	return `${value.toLocaleString('pl-PL', { maximumFractionDigits: 1 })}%`;
}

function parseIsoDate(text) {
	const match = (text || '').match(/(\d{4})-(\d{2})-(\d{2})/);
	return match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : null;
}

function weekRangeLabel(days, fallback) {
	const dates = days.map((day) => parseIsoDate(day.date)).filter(Boolean);
	if (!dates.length) return fallback;
	const first = dates[0];
	const last = dates[dates.length - 1];
	const month = (date) => MONTHS_SHORT[date.getMonth()];
	return first.getMonth() === last.getMonth()
		? `${first.getDate()}–${last.getDate()} ${month(last)}`
		: `${first.getDate()} ${month(first)} – ${last.getDate()} ${month(last)}`;
}

function pluralPl(count, one, few, many) {
	if (count === 1) return one;
	const lastTwo = count % 100;
	const last = count % 10;
	return last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14) ? few : many;
}

function AttendanceBar({ presence, absence }) {
	const total = presence + absence;
	const presentShare = total ? (presence / total) * 100 : 0;
	return (
		<div className="idu-attendance-bar" role="img" aria-label={`Obecność ${formatPercent(presentShare)}`}>
			<span className="idu-attendance-bar-fill" style={{ width: `${presentShare}%` }}></span>
		</div>
	);
}

function SummaryCard({ total, index }) {
	const { presence, absence, lateness } = total;
	return (
		<Card index={index} title="Frekwencja" subtitle={presence.total ? `${presence.total} ${pluralPl(presence.total, 'lekcja', 'lekcje', 'lekcji')} w semestrze` : null}>
			<div className="idu-attendance-hero">
				<span className="idu-attendance-hero-value">{formatPercent(presence.percent)}</span>
				<span className="idu-attendance-hero-label">obecności</span>
			</div>
			<AttendanceBar presence={presence.count} absence={absence.count} />
			<div className="idu-attendance-stats">
				<div className="idu-attendance-stat">
					<span className="attendance-dot presence" aria-hidden="true"></span>
					<span className="idu-attendance-stat-value">{presence.count}</span>
					<span className="idu-attendance-stat-label">Obecności</span>
				</div>
				<div className="idu-attendance-stat">
					<span className="attendance-dot absence" aria-hidden="true"></span>
					<span className="idu-attendance-stat-value">{absence.count}</span>
					<span className="idu-attendance-stat-label">Nieobecności</span>
				</div>
				<div className="idu-attendance-stat">
					<span className="attendance-dot lateness" aria-hidden="true"></span>
					<span className="idu-attendance-stat-value">{lateness}</span>
					<span className="idu-attendance-stat-label">Spóźnienia</span>
				</div>
			</div>
		</Card>
	);
}

function SubjectsCard({ subjects, index }) {
	const [expanded, setExpanded] = useState(false);
	const canExpand = subjects.length > SUBJECT_PREVIEW;
	const visible = expanded || !canExpand ? subjects : subjects.slice(0, SUBJECT_PREVIEW);
	return (
		<Card index={index} title="Przedmioty" subtitle="Frekwencja na każdym przedmiocie">
			<ul className="idu-attendance-subjects">
				{visible.map((subject) => {
					const name = subject.url
						? <a className="idu-attendance-subject-name" href={subject.url}>{subject.subject}</a>
						: <span className="idu-attendance-subject-name">{subject.subject}</span>;
					const extras = [];
					if (subject.absence.count) extras.push(`${subject.absence.count} ${pluralPl(subject.absence.count, 'nieobecność', 'nieobecności', 'nieobecności')}`);
					if (subject.lateness) extras.push(`${subject.lateness} ${pluralPl(subject.lateness, 'spóźnienie', 'spóźnienia', 'spóźnień')}`);
					return (
						<li key={subject.url || subject.subject} className="idu-attendance-subject">
							<div className="idu-attendance-subject-head">
								{name}
								<span className="idu-attendance-subject-percent">{formatPercent(subject.presence.percent)}</span>
							</div>
							<AttendanceBar presence={subject.presence.count} absence={subject.absence.count} />
							<p className="idu-attendance-subject-meta">
								{subject.presence.count}/{subject.presence.total ?? subject.presence.count} {pluralPl(subject.presence.total ?? 0, 'lekcja', 'lekcje', 'lekcji')}
								{extras.length ? ` · ${extras.join(' · ')}` : ''}
							</p>
						</li>
					);
				})}
			</ul>
			{canExpand && (
				<div className="idu-profile-card-foot">
					<MoreButton expanded={expanded} total={subjects.length} onClick={() => setExpanded(!expanded)} />
				</div>
			)}
		</Card>
	);
}

function WeekCard({ week, index }) {
	const [selected, setSelected] = useState(null);
	// Only days and lesson hours that actually have lessons this week.
	const dayIndexes = week.days.map((_, i) => i).filter((i) => week.lessons.some((row) => row.cells[i]));
	const rows = week.lessons.filter((row) => dayIndexes.some((i) => row.cells[i]));
	const counts = {};
	for (const row of rows) for (const i of dayIndexes) {
		const mark = row.cells[i]?.mark;
		if (mark) counts[mark] = (counts[mark] || 0) + 1;
	}
	const summary = ['presence', 'absence', 'lateness', 'excused', 'other']
		.filter((key) => counts[key])
		.map((key) => `${MARK_LABELS[key]}: ${counts[key]}`)
		.join(' · ');
	const selectedCell = selected && rows[selected.row]?.cells[selected.day];
	const selectedDay = selected && week.days[selected.day];

	return (
		<Card index={index} title={`Tydzień ${weekRangeLabel(week.days, week.label)}`} subtitle={summary || 'Brak wpisów'} className="idu-attendance-week">
			<div className="idu-attendance-week-grid" style={{ '--days': dayIndexes.length }}>
				<span className="idu-attendance-week-corner" aria-hidden="true"></span>
				{dayIndexes.map((i) => {
					const day = week.days[i];
					const date = parseIsoDate(day.date);
					return (
						<span key={`d${i}`} className="idu-attendance-week-day">
							<b>{DAY_SHORT[day.name.toLocaleLowerCase('pl-PL')] || day.name.slice(0, 2)}</b>
							{date ? date.getDate() : ''}
						</span>
					);
				})}
				{rows.map((row, r) => [
					<span key={`h${r}`} className="idu-attendance-week-hour">
						<b>{row.number}</b>
						{row.start}
					</span>,
					...dayIndexes.map((i) => {
						const cell = row.cells[i];
						if (!cell) return <span key={`c${r}-${i}`} className="idu-attendance-week-cell empty" aria-hidden="true"></span>;
						const isSelected = selected?.row === r && selected?.day === i;
						const label = cell.mark ? cell.markLabel || MARK_LABELS[cell.mark] : 'Brak wpisu';
						return (
							<button
								key={`c${r}-${i}`}
								type="button"
								className={`idu-attendance-week-cell ${cell.mark || 'none'}${isSelected ? ' selected' : ''}`}
								aria-label={`${cell.subject}, ${label}`}
								aria-pressed={isSelected}
								onClick={() => setSelected(isSelected ? null : { row: r, day: i })}
							>
								<span className={`attendance-dot ${cell.mark || 'none'}`} aria-hidden="true"></span>
								<span className="idu-attendance-week-subject">{shortenLessonName(cell.subject)}</span>
							</button>
						);
					}),
				])}
			</div>
			{selectedCell && (
				<p className="idu-attendance-week-detail">
					<span className={`attendance-dot ${selectedCell.mark || 'none'}`} aria-hidden="true"></span>
					<span>
						<b>{selectedCell.subject}</b>
						{` · ${selectedDay?.name || ''} ${rows[selected.row].start}`}
						{selectedCell.teacher ? ` · ${selectedCell.teacher}` : ''}
						{` · ${selectedCell.mark ? selectedCell.markLabel || MARK_LABELS[selectedCell.mark] : 'Brak wpisu'}`}
					</span>
				</p>
			)}
		</Card>
	);
}

export function AttendancePage({ data }) {
	const [showAllWeeks, setShowAllWeeks] = useState(false);
	// Weeks with nothing recorded yet (e.g. next week) are left out.
	const weeks = data.weeks.filter((week) => week.lessons.some((row) => row.cells.some((cell) => cell?.mark)));
	const visibleWeeks = showAllWeeks ? weeks : weeks.slice(0, WEEK_PREVIEW);
	let index = 0;

	return (
		<div id="idu-attendance" className="idu-profile idu-attendance">
			<h1 className="idu-profile-title">Obecności</h1>
			<div className="idu-profile-card-slot"><SummaryCard total={data.total} index={index++} /></div>
			{data.subjects.length > 0 && <div className="idu-profile-card-slot"><SubjectsCard subjects={data.subjects} index={index++} /></div>}
			{visibleWeeks.map((week) => (
				<div key={week.label} className="idu-profile-card-slot"><WeekCard week={week} index={index++} /></div>
			))}
			{weeks.length > WEEK_PREVIEW && (
				<button type="button" className="idu-attendance-more-weeks" onClick={() => setShowAllWeeks(!showAllWeeks)} aria-expanded={showAllWeeks}>
					{showAllWeeks ? 'Pokaż mniej ↑' : `Pokaż starsze tygodnie (${weeks.length - WEEK_PREVIEW}) ↓`}
				</button>
			)}
		</div>
	);
}
