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

function setupLoginPage() {
	const loginInput = document.getElementById("user_login");
	const passwordInput = document.getElementById("user_password");
	if (!loginInput || !passwordInput) return;

	setupAppleReviewLogin(loginInput, passwordInput);
	window.hideVisualLoader?.();
}

document.addEventListener("DOMContentLoaded", function () {
	setupLoginPage();
});
