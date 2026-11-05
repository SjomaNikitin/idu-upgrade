function compactSearch(form) {
	const fields = [...form.querySelectorAll(".field")].map(field => ({
		field,
		input: field.querySelector("input[type=text], input[type=search]"),
		label: field.querySelector("label"),
	})).filter(({ input, label }) => input && label);
	if (!fields.length) return;

	const scope = document.createElement("select");
	scope.setAttribute("aria-label", "Szukaj według");
	for (const { label } of fields) {
		const title = label.textContent.trim();
		const name = /treści/i.test(title) ? "Treść" : /tytule/i.test(title) ? "Tytuł" : "Osoba";
		scope.add(new Option(name));
	}
	scope.selectedIndex = Math.max(0, fields.findIndex(({input}) => input.value));
	let active = fields[scope.selectedIndex];
	function update() {
		for (const item of fields) {
			item.field.hidden = item !== active;
			item.input.disabled = item !== active;
			item.input.placeholder = "Szukaj wiadomości";
		}
	}
	scope.onchange = () => {
		const value = active.input.value;
		active = fields[scope.selectedIndex];
		active.input.value = value;
		update();
	};
	const submit = form.querySelector("input[type=submit], button[type=submit]");
	if (!submit) return;
	const row = document.createElement("div");
	row.className = "mail-search-row";
	const group = document.createElement("div");
	group.className = "mail-search-group";
	group.append(scope, ...fields.map(({field}) => field));
	row.append(group, submit);
	form.prepend(row);
	form.classList.add("mail-search");
	update();
}

function foldCategories(folders) {
	const bar = document.createElement("div");
	bar.className = "mail-nav";
	const menu = document.createElement("details");
	const toggle = document.createElement("summary");
	toggle.textContent = folders.querySelector(".current")?.textContent.trim() || "Foldery";
	toggle.setAttribute("aria-label", "Foldery: " + toggle.textContent);
	folders.before(bar);
	bar.append(menu);
	menu.append(toggle, folders);
	const compose = [...folders.querySelectorAll("a")].find(a => /nowa wiadomość/i.test(a.textContent));
	if (compose) bar.append(compose);
	document.addEventListener("pointerdown", event => {
		if (!menu.contains(event.target)) menu.open = false;
	});
	menu.addEventListener("keydown", event => {
		if (event.key === "Escape") {
			menu.open = false;
			toggle.focus();
		}
	});
}

export function setupMobileMessages() {
	if (!location.pathname.startsWith("/internal_messages") && !document.querySelector("#message-folders, #message_thread_search")) return;
	document.body.classList.add("mobile-mail");
	if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
		const transition = document.createElement("style");
		transition.textContent = "@view-transition { navigation: auto; } ::view-transition-group(root) { animation-duration: 180ms; }";
		document.head.append(transition);
	}
	const folders = document.querySelector("#message-folders");
	if (folders) foldCategories(folders);
	const search = document.querySelector("#message_thread_search") || [...document.querySelectorAll("#content form")]
		.find(form => [...form.querySelectorAll("label")].some(label => /szukaj w treści/i.test(label.textContent)));
	if (search) compactSearch(search);
	const form = document.querySelector("#content form:has(textarea)");
	if (form) {
		form.classList.add("mail-compose");
		const actions = form.querySelector(".actions");
		for (const node of actions?.childNodes || []) {
			if (node.nodeType === Node.TEXT_NODE && /^\s*lub\s*$/i.test(node.textContent)) node.remove();
		}
		// CKEditor creates a separate document for typing. Style its canvas,
		// keeping presentation out of the message HTML that gets submitted.
		const themeEditor = () => {
			const doc = form.querySelector(".cke_wysiwyg_frame")?.contentDocument;
			if (!doc?.head) return;
			let style = doc.getElementById("idu-compose-theme");
			if (!style) {
				style = doc.createElement("style");
				style.id = "idu-compose-theme";
				doc.head.append(style);
			}
			const theme = getComputedStyle(form);
			style.textContent = `html, body.cke_editable { background: ${theme.getPropertyValue("--background-color")}; color: ${theme.getPropertyValue("--main-text-color")}; caret-color: currentColor; } body.cke_editable { font: 16px/1.5 system-ui; padding: 4px; }`;
		};
		form.addEventListener("load", themeEditor, true);
		window.CKEDITOR?.on("instanceReady", themeEditor);
		new MutationObserver(themeEditor).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
		themeEditor();
		const recipient = [...form.querySelectorAll("label")].find(label => /odbiorc/i.test(label.textContent));
		if (recipient) {
			recipient.closest(".field")?.classList.add("mail-recipient");
			const hint = document.createElement("small");
			hint.textContent = "Wpisz co najmniej 3 litery i wybierz odbiorcę z listy.";
			recipient.after(hint);
		}
	}
}
