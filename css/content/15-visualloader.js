function addLoader(){
	const loader = document.createElement("div");
	loader.id = "loader";
	loader.classList.add("loader");
	document.body.appendChild(loader);
	console.log("Loading...");
}

addLoader()
document.addEventListener("DOMContentLoaded", function() {
	if (localStorage.getItem("autoLogin") === "yes" && window.location.pathname === "/users/sign_in") {

	} else {
		document.getElementById("loader").remove();
		console.log("Loaded");
	}
})
