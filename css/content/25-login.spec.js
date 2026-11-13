import { beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const loginScript = readFileSync(new URL("./25-login.js", import.meta.url), "utf8");
const legacyAttemptKey = "iduAutoLoginAttemptInProgress";

function createStorage(initialValues = {}) {
	const values = new Map(Object.entries(initialValues));
	return {
		getItem: (key) => values.get(key) ?? null,
		setItem: (key, value) => values.set(key, String(value)),
		removeItem: (key) => values.delete(key),
	};
}

function loadLoginPage({ local = {}, session = {}, hasLoginForm = true } = {}) {
	let domContentLoaded;
	let submitHandler;
	const loginForm = {
		addEventListener: (event, handler) => {
			if (event === "submit") submitHandler = handler;
		},
	};
	const loginInput = hasLoginForm ? { value: "", form: loginForm } : null;
	const passwordInput = hasLoginForm ? { value: "", form: loginForm } : null;
	const elements = {
		user_login: loginInput,
		user_password: passwordInput,
		new_user: hasLoginForm ? loginForm : null,
	};
	const localStorage = createStorage(local);
	const sessionStorage = createStorage(session);
	const hideVisualLoader = vi.fn();
	const renderIduMockDashboard = vi.fn();
	const document = {
		addEventListener: (event, handler) => {
			if (event === "DOMContentLoaded") domContentLoaded = handler;
		},
		getElementById: (id) => elements[id] || null,
	};

	vm.runInNewContext(loginScript, {
		document,
		localStorage,
		sessionStorage,
		window: { hideVisualLoader, renderIduMockDashboard },
	});
	domContentLoaded();

	return {
		localStorage,
		sessionStorage,
		loginInput,
		passwordInput,
		hideVisualLoader,
		renderIduMockDashboard,
		submit: () => {
			const event = { preventDefault: vi.fn(), stopImmediatePropagation: vi.fn() };
			submitHandler?.(event);
			return event;
		},
	};
}

describe("login page", () => {
	beforeEach(() => vi.restoreAllMocks());

	it("wipes credentials saved by the removed auto-login feature", () => {
		const page = loadLoginPage({
			local: { autoLogin: "yes", login: "student", password: "secret", theme: "Ocean" },
			session: { [legacyAttemptKey]: "yes" },
		});

		expect(page.localStorage.getItem("autoLogin")).toBeNull();
		expect(page.localStorage.getItem("login")).toBeNull();
		expect(page.localStorage.getItem("password")).toBeNull();
		expect(page.sessionStorage.getItem(legacyAttemptKey)).toBeNull();
		expect(page.localStorage.getItem("theme")).toBe("Ocean");
	});

	it("wipes legacy credentials on pages without a login form too", () => {
		const page = loadLoginPage({
			hasLoginForm: false,
			local: { autoLogin: "yes", login: "student", password: "secret" },
		});

		expect(page.localStorage.getItem("password")).toBeNull();
		expect(page.hideVisualLoader).not.toHaveBeenCalled();
	});

	it("never fills the form or saves credentials", () => {
		const page = loadLoginPage();

		expect(page.loginInput.value).toBe("");
		expect(page.passwordInput.value).toBe("");
		expect(page.hideVisualLoader).toHaveBeenCalledOnce();

		page.loginInput.value = "student";
		page.passwordInput.value = "secret";
		const event = page.submit();

		expect(event.preventDefault).not.toHaveBeenCalled();
		expect(page.localStorage.getItem("login")).toBeNull();
		expect(page.localStorage.getItem("password")).toBeNull();
	});

	it("still opens the demo dashboard for the App Store review login", () => {
		const page = loadLoginPage();
		page.loginInput.value = "AppleLogin";
		page.passwordInput.value = "123";
		const event = page.submit();

		expect(event.preventDefault).toHaveBeenCalledOnce();
		expect(page.renderIduMockDashboard).toHaveBeenCalledOnce();
	});
});
