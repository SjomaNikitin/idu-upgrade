const autoLoginAttemptStorageKey = "iduAutoLoginAttemptInProgress";

function saveAutoLoginPreference(loginInput, passwordInput) {
	const loginForm = loginInput.form || document.getElementById("new_user");
	if (!loginForm) return;

	loginForm.addEventListener("submit", function () {
		const rememberMe = document.getElementById("user_remember_me")?.checked === true;
		if (rememberMe) {
			localStorage.setItem("autoLogin", "yes");
			localStorage.setItem("login", loginInput.value);
			localStorage.setItem("password", passwordInput.value);
		} else {
			localStorage.setItem("autoLogin", "no");
		}
	});
}

function autoLogin() {
	const loginInput = document.getElementById("user_login");
	const passwordInput = document.getElementById("user_password");

	// Reaching a non-login page means the pending automatic attempt succeeded.
	if (!loginInput || !passwordInput) {
		sessionStorage.removeItem(autoLoginAttemptStorageKey);
		return;
	}

	const login = localStorage.getItem("login");
	const password = localStorage.getItem("password");
	const autoLoginEnabled = localStorage.getItem("autoLogin") === "yes";
	const previousAttemptReturnedToLogin =
		sessionStorage.getItem(autoLoginAttemptStorageKey) === "yes";

	if (previousAttemptReturnedToLogin) {
		// The server returned another login form, so the saved credentials failed.
		// Disable automatic login before bootstrap decides whether to hide the loader.
		sessionStorage.removeItem(autoLoginAttemptStorageKey);
		localStorage.setItem("autoLogin", "no");
		loginInput.value = login || "";
		passwordInput.value = "";
		const rememberMe = document.getElementById("user_remember_me");
		if (rememberMe) rememberMe.checked = false;
		saveAutoLoginPreference(loginInput, passwordInput);
		window.hideVisualLoader?.();
		return;
	}

	if (autoLoginEnabled && login && password) {
		const submitButton = document.querySelector("input[value='Zaloguj']");
		if (submitButton) {
			loginInput.value = login;
			passwordInput.value = password;
			sessionStorage.setItem(autoLoginAttemptStorageKey, "yes");
			submitButton.click();
			return;
		}
	}

	saveAutoLoginPreference(loginInput, passwordInput);
	window.hideVisualLoader?.();
}

document.addEventListener("DOMContentLoaded", function () {
	autoLogin();
});
