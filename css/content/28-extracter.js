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

function getScheduleLessons(schedule = document.querySelector(".schedule")) {
	const lessons = {};
	const table = schedule?.querySelector("table");
	if (!table) return lessons;

	const dateText = schedule.childNodes[0]?.textContent.trim();
	const dateMatch = dateText?.match(/(\d{4})-(\d{2})-(\d{2})/);
	if (!dateMatch) return lessons;

	const firstDate = new Date(Number(dateMatch[1]), Number(dateMatch[2]) - 1, Number(dateMatch[3]));
	const dayHeaders = Array.from(table.querySelectorAll("thead tr:nth-child(2) th"))
		.slice(1)
		.map(th => th.textContent.trim());
	const dates = dayHeaders.map((day, index) => {
		const date = new Date(firstDate);
		date.setDate(firstDate.getDate() + index);
		return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}`;
	});

	for (let i = 0; i < dates.length; i++) {
		lessons[dates[i]] = {};
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

			const date = dates[j - 1];
			const subjectLink = lessonCell.querySelector(".subject a");
			const locationLink = lessonCell.querySelector(".location a[href^='/rooms/']");
			const note = Array.from(lessonCell.children)
				.find(child => child.tagName === "DIV" && !child.classList.contains("lesson-cell"))?.textContent.trim() || "";

			lessons[date][time] = {
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
		};
	});
}

function extractReviewsUrl () {
	return document.querySelector('#unique-id35 .see-more a')?.getAttribute('href') || '';
}

function extractHomeWorkUrl () {
	return document.querySelector('#unique-id191 .see-more a')?.getAttribute('href') || '';
}
