// Custom profile photos, served from GitHub Pages (docs/img/ -> https://idu2.com/img/).
// Keyed by the name shown in the student card's <h3>.
// "tiny" is a 16x24 copy embedded right here, so it shows instantly (no download)
// as a heavy blur while the full photo loads on slow school internet.
const PROFILE_IMAGE_BASE = "https://idu2.com/img/";
const PROFILE_IMAGE_REPLACEMENTS = {
	"Szymon Nikitin": {
		file: "szymon.jpg",
		tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAAGAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgAGAAQAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMABAQEBAQEBgQEBgkGBgYJDAkJCQkMDwwMDAwMDxIPDw8PDw8SEhISEhISEhUVFRUVFRkZGRkZHBwcHBwcHBwcHP/bAEMBBAUFBwcHDAcHDB0UEBQdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHf/dAAQAAf/aAAwDAQACEQMRAD8A8x1fQbGbRBpXhu+ubeyYQ3qRMiLGbgqY23hRlsZZULHJA5FN8HaKvhjV9Ni8Q2jT6brwWWQx8PNGxKhUJI2tuYYG7heTzxXoHxJ+Hc/hCdfDia5qOqztb77Wa4GFjLbsBnjG7BIwAW6nIHWvM7fV20iLTdM8QRz3k1km9JIELtEFJK4EhVSVk7DBI/ir21UjdadD9Nw9JOisVHRP9f11P//Q7i61q7uICb2Vri7Crvlc5Jz0H/1u1YOheDvCPji8u9G8WST2iXISWGW3cJIdpIKg4bjLc8c065+/P/vR/wBateFf+Rl0/wD64t/6EK+srUYyjbY/YsRBfValNaJo/9k=",
	},
	"Jagoda Herbut-Tunik": {
		file: "jagoda.jpg",
		tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAAGAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgAGAAQAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMABAQEBAQEBgQEBgkGBgYJDAkJCQkMDwwMDAwMDxIPDw8PDw8SEhISEhISEhUVFRUVFRkZGRkZHBwcHBwcHBwcHP/bAEMBBAUFBwcHDAcHDB0UEBQdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHf/dAAQAAf/aAAwDAQACEQMRAD8A0PBfjGHWPEVvpU4LwvFcmUBy5ISM7U5UbCrfN1wRXkPjD/Qp3ntVbCyMhkb5QJF4bIJ4PHYYqt4aN7p+nadrSXz2l1rlwYLc25Ba3tYspOzkqQryMwCnGQoJ6GumWO/8QaXqcENybnUtI8yWUXABFxGrYWSNgABKg4IIG8cg54rwlSlCKSOmVGP1eLv719vKx//Q+dbjSrzRo4JnfEgLIULB4zkYY4BIHoa2/DNhqF3cXE1uzPPGi/ugSI2HIAZR1Hp2BqbxT/x7R/8AXSSul+G3/ISvv+uSf+h1wuT+pOX9bmV3y3P/2Q==",
	},
};

// Returns { full, tiny } for a student shown with a custom photo, or null.
function getProfileImageReplacement(name) {
	if (!name) return null;
	for (const [student, photo] of Object.entries(PROFILE_IMAGE_REPLACEMENTS)) {
		if (name.includes(student)) return { full: PROFILE_IMAGE_BASE + photo.file, tiny: photo.tiny };
	}
	return null;
}

// Shows the blurred inline preview straight away (the original photo is never visible),
// downloads the full photo in the background and fades it in once it's ready.
// Safe to call more than once for the same <img>.
function upgradeProfileImage(img, name) {
	const photo = getProfileImageReplacement(name);
	if (!img || !photo || img.dataset.iduPhotoUpgraded) return false;
	img.dataset.iduPhotoUpgraded = "true";

	// overflow:hidden on the frame keeps the blur from bleeding past the edges.
	img.parentElement.style.overflow = "hidden";
	img.src = photo.tiny;
	img.style.width = "100%";
	img.style.filter = "blur(8px)";
	img.style.transform = "scale(1.1)";
	img.style.transition = "filter 0.4s ease, transform 0.4s ease";

	const full = new Image();
	full.onload = () => {
		img.src = full.src;
		img.style.filter = "";
		img.style.transform = "";
	};
	full.src = photo.full;
	return true;
}
window.getProfileImageReplacement = getProfileImageReplacement;
window.upgradeProfileImage = upgradeProfileImage;

function replaceImages () {
	if (!window.location.pathname.includes("/student")) return;

	// New Preact profile page (the component upgrades it itself; this is a fallback).
	const profileImg = document.querySelector("img[data-idu-profile-photo]");
	if (profileImg) {
		upgradeProfileImage(profileImg, profileImg.dataset.studentName || "");
		return;
	}

	// Original IDU student card.
	const studentCard = document.querySelector("#student-card");
	const name = studentCard?.querySelector("h3")?.innerText;
	const img = studentCard?.querySelector("#photo img");
	if (!name || !img) return;
	upgradeProfileImage(img, name);
}
