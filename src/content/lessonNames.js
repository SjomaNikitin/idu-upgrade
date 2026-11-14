// Short subject labels shared by the home page schedule widget and the student profile timetable.
const LESSON_ABBREVIATIONS = [
	{ abbreviation: 'ang', aliases: ['język angielski', 'angielski', 'english'] },
	{ abbreviation: 'pol', aliases: ['język polski', 'polski'] },
	{ abbreviation: 'nie', aliases: ['język niemiecki', 'niemiecki'] },
	{ abbreviation: 'hsz', aliases: ['język hiszpański', 'hiszpański'] },
	{ abbreviation: 'fra', aliases: ['język francuski', 'francuski'] },
	{ abbreviation: 'wło', aliases: ['język włoski', 'włoski'] },
	{ abbreviation: 'ros', aliases: ['język rosyjski', 'rosyjski'] },
	{ abbreviation: 'ukr', aliases: ['język ukraiński', 'ukraiński'] },
	{ abbreviation: 'łac', aliases: ['język łaciński', 'łaciński', 'łacina'] },
	{ abbreviation: 'mat', aliases: ['matematyka'] },
	{ abbreviation: 'inf', aliases: ['informatyka', 'technologia informacyjna', 'technologie informacyjne'] },
	{ abbreviation: 'bio', aliases: ['biologia'] },
	{ abbreviation: 'geo', aliases: ['geografia'] },
	{ abbreviation: 'che', aliases: ['chemia'] },
	{ abbreviation: 'fiz', aliases: ['fizyka'] },
	{ abbreviation: 'his', aliases: ['historia'] },
	{ abbreviation: 'wos', aliases: ['wiedza o społeczeństwie'] },
	{ abbreviation: 'biz', aliases: ['biznes i zarządzanie', 'biznes'] },
	{ abbreviation: 'prz', aliases: ['podstawy przedsiębiorczości', 'przedsiębiorczość', 'przyroda'] },
	{ abbreviation: 'wf', aliases: ['wychowanie fizyczne', 'w-f', 'wf'] },
	{ abbreviation: 'edb', aliases: ['edukacja dla bezpieczeństwa'] },
	{ abbreviation: 'rel', aliases: ['religia'] },
	{ abbreviation: 'ety', aliases: ['etyka'] },
	{ abbreviation: 'fil', aliases: ['filozofia'] },
	{ abbreviation: 'psy', aliases: ['psychologia'] },
	{ abbreviation: 'soc', aliases: ['socjologia'] },
	{ abbreviation: 'muz', aliases: ['muzyka'] },
	{ abbreviation: 'pla', aliases: ['plastyka'] },
	{ abbreviation: 'tec', aliases: ['technika'] },
	{ abbreviation: 'kul', aliases: ['wiedza o kulturze', 'kultura'] },
	{ abbreviation: 'wyc', aliases: ['godzina wychowawcza', 'zajęcia z wychowawcą', 'wychowawcza'] },
	{ abbreviation: 'edu', aliases: ['edukacja wczesnoszkolna'] },
	{ abbreviation: 'eko', aliases: ['ekonomia'] },
	{ abbreviation: 'pra', aliases: ['prawo'] },
	{ abbreviation: 'sta', aliases: ['statystyka'] },
	{ abbreviation: 'ast', aliases: ['astronomia'] },
	{ abbreviation: 'med', aliases: ['edukacja zdrowotna', 'medycyna'] },
	{ abbreviation: 'pie', aliases: ['pierwsza pomoc'] },
	{ abbreviation: 'dor', aliases: ['doradztwo zawodowe'] },
	{ abbreviation: 'log', aliases: ['logopedia'] },
	{ abbreviation: 'rew', aliases: ['zajęcia rewalidacyjne', 'rewalidacja'] },
	{ abbreviation: 'ter', aliases: ['terapia pedagogiczna'] },
	{ abbreviation: 'bib', aliases: ['zajęcia biblioteczne'] },
	{ abbreviation: 'zaw', aliases: ['przedmiot zawodowy', 'zajęcia zawodowe'] },
];

export function normalizeLessonName(name) {
	return name
		.toLocaleLowerCase('pl-PL')
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/ł/g, 'l')
		.replace(/[._/\\-]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

export function shortenLessonName(name) {
	const trimmedName = name.trim();
	if (!trimmedName) return '';

	const normalizedName = normalizeLessonName(trimmedName);
	const matchedSubject = LESSON_ABBREVIATIONS.find(({ aliases }) =>
		aliases.some((alias) => normalizedName.includes(normalizeLessonName(alias)))
	);

	if (matchedSubject) return matchedSubject.abbreviation;

	const languageName = normalizedName.match(/(?:^|\s)jezyk\s+([a-z]+)/)?.[1];
	if (languageName) return languageName.slice(0, 3);

	return Array.from(trimmedName.toLocaleLowerCase('pl-PL')).slice(0, 3).join('');
}
