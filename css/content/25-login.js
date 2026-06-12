function autoLogin() {
	let login_input = document.getElementById("user_login");
	let password_input = document.getElementById("user_password");
	if (!login_input || !password_input) return;
	let autoLoginInfo = localStorage.getItem("autoLogin");
	let login = localStorage.getItem("login");
	let password = localStorage.getItem("password");
	if (autoLoginInfo === "yes" && login && password) {
			login_input.value = login;
			password_input.value = password;
			document.querySelector("input[value = 'Zaloguj']").click();
	} else {
		document.querySelector("input[value = 'Zaloguj']").addEventListener("click", function() {
			let rememberMe = document.getElementById("user_remember_me").checked;
			if (rememberMe){
				localStorage.setItem("autoLogin", "yes");
				let login = document.getElementById("user_login").value;
				let password = document.getElementById("user_password").value;
				localStorage.setItem("login", login);
				localStorage.setItem("password", password);
				console.log("Auto login: " + login + " " + password);
			} else {
				localStorage.setItem("autoLogin", "no");
			}
		});
	}
}

document.addEventListener("DOMContentLoaded", function() {
	autoLogin()
})
