// Subject levels ("P" podstawowy, "R" rozszerzony, "Brak poziomu"), shared by the
// home subjects widget and the student profile's Przedmioty card.

export const LEVEL_LABELS = { P: 'Poziom podstawowy', R: 'Poziom rozszerzony' };

const LEVEL_ORDER = ['P', 'R'];

export function levelLabel(level) {
	return LEVEL_LABELS[level] || level || 'Pozostałe';
}

// "/subjects/63985" for both relative and absolute links, so URLs from different pages match.
export function subjectPath(href) {
	if (!href) return '';
	try {
		return new URL(href, window.location.origin).pathname.replace(/\/+$/, '');
	} catch {
		return href;
	}
}

// [{ level, subjects }] in P, R, then other levels in page order, then subjects without a level.
// Returns one group with level '' when nothing has a level (the caller shows a flat list).
export function groupSubjectsByLevel(subjects) {
	if (!subjects.some((subject) => subject.level)) return [{ level: '', subjects }];
	const groups = new Map();
	for (const subject of subjects) {
		const level = subject.level || '';
		if (!groups.has(level)) groups.set(level, []);
		groups.get(level).push(subject);
	}
	const rank = (level) => {
		if (!level) return Number.MAX_SAFE_INTEGER;
		const index = LEVEL_ORDER.indexOf(level);
		return index === -1 ? LEVEL_ORDER.length : index;
	};
	return Array.from(groups, ([level, items]) => ({ level, subjects: items }))
		.sort((a, b) => rank(a.level) - rank(b.level));
}
