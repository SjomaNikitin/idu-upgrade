import { beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const loginScript = readFileSync(new URL("./25-login.js", import.meta.url), "utf8");
const attemptKey = "iduAutoLoginAttemptInProgress";

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
	const submitButton = { click: vi.fn() };
	const rememberMe = { checked: false };
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
		user_remember_me: hasLoginForm ? rememberMe : null,
		new_user: hasLoginForm ? loginForm : null,
	};
	const localStorage = createStorage(local);
	const sessionStorage = createStorage(session);
	const hideVisualLoader = vi.fn();
	const document = {
		addEventListener: (event, handler) => {
			if (event === "DOMContentLoaded") domContentLoaded = handler;
		},
		getElementById: (id) => elements[id] || null,
		querySelector: () => (hasLoginForm ? submitButton : null),
	};

	vm.runInNewContext(loginScript, {
		document,
		localStorage,
		sessionStorage,
		window: { hideVisualLoader },
	});
	domContentLoaded();

	return {
		localStorage,
		sessionStorage,
		loginInput,
		passwordInput,
		rememberMe,
		submitButton,
		hideVisualLoader,
		submit: () => submitHandler?.(),
	};
}

describe("auto login", () => {
	beforeEach(() => vi.restoreAllMocks());

	it("submits saved credentials only once", () => {
		const page = loadLoginPage({
			local: { autoLogin: "yes", login: "student", password: "wrong" },
		});

		expect(page.loginInput.value).toBe("student");
		expect(page.passwordInput.value).toBe("wrong");
		expect(page.sessionStorage.getItem(attemptKey)).toBe("yes");
		expect(page.submitButton.click).toHaveBeenCalledOnce();
		expect(page.hideVisualLoader).not.toHaveBeenCalled();
	});

	it("stops retrying and reveals the form when an attempt returns to login", () => {
		const page = loadLoginPage({
			local: { autoLogin: "yes", login: "student", password: "wrong" },
			session: { [attemptKey]: "yes" },
		});

		expect(page.localStorage.getItem("autoLogin")).toBe("no");
		expect(page.sessionStorage.getItem(attemptKey)).toBeNull();
		expect(page.loginInput.value).toBe("student");
		expect(page.passwordInput.value).toBe("");
		expect(page.submitButton.click).not.toHaveBeenCalled();
		expect(page.hideVisualLoader).toHaveBeenCalledOnce();
	});

	it("clears the pending marker after a successful navigation", () => {
		const page = loadLoginPage({
			hasLoginForm: false,
			session: { [attemptKey]: "yes" },
		});

		expect(page.sessionStorage.getItem(attemptKey)).toBeNull();
	});

	it("can save corrected credentials after a failed automatic attempt", () => {
		const page = loadLoginPage({
			local: { autoLogin: "yes", login: "student", password: "wrong" },
			session: { [attemptKey]: "yes" },
		});
		page.loginInput.value = "correct-student";
		page.passwordInput.value = "correct-password";
		page.rememberMe.checked = true;
		page.submit();

		expect(page.localStorage.getItem("autoLogin")).toBe("yes");
		expect(page.localStorage.getItem("login")).toBe("correct-student");
		expect(page.localStorage.getItem("password")).toBe("correct-password");
	});
});
