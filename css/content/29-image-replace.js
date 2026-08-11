function replaceImages () {
	if (window.location.pathname.includes("/student")) {
		const studentCard = document.querySelector("#student-card");
		if (studentCard.querySelector("h3").innerText.includes("Szymon Nikitin")) {
			studentCard.querySelector("#photo").querySelector("img").src = "https://i.ibb.co/Jwq5y8Sz/IMG-2976.jpg"
			studentCard.querySelector("#photo").querySelector("img").style.width = "100%"
		}
		if (studentCard.querySelector("h3").innerText.includes("Jagoda Herbut-Tunik")) {
			studentCard.querySelector("#photo").querySelector("img").src = "https://i.ibb.co/hR3Prk1Z/IMG-1849-1.png"
			studentCard.querySelector("#photo").querySelector("img").style.width = "100%"
		}
	}

}
