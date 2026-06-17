function closeAllTabs() {
	const switches = document.querySelectorAll("a.hide-me")
	for (let i = 0; i < switches.length; i++) {
		switches[i].click();
	}
}

function addSnow(el) {
	const snow = document.createElement("img");
	snow.src = "https://sajmik.b-cdn.net/TopSnow.PNG";
	snow.className = "top-snow"
	el.prepend(snow);
	const value = Math.random() < 0.5 ? 0 : 1;
	if (value) {
		snow.style.transform = "translate(-50%, -75%) scaleX(-1)";
	}
}



function moveScheduleHigher() {
	const h3 = Array.from(document.querySelectorAll('h3'))
		.find(el => el.textContent.trim().includes("Aktualny plan"));

	if (h3) {
		const schedule = h3.parentElement; // or .closest('.your-container-class')
		const leftColumn = document.querySelector("div.left-column");
		if (!leftColumn) return;
		leftColumn.insertBefore(schedule, leftColumn.children[1] ?? null);
	}
}
function moveGradesHigher() {
	const h3 = Array.from(document.querySelectorAll('h3'))
		.find(el => el.textContent.trim().includes("Oceny"));

	if (h3) {
		const grades = h3.parentElement; // or .closest('.your-container-class')
		const leftColumn = document.querySelector("div.left-column");
		if (!leftColumn) return;
		leftColumn.insertBefore(grades, leftColumn.children[1] ?? null);
	}
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

function timeToMinutes(time) {
	const [hours, minutes] = time.split(":").map(Number);
	return hours * 60 + minutes;
}


function addNextLessonBanner() {
	const lessons = getScheduleLessons();

	const today = new Date().toLocaleDateString("pl-PL", {
		day: "2-digit",
		month: "2-digit",
	});

	const todaysLessons = Object.values(lessons[today] || {});
	const currentTime = new Date().toLocaleTimeString("pl-PL", {
		hour: "2-digit",
		minute: "2-digit",
	});

	let nextLesson = null;

	for (let i = 0; i < todaysLessons.length; i++) {
		if (timeToMinutes(todaysLessons[i].start) >= timeToMinutes(currentTime)) {
			nextLesson = todaysLessons[i];
			break;
		}
	}
	if (!nextLesson) return;

	const banner = document.createElement("div");
	banner.classList.add("next-lesson-banner");
	document.getElementById("top").appendChild(banner);
	const bannerText = document.createElement("p");
	bannerText.classList.add("banner-text");
	bannerText.innerHTML = "Next Lesson: <br>" + nextLesson.subject + " (" + nextLesson.start + " - " + nextLesson.end + ")";
	banner.appendChild(bannerText);
	console.log(nextLesson);
}


function removeUnwantedLinks(container) {
	// List of link texts to remove (case-insensitive)
	const removeTexts = ["zadania domowe", "forum", "tematy lekcji", "oceny", "obecności"];

	container.querySelectorAll("a").forEach(a => {
		const text = a.textContent.trim().toLowerCase();
		if (removeTexts.includes(text)) {
			// Remove the link, and also remove nearby ",", "-" or extra spaces
			const prev = a.previousSibling;
			const next = a.nextSibling;

			// Clean comma or hyphen before the link
			if (prev && prev.nodeType === 3) prev.textContent = prev.textContent.replace(/[,\-\s]+$/, "");

			// Remove link
			a.remove();

			// Clean hanging punctuation after the link
			if (next && next.nodeType === 3) next.textContent = next.textContent.replace(/^[,\-\s]+/, "");
		}
	});
}


function linkifyUrls(root = document.body) {
	const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
	const urlRegex = /https?:\/\/[^\s<>"']+/g;
	const nodes = [];
	while (walker.nextNode()) nodes.push(walker.currentNode);
	nodes.forEach(node => {
		if (node.parentElement.tagName === "A") return;
		const text = node.textContent;
		if (!urlRegex.test(text)) return;
		urlRegex.lastIndex = 0;
		const frag = document.createDocumentFragment();
		let last = 0, match;
		while ((match = urlRegex.exec(text)) !== null) {
			if (match.index > last) frag.appendChild(document.createTextNode(text.slice(last, match.index)));
			const a = document.createElement("a");
			a.href = match[0];
			a.textContent = match[0];
			a.target = "_blank";
			a.rel = "noopener noreferrer";
			a.style.cssText = "color:blue !important;text-decoration:underline;pointer-events:all;";
			frag.appendChild(a);
			last = match.index + match[0].length;
		}
		if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
		node.parentElement.replaceChild(frag, node);
	});
}

function makeModulesShorter(module) {
	const moduleMaxHeight = "500px";
	module.style.maxHeight = moduleMaxHeight;
	module.classList.add("shorted-container");
	const gradientShadow = document.createElement("div");
	gradientShadow.classList.add("shorted-container-gradient");
	module.lastElementChild.appendChild(gradientShadow);
	const gradientTxt = document.createElement("a")
	gradientShadow.appendChild(gradientTxt);
	gradientTxt.innerText = "Show All";
	gradientTxt.onclick = () => {
		if (gradientShadow.style.display === "none") {
			gradientShadow.style.display = "flex"
			module.style.maxHeight = moduleMaxHeight;
		} else {
			gradientShadow.style.display = "none"
			module.style.maxHeight = "none";
			const hideEl = module.querySelector(".hide-me")

			function hideHandler() {
				gradientShadow.style.display = "flex";
				module.style.maxHeight = moduleMaxHeight;
			}

			if (hideEl) {
				hideEl.removeEventListener("click", hideHandler); // ensures no duplicate
				hideEl.addEventListener("click", hideHandler);
			}
		}
	}

}
