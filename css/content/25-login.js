const appleReviewLogin = "AppleLogin";
const appleReviewPassword = "123";

// Auto-login was removed. Earlier versions saved the IDU login and password in
// plain text under these keys, so wipe them from every device that still has them.
const legacyAutoLoginLocalKeys = ["autoLogin", "login", "password"];
const legacyAutoLoginSessionKeys = ["iduAutoLoginAttemptInProgress"];

function clearLegacyAutoLoginData() {
	for (const key of legacyAutoLoginLocalKeys) {
		try {
			localStorage.removeItem(key);
		} catch {}
	}
	for (const key of legacyAutoLoginSessionKeys) {
		try {
			sessionStorage.removeItem(key);
		} catch {}
	}
}

clearLegacyAutoLoginData();

function setupAppleReviewLogin(loginInput, passwordInput) {
	const loginForm = loginInput.form || document.getElementById("new_user");
	if (!loginForm) return;

	loginForm.addEventListener("submit", function (event) {
		if (
			loginInput.value !== appleReviewLogin ||
			passwordInput.value !== appleReviewPassword
		) {
			return;
		}

		event.preventDefault();
		event.stopImmediatePropagation();
		window.renderIduMockDashboard?.();
	}, true);
}

function setupLoginRequestCompatibility(loginForm) {
	// IDU's login form sometimes acquires an app-layer marker named
	// `nakladka` (for example `mostek-ios`). The server uses that otherwise
	// unrelated presentation value to reject the whole authentication request.
	// Keep credentials and Turnstile fields untouched; omit only this marker.
	loginForm.addEventListener("formdata", function (event) {
		event.formData.delete("nakladka");
	});

	loginForm.addEventListener("submit", function () {
		for (const marker of loginForm.querySelectorAll('[name="nakladka"]')) {
			marker.disabled = true;
		}
	}, true);
}

function setupLoginPage() {
	const loginInput = document.getElementById("user_login");
	const passwordInput = document.getElementById("user_password");
	if (!loginInput || !passwordInput) return;

	const loginForm = loginInput.form || document.getElementById("new_user");
	if (loginForm) setupLoginRequestCompatibility(loginForm);
	setupAppleReviewLogin(loginInput, passwordInput);
	window.hideVisualLoader?.();
}

document.addEventListener("DOMContentLoaded", function () {
	setupLoginPage();
});
