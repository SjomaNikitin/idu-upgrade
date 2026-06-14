function addLoader(){
	const loader = document.createElement("div");
	loader.id = "loader";
	loader.classList.add("loader");
	document.body.appendChild(loader);
	console.log("Loading...");
}

addLoader()
