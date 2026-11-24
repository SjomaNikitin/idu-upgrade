function extractGrades(container) {
	if (!container) return [];

	const gradeElements = container.querySelectorAll('.profile-event.mark');

	return Array.from(gradeElements).map((gradeEl) => {
		const subjectLink = gradeEl.querySelector('.subject a');
		const nameLink = gradeEl.querySelector('.name a');
		const nameSpan = gradeEl.querySelector('.name');
		const descriptionSpan = gradeEl.querySelector('.description');
		const dateSpan = gradeEl.querySelector('.date');
		const seeMoreLink = container.querySelector('div.see-more a');
		return {
			subject: subjectLink?.textContent.trim() || '',
			subjectUrl: subjectLink?.getAttribute('href') || '',
			grade: nameSpan?.textContent.trim() || '',
			gradeText: nameLink?.textContent.trim() || '',
			gradeDescriptionUrl: nameLink?.getAttribute('href') || '',
			description: descriptionSpan?.textContent.trim() || '',
			date: dateSpan?.textContent.trim() || '',
			seeMoreUrl: seeMoreLink?.getAttribute('href') || '',
		};
	});
}

function extractSubjects(container) {
	if (!container) return null;

	const classLink = container.querySelector('a[href^="/klasses/"]');
	const forumLink = container.querySelector('a[href*="/forums/"]');
	const teacherLink = container.querySelector('a[href^="/teachers/"]');

	const subjectRows = Array.from(container.querySelectorAll('b'));
	const subjects = subjectRows
		.map((row) => {
			const links = row.querySelectorAll('a[href^="/subjects/"]');
			const link = links[links.length - 1];
			if (!link) return null;

			return {
				name: link.textContent.trim(),
				url: link.getAttribute('href') || '',
				title: link.getAttribute('title') || '',
				italic: link.classList.contains('font-italic'),
				level: subjectLevelFromMarkup(row, container),
			};
		})
		.filter(Boolean);

	return {
		classInfo: {
			name: classLink?.textContent.trim() || '',
			url: classLink?.getAttribute('href') || '',
			forumUrl: forumLink?.getAttribute('href') || '',
			forumName: forumLink?.textContent.trim() || '',
			teacher: teacherLink?.textContent.trim() || '',
			teacherUrl: teacherLink?.getAttribute('href') || '',
		},
		subjects,
	};
}

// Level of a subject row when the list is grouped like on the profile page:
// <li>P<ul><li><b><a href="/subjects/…">…</a></b> …</li></ul></li>. '' when it isn't.
function subjectLevelFromMarkup(row, container) {
	for (let el = row.parentElement; el && el !== container; el = el.parentElement) {
		if (el.tagName !== 'LI') continue;
		const nested = el.querySelector(':scope > ul');
		if (!nested || !nested.contains(row)) continue;
		return Array.from(el.childNodes)
			.filter((node) => node.nodeType === 3)
			.map((node) => node.textContent)
			.join(' ')
			.replace(/\s+/g, ' ')
			.trim();
	}
	return '';
}

function getScheduleLessons(schedule = document.querySelector(".schedule")) {
	const lessons = {};
	const table = schedule?.querySelector("table");
	if (!table) return lessons;

	const dateText = schedule.childNodes[0]?.textContent.trim();
	const dateMatch = dateText?.match(/(\d{4})-(\d{2})-(\d{2})/);
	if (!dateMatch) return lessons;

	const firstDate = new Date(Number(dateMatch[1]), Number(dateMatch[2]) - 1, Number(dateMatch[3]));
	const weekdayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	const dayHeaders = Array.from(table.querySelectorAll("thead tr:nth-child(2) th"))
		.slice(1)
		.map(th => th.textContent.trim());
	const dayKeys = dayHeaders.map((day, index) => {
		const date = new Date(firstDate);
		date.setDate(firstDate.getDate() + index);
		return weekdayKeys[date.getDay()];
	});

	for (let i = 0; i < dayKeys.length; i++) {
		lessons[dayKeys[i]] = {};
	}

	const rows = table.querySelectorAll("tbody tr");
	for (let i = 0; i < rows.length; i++) {
		const cells = Array.from(rows[i].children);
		const timeText = cells[0]?.textContent.trim();
		const timeMatch = timeText?.match(/\(([^)]+)\)\s*(.+)/);
		if (!timeMatch) continue;

		const lessonNumber = timeMatch[1];
		const time = timeMatch[2];
		const [start, end] = time.split("-");

		for (let j = 1; j < cells.length; j++) {
			const lessonCell = cells[j].querySelector(".lesson-cell");
			if (!lessonCell) continue;

			const dayKey = dayKeys[j - 1];
			const subjectLink = lessonCell.querySelector(".subject a");
			const locationLink = lessonCell.querySelector(".location a[href^='/rooms/']");
			const note = Array.from(lessonCell.children)
				.find(child => child.tagName === "DIV" && !child.classList.contains("lesson-cell"))?.textContent.trim() || "";

			lessons[dayKey][time] = {
				lessonNumber,
				time,
				start,
				end,
				day: dayHeaders[j - 1],
				subject: subjectLink?.textContent.trim() || "",
				subjectHref: subjectLink?.href || "",
				location: locationLink?.textContent.trim() || "",
				locationHref: locationLink?.href || "",
				note,
				absence: lessonCell.classList.contains("absence-in-plan"),
				lateness: lessonCell.classList.contains("lateness-in-plan"),
			};
		}
	}

	return lessons;
}

function extractSubjectAnnouncements(container) {
	if (!container) return [];

	const announcementElements = container.querySelectorAll('.profile-event.announcement');

	return Array.from(announcementElements).map((announcementEl) => {
		const subjectLink = announcementEl.querySelector('.subject a');
		const nameLink = announcementEl.querySelector('.name a');
		const dateSpan = announcementEl.querySelector('.date');

		return {
			subject: subjectLink?.textContent.trim() || '',
			subjectUrl: subjectLink?.getAttribute('href') || '',
			title: nameLink?.textContent.trim() || '',
			titleUrl: nameLink?.getAttribute('href') || '',
			date: dateSpan?.textContent.trim() || '',
			read: announcementEl.classList.contains('read'),
		};
	});
}

function extractNews(container) {
	if (!container) return [];

	const newsElements = container.querySelectorAll('.profile-event.news');

	return Array.from(newsElements).map((newsEl) => {
		const nameSpan = newsEl.querySelector('.name');
		const titleLink = newsEl.querySelector('.name a');
		const dateSpan = newsEl.querySelector('.date');
		const commentsSpan = Array.from(newsEl.querySelectorAll('span'))
			.find((span) => span.textContent.trim().startsWith('komentarze:'));

		return {
			title: titleLink?.textContent.trim() || '',
			titleUrl: titleLink?.getAttribute('href') || '',
			date: dateSpan?.textContent.trim() || '',
			updatedAt: nameSpan?.childNodes[0]?.textContent.replace('Aktualizacja:', '').trim() || '',
			comments: commentsSpan?.textContent.replace('komentarze:', '').trim() || '',
			sticky: newsEl.classList.contains('sticky'),
			read: newsEl.classList.contains('read'),
			priority: Array.from(newsEl.classList)
				.find((className) => className.startsWith('priority_'))
				?.replace('priority_', '') || '',
		};
	});
}

function extractAttendance(container) {
	if (!container) return [];

	const attendanceElements = container.querySelectorAll('.profile-event.absence, .profile-event.presence, .profile-event.lateness');
	const seeMoreLink = container.querySelector('.see-more a');

	return Array.from(attendanceElements).map((attendanceEl) => {
		const subjectLink = attendanceEl.querySelector('.subject a');
		const nameSpan = attendanceEl.querySelector('.name');
		const dateSpan = attendanceEl.querySelector('.date');

		return {
			subject: subjectLink?.textContent.trim() || '',
			subjectUrl: subjectLink?.getAttribute('href') || '',
			type: nameSpan?.textContent.trim() || '',
			date: dateSpan?.textContent.trim() || '',
			issuedAt: attendanceEl.getAttribute('title')?.replace('wystawiono:', '').trim() || '',
			absence: attendanceEl.classList.contains('absence'),
			presence: attendanceEl.classList.contains('presence'),
			lateness: attendanceEl.classList.contains('lateness'),
			seeMoreUrl: seeMoreLink?.getAttribute('href') || '',
			mockData: false,
		};
	});
}

function extractReviewsUrl () {
	return document.querySelector('#unique-id35 .see-more a')?.getAttribute('href') || '';
}

function extractHomeWorkUrl () {
	return document.querySelector('#unique-id191 .see-more a')?.getAttribute('href') || '';
}

function extractMessagesUrl() {
	return document.querySelector('#messages a')?.getAttribute('href') || '';
}

function extractSemesterScope(form = document.querySelector('#set_semester_scope')) {
	const select = form?.querySelector('#semester_id');
	if (!form || !select) return null;

	return {
		action: form.getAttribute('action') || '/set_semester_scope',
		hiddenFields: Array.from(form.querySelectorAll('input[type="hidden"]')).map((input) => ({
			name: input.name,
			value: input.value,
		})),
		options: Array.from(select.options).map((option) => ({
			label: option.textContent.trim(),
			value: option.value,
		})),
		selectedValue: select.value,
	};
}

// ---------------------------------------------------------------------------
// Student profile (/students/<id>, "Profil ucznia")
// #student-card holds <p>Label:</p> followed by <div class="data">value</div>
// pairs; the other modules (subjects, timetable, grades, ...) are found by
// their <h3> title because the unique-id numbers shift between pages.
// ---------------------------------------------------------------------------

function cleanText(text) {
	return (text || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
}

function normalizeProfileLabel(text) {
	return cleanText(text).replace(/\s*([/,])\s*/g, '$1').replace(/[:：]\s*$/, '').trim().toLocaleLowerCase('pl-PL');
}

// Text of a node split into lines at <br> and block elements; empty lines dropped.
function nodeLines(node) {
	if (!node) return [];
	if (node.nodeType === 3) return cleanText(node.textContent) ? [cleanText(node.textContent)] : [];
	if (node.nodeType !== 1) return [];
	const clone = node.cloneNode(true);
	clone.querySelectorAll('script, style').forEach((el) => el.remove());
	// Only <br> and block elements break lines; newlines in the HTML source are just spaces.
	const BREAK = '\u2029';
	clone.querySelectorAll('br').forEach((br) => br.replaceWith(BREAK));
	clone.querySelectorAll('div, p, li').forEach((el) => el.append(BREAK));
	return clone.textContent.split(BREAK).map(cleanText).filter(Boolean);
}

function nodeLinks(nodes) {
	const links = [];
	for (const node of nodes) {
		if (node.nodeType !== 1) continue;
		const anchors = node.matches('a[href]') ? [node] : Array.from(node.querySelectorAll('a[href]'));
		for (const a of anchors) {
			const text = cleanText(a.textContent);
			const href = a.getAttribute('href') || '';
			if (text && href && href !== '#') links.push({ text, href });
		}
	}
	return links;
}

// Known #student-card labels -> where they go and how they're shown.
// Anything not listed still shows up in "Dane ucznia" under its own label.
const STUDENT_CARD_FIELDS = {
	'rodzice/opiekunowie': { key: 'parents' },
	'dane kontaktowe': { key: 'contactAddress', section: 'addresses', label: 'Adres kontaktowy', type: 'address' },
	'adres kontaktowy': { key: 'contactAddress', section: 'addresses', label: 'Adres kontaktowy', type: 'address' },
	'adres zamieszkania': { key: 'homeAddress', section: 'addresses', label: 'Adres zamieszkania', type: 'address' },
	'adres zameldowania': { key: 'registeredAddress', section: 'addresses', label: 'Adres zameldowania', type: 'address' },
	'kontakt elektroniczny': { key: 'email', section: 'contact', label: 'Kontakt elektroniczny', type: 'email', wide: true },
	'telefon kom.': { key: 'mobile', section: 'contact', label: 'Telefon komórkowy', type: 'phone' },
	'telefon komórkowy': { key: 'mobile', section: 'contact', label: 'Telefon komórkowy', type: 'phone' },
	'telefon': { key: 'phone', section: 'contact', label: 'Telefon', type: 'phone' },
	'uczeń w internecie': { key: 'website', section: 'contact', label: 'Uczeń w Internecie', type: 'links', wide: true },
	'nr z księgi ucznia': { key: 'bookNumber', section: 'student', label: 'Nr z księgi uczniów' },
	'nr z księgi uczniów': { key: 'bookNumber', section: 'student', label: 'Nr z księgi uczniów' },
	'pesel': { key: 'pesel', section: 'student', label: 'PESEL' },
	'data urodzenia': { key: 'birthDate', section: 'student', label: 'Data urodzenia' },
	'miejscowość urodzenia': { key: 'birthPlace', section: 'student', label: 'Miejscowość urodzenia' },
	'podbudowa (g,sp)': { key: 'foundation', section: 'student', label: 'Podbudowa (G, SP)' },
	'rok przyjęcia do szkoły': { key: 'admissionYear', section: 'student', label: 'Rok przyjęcia do szkoły' },
	'data przyjścia': { key: 'admissionDate', section: 'student', label: 'Data przyjęcia' },
	'data przyjęcia': { key: 'admissionDate', section: 'student', label: 'Data przyjęcia' },
	'data odejścia': { key: 'leaveDate', section: 'student', label: 'Data odejścia' },
};

function prettyLabel(text) {
	const label = cleanText(text).replace(/[:：]\s*$/, '');
	return label.charAt(0).toLocaleUpperCase('pl-PL') + label.slice(1);
}

// Every <p> label in the card with the nodes that follow it, up to the next <p>.
function readStudentCardPairs(card) {
	const pairs = [];
	for (const p of card.querySelectorAll('p')) {
		if (p.closest('.send-message')) continue;
		const nodes = [];
		for (let node = p.nextSibling; node && !(node.nodeType === 1 && node.tagName === 'P'); node = node.nextSibling) {
			nodes.push(node);
		}
		pairs.push({ rawLabel: p.textContent, nodes });
	}
	return pairs;
}

function readStudentHeader(card) {
	const data = card.querySelector('#student-data') || card;
	const h3 = data.querySelector('h3');
	let name = '';
	let messageUrl = '';
	if (h3) {
		messageUrl = h3.querySelector('.send-message a[href]')?.getAttribute('href') || '';
		const clone = h3.cloneNode(true);
		clone.querySelectorAll('.send-message').forEach((el) => el.remove());
		name = cleanText(clone.textContent);
	}
	messageUrl = messageUrl || card.querySelector('a.send[href]')?.getAttribute('href') || '';

	const h6 = data.querySelector('h6');
	const h6Text = cleanText(h6?.textContent).replace(/\s+/g, ' ');
	const year = h6Text.match(/rocznik:\s*(.*?)\s*(?=klasa:|wychowawca:|wychowawczyni:|$)/i)?.[1] || '';
	const klassLink = h6?.querySelector('a[href*="/klasses/"], a[title="Klasa"]');
	const klass = cleanText(klassLink?.textContent) || h6Text.match(/klasa:\s*(.*?)\s*(?=wychowawca:|wychowawczyni:|rocznik:|$)/i)?.[1] || '';
	const tutorLinks = Array.from(h6?.querySelectorAll('a[href*="/teachers/"]') || []);
	const tutorText = h6Text.match(/wychowawc\w*:\s*(.*?)\s*(?=klasa:|rocznik:|$)/i)?.[1] || '';

	return {
		name,
		messageUrl,
		photoUrl: card.querySelector('#photo img')?.getAttribute('src') || '',
		editUrl: card.querySelector('a.edit[href]')?.getAttribute('href') || '',
		year,
		klass,
		klassUrl: klassLink?.getAttribute('href') || '',
		tutors: tutorLinks.length
			? tutorLinks.map((a) => ({ name: cleanText(a.textContent), href: a.getAttribute('href') || '' }))
			: (tutorText ? [{ name: tutorText, href: '' }] : []),
	};
}

function extractStudentProfile(doc = document) {
	const card = doc.querySelector('#student-card');
	if (!card) return null;

	const header = readStudentHeader(card);
	const parents = [];
	const sections = { contact: [], addresses: [], student: [] };
	const seen = new Set();

	for (const { rawLabel, nodes } of readStudentCardPairs(card)) {
		const known = STUDENT_CARD_FIELDS[normalizeProfileLabel(rawLabel)];
		const dataNodes = nodes.filter((n) => n.nodeType === 1 && n.classList.contains('data'));
		const valueNodes = dataNodes.length ? dataNodes : nodes;

		if (known?.key === 'parents') {
			for (const node of valueNodes) {
				const link = nodeLinks([node])[0];
				const shownName = link?.text || nodeLines(node).join(' ');
				const name = window.replaceParentName?.(header.name, shownName) ?? shownName;
				if (name) parents.push({ name, href: link?.href || '', role: node.classList?.contains('mother') ? 'mother' : node.classList?.contains('father') ? 'father' : '' });
			}
			continue;
		}

		// "2025\n/ 2026" -> one line; addresses keep street and postcode/city as two lines.
		const lines = known?.type === 'address'
			? valueNodes.flatMap(nodeLines)
			: [cleanText(valueNodes.flatMap(nodeLines).join(' '))].filter(Boolean);
		const links = nodeLinks(valueNodes);
		if (!lines.length && !links.length) continue;

		const key = known?.key || `extra:${normalizeProfileLabel(rawLabel)}`;
		if (seen.has(key)) continue;
		seen.add(key);

		const field = {
			key,
			label: known?.label || prettyLabel(rawLabel),
			lines: lines.length ? lines : links.map((l) => l.text),
			links,
			type: known?.type || 'text',
			wide: Boolean(known?.wide || known?.type === 'address'),
		};
		sections[known?.section || 'student'].push(field);
	}

	// Keep "Dane ucznia" in the design's order; unknown labels go after the known ones.
	const studentOrder = ['bookNumber', 'pesel', 'birthDate', 'birthPlace', 'foundation', 'admissionYear', 'admissionDate', 'leaveDate'];
	const rank = (field) => {
		const index = studentOrder.indexOf(field.key);
		return index === -1 ? studentOrder.length : index;
	};
	sections.student.sort((a, b) => rank(a) - rank(b));
	const contactOrder = ['email', 'mobile', 'phone', 'website'];
	sections.contact.sort((a, b) => contactOrder.indexOf(a.key) - contactOrder.indexOf(b.key));

	if (!header.name && !parents.length && !Object.values(sections).some((list) => list.length)) return null;
	return { ...header, parents, sections };
}

// div.module whose <h3> starts with the given title (ignores the "zwiń" toggle).
function findModuleByTitle(doc, title) {
	const wanted = title.toLocaleLowerCase('pl-PL');
	for (const module of doc.querySelectorAll('div.module')) {
		const h3 = module.querySelector('h3');
		if (!h3) continue;
		const clone = h3.cloneNode(true);
		clone.querySelectorAll('.toggle-switch').forEach((el) => el.remove());
		if (cleanText(clone.textContent).toLocaleLowerCase('pl-PL').startsWith(wanted)) return module;
	}
	return null;
}

function seeMoreUrl(module) {
	return module?.querySelector('.see-more a[href]')?.getAttribute('href') || '';
}

function extractProfileSubjects(module) {
	if (!module) return [];
	const subjectFromItem = (li) => {
		const link = li.querySelector('b a[href*="/subjects/"]') || li.querySelector('a[href*="/subjects/"]');
		if (!link) return null;
		return {
			name: cleanText(link.textContent),
			url: link.getAttribute('href') || '',
			title: link.getAttribute('title') || '',
			italic: link.classList.contains('font-italic'),
			teachers: Array.from(li.querySelectorAll('a[href*="/teachers/"]'))
				.filter((a) => !a.closest('b'))
				.map((a) => ({ name: cleanText(a.textContent), href: a.getAttribute('href') || '' })),
		};
	};

	const topList = module.querySelector('ul');
	if (!topList) return [];
	const groups = [];
	for (const levelItem of topList.children) {
		const nested = levelItem.querySelector(':scope > ul');
		if (nested) {
			const level = cleanText(Array.from(levelItem.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent).join(' '));
			const subjects = Array.from(nested.children).map(subjectFromItem).filter(Boolean);
			if (subjects.length) groups.push({ level, subjects });
		} else {
			const subject = subjectFromItem(levelItem);
			if (!subject) continue;
			if (!groups.length || groups[groups.length - 1].level) groups.push({ level: '', subjects: [] });
			groups[groups.length - 1].subjects.push(subject);
		}
	}
	return groups;
}

const PROFILE_WEEKDAYS = {
	'poniedziałek': 'monday', 'wtorek': 'tuesday', 'środa': 'wednesday', 'czwartek': 'thursday',
	'piątek': 'friday', 'sobota': 'saturday', 'niedziela': 'sunday',
};

// "Ogólny plan tygodniowy": one header row of day names, first column "(0) 7:55 - 8:40".
function extractProfileTimetable(module) {
	const table = module?.querySelector('.schedule table');
	if (!table) return null;
	const headerCells = Array.from(table.querySelectorAll('thead tr:last-child th')).slice(1);
	const days = headerCells.map((th) => {
		const label = cleanText(th.textContent);
		return { key: PROFILE_WEEKDAYS[label.toLocaleLowerCase('pl-PL')] || label, label };
	});

	const rows = [];
	for (const tr of table.querySelectorAll('tbody tr')) {
		const cells = Array.from(tr.children);
		const match = cleanText(cells[0]?.textContent).match(/\((\d+)\)\s*(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
		if (!match) continue;
		const lessons = {};
		cells.slice(1).forEach((td, index) => {
			const entries = Array.from(td.querySelectorAll('.lesson-cell')).map((cell) => {
				const subject = cell.querySelector('.subject a');
				const room = cell.querySelector('.location a[href*="/rooms/"]');
				return {
					subject: cleanText(subject?.textContent),
					subjectUrl: subject?.getAttribute('href') || '',
					teacher: cleanText(cell.querySelector('.teacher')?.textContent),
					room: cleanText(room?.textContent),
					roomUrl: room?.getAttribute('href') || '',
				};
			}).filter((lesson) => lesson.subject);
			if (entries.length && days[index]) lessons[days[index].key] = entries;
		});
		rows.push({ number: match[1], start: match[2], end: match[3], lessons });
	}

	const printLink = Array.from(module.querySelectorAll('a[href]')).find((a) => /lesson_plan|do druku/i.test(`${a.getAttribute('href')} ${a.textContent}`));
	if (!rows.some((row) => Object.keys(row.lessons).length)) return null;
	return { days, rows: rows.filter((row) => Object.keys(row.lessons).length), url: printLink?.getAttribute('href') || '' };
}

// "(kartkówka: wartość bezwzględna)" -> "kartkówka: wartość bezwzględna"; "XVI w.: XVI w." -> "XVI w."
function cleanEventDescription(text) {
	const value = cleanText(text).replace(/^\((.*)\)$/, '$1').replace(/\s+:/g, ':').trim();
	const parts = value.match(/^(.+?):\s*(.+)$/);
	return parts && cleanText(parts[1]).toLocaleLowerCase('pl-PL') === cleanText(parts[2]).toLocaleLowerCase('pl-PL') ? cleanText(parts[1]) : value;
}

function readProfileEvent(el) {
	const subject = el.querySelector('.subject a') || el.querySelector('.subject');
	return {
		subject: cleanText(subject?.textContent),
		subjectUrl: subject?.getAttribute?.('href') || '',
		name: cleanText(el.querySelector('.name')?.textContent),
		description: cleanEventDescription(el.querySelector('.description')?.textContent),
		date: cleanText(el.querySelector('.date')?.textContent),
		unseen: el.classList.contains('unseen'),
		issuedAt: cleanText(el.getAttribute('title')).replace(/^wystawiono:\s*/i, ''),
	};
}

function extractProfileGrades(module, doc) {
	if (!module) return [];
	return Array.from(module.querySelectorAll('.profile-event.mark')).map((el) => {
		const event = readProfileEvent(el);
		const detailId = el.querySelector('.name a[href^="#"]')?.getAttribute('href')?.slice(1);
		const detailEl = detailId ? doc.getElementById(detailId) : null;
		// The hidden description ends with "data dodania 09.11.2026"; keep only the text.
		const detail = detailEl
			? nodeLines(detailEl).filter((line) => !/^data (dodania|modyfikacji)\b/i.test(line)).join('\n')
			: '';
		return { ...event, grade: event.name, detail: detail && detail !== event.name ? detail : '' };
	});
}

function extractProfileAttendance(module) {
	if (!module) return [];
	return Array.from(module.querySelectorAll('.profile-event')).map((el) => {
		const status = ['absence', 'presence', 'lateness', 'excused'].find((c) => el.classList.contains(c)) || 'other';
		return { ...readProfileEvent(el), status };
	});
}

function extractProfileEvents(module, selector = '.profile-event') {
	if (!module) return [];
	return Array.from(module.querySelectorAll(selector)).map(readProfileEvent).filter((event) => event.subject || event.name);
}

function extractProfileFiles(module) {
	const foldable = module?.querySelector('.foldable') || module;
	if (!foldable) return [];
	return nodeLinks([foldable]).filter((link) => !/zwiń|zobacz wszystkie/i.test(link.text));
}

function isStudentProfilePage(pathname = window.location.pathname) {
	return /^\/students?(\/\d+)?\/?$/.test(pathname);
}

function readStudentProfilePageData(doc) {
	const profile = extractStudentProfile(doc);
	if (!profile) return null;

	const gradesModule = findModuleByTitle(doc, 'Ostatnio wystawione oceny');
	const attendanceModule = findModuleByTitle(doc, 'Ostatnio wystawione obecności');
	const reviewsModule = findModuleByTitle(doc, 'Ostatnie recenzje');
	const timetable = extractProfileTimetable(findModuleByTitle(doc, 'Ogólny plan tygodniowy'));

	const subjectGroups = extractProfileSubjects(findModuleByTitle(doc, 'Przedmioty'));
	// Own profile: remember subject levels for the home subjects widget.
	if (profile.editUrl && doc === document) saveSubjectLevels(subjectGroups);

	return {
		profile,
		exams: extractProfileEvents(findModuleByTitle(doc, 'Najbliższe zapowiedziane sprawdziany'), '.profile-event.exam, .profile-event'),
		grades: extractProfileGrades(gradesModule, doc),
		gradesUrl: seeMoreUrl(gradesModule),
		attendance: extractProfileAttendance(attendanceModule),
		attendanceUrl: seeMoreUrl(attendanceModule),
		subjectGroups,
		timetable,
		reviews: extractProfileEvents(reviewsModule),
		reviewsUrl: seeMoreUrl(reviewsModule),
		files: extractProfileFiles(findModuleByTitle(doc, 'Przypisane pliki')),
	};
}

function extractStudentProfilePageData(doc = document) {
	try {
		return readStudentProfilePageData(doc);
	} catch (error) {
		// Fall back to the original IDU page rather than breaking the rest of the bootstrap.
		console.warn('[IDU2] Could not read the student profile', error);
		return null;
	}
}

// ---------------------------------------------------------------------------
// Subject levels for the home subjects widget. The home page may not group its
// subjects by level, so the map {"/subjects/ID": "P" | "R" | "Brak poziomu"} is
// taken from the user's own profile page: saved whenever it is opened, otherwise
// fetched once in the background and kept for a week.
// ---------------------------------------------------------------------------

const SUBJECT_LEVELS_STORAGE_KEY = 'iduSubjectLevels';
const SUBJECT_LEVELS_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function subjectLevelPath(href) {
	try {
		return new URL(href, window.location.origin).pathname.replace(/\/+$/, '');
	} catch {
		return href || '';
	}
}

function saveSubjectLevels(groups) {
	const map = {};
	for (const group of groups || []) {
		for (const subject of group.subjects) {
			if (group.level && subject.url) map[subjectLevelPath(subject.url)] = group.level;
		}
	}
	if (!Object.keys(map).length) return null;
	try {
		localStorage.setItem(SUBJECT_LEVELS_STORAGE_KEY, JSON.stringify({ savedAt: Date.now(), map }));
	} catch {}
	return map;
}

async function loadSubjectLevels(ownProfileUrl) {
	try {
		const cached = JSON.parse(localStorage.getItem(SUBJECT_LEVELS_STORAGE_KEY) || 'null');
		if (cached?.map && Date.now() - cached.savedAt < SUBJECT_LEVELS_MAX_AGE_MS) return cached.map;
	} catch {}
	if (!ownProfileUrl) return null;

	const response = await fetch(ownProfileUrl, { credentials: 'same-origin' });
	if (!response.ok) return null;
	const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
	return saveSubjectLevels(extractProfileSubjects(findModuleByTitle(doc, 'Przedmioty')));
}
window.loadSubjectLevels = loadSubjectLevels;


// ===== Attendance page (/students/<id>/presences, "Frekwencja ucznia") =====
function isAttendancePage(pathname = window.location.pathname) {
	return /^\/students\/\d+\/presences\/?$/.test(pathname);
}

// "334 / 372 (89,78%)" -> { count: 334, total: 372, percent: 89.78 }
function parseAttendanceRatio(text) {
	const value = cleanText(text || '');
	const match = value.match(/(\d+)\s*\/\s*(\d+)(?:\s*\(([\d,.]+)\s*%\))?/);
	if (!match) {
		const single = value.match(/\d+/);
		return { count: single ? Number(single[0]) : 0, total: null, percent: null };
	}
	return {
		count: Number(match[1]),
		total: Number(match[2]),
		percent: match[3] ? Number(match[3].replace(',', '.')) : null,
	};
}

function attendanceMarkKind(img) {
	const src = img?.getAttribute('src') || '';
	if (src.includes('presence')) return 'presence';
	if (src.includes('absence')) return 'absence';
	if (src.includes('lateness')) return 'lateness';
	if (src.includes('excus') || src.includes('justif')) return 'excused';
	return 'other';
}

function extractAttendancePageData(doc = document) {
	const summaryModule = findModuleByTitle(doc, 'Frekwencja ucznia');
	const summaryTable = summaryModule?.querySelector('table');
	if (!summaryTable) return null;

	const rowData = (tr) => {
		const cells = tr.querySelectorAll('td');
		const link = cells[0]?.querySelector('a');
		return {
			subject: cleanText(cells[0]?.textContent || ''),
			url: link?.getAttribute('href') || '',
			presence: parseAttendanceRatio(cells[1]?.textContent),
			absence: parseAttendanceRatio(cells[2]?.textContent),
			lateness: parseAttendanceRatio(cells[3]?.textContent).count,
		};
	};
	const bodyRows = [...summaryTable.querySelectorAll('tbody tr')];
	const totalRow = bodyRows.find((tr) => !tr.classList.contains('js-presences-details'));
	const subjects = bodyRows.filter((tr) => tr.classList.contains('js-presences-details')).map(rowData);

	const weeks = [];
	for (const table of doc.querySelectorAll('table.presences_table')) {
		// The week label is the <b><u>tydzień: …</u></b> right before each table.
		let label = '';
		for (let el = table.previousElementSibling; el; el = el.previousElementSibling) {
			if (el.tagName === 'TABLE') break;
			const text = cleanText(el.textContent);
			if (/tydzie/i.test(text)) { label = text.replace(/^tydzień:\s*/i, ''); break; }
		}
		const rows = [...table.querySelectorAll('tr')];
		const days = [...(rows[0]?.querySelectorAll('th') || [])].slice(1).map((th) => ({
			name: cleanText(th.querySelector('b')?.textContent || ''),
			date: cleanText(th.textContent).replace(cleanText(th.querySelector('b')?.textContent || ''), '').trim(),
		}));
		const lessons = rows.slice(1).map((tr) => {
			const cells = [...tr.children];
			const timeText = cleanText(cells[0]?.textContent || '');
			const timeMatch = timeText.match(/\((\d+)\)\s*(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
			return {
				number: timeMatch ? timeMatch[1] : '',
				start: timeMatch ? timeMatch[2] : timeText,
				end: timeMatch ? timeMatch[3] : '',
				cells: cells.slice(1).map((td) => {
					if (!td.classList.contains('lesson')) return null;
					const [subject = '', teacher = ''] = (td.getAttribute('title') || '').split(/\r?\n/).map((part) => part.trim());
					const img = td.querySelector('img');
					return {
						subject,
						teacher,
						mark: img ? attendanceMarkKind(img) : null,
						markLabel: img?.getAttribute('title') || img?.getAttribute('alt') || '',
					};
				}),
			};
		});
		weeks.push({ label, days, lessons });
	}

	return {
		studentUrl: doc.querySelector('#breadcrumbs a[href^="/students/"]')?.getAttribute('href') || '',
		total: totalRow ? rowData(totalRow) : null,
		subjects,
		weeks,
	};
}
