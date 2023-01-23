// Preloader's JS of the site
let loader = document.getElementById("preloader");
let timeout = 0;
function debounce(func, delay) {
	return function () {
		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(() => {
			func();
		}, delay);
	};
}

let removeLoaderComplete = () => {
	loader.style.display = "none";
};

function removeLoader() {
	loader.style.filter = "opacity(0.5)";
	loader.style.filter = "opacity(0)";
	loader.style.height = "100vh";
	if (loader.style.filter == "opacity(0)") {
		loader.style.height = "20vh";
		removeLoaderComplete = debounce(removeLoaderComplete, 500);
		removeLoaderComplete();
	}
}

window.addEventListener("load", debounce(removeLoader, 1000));

// function addFooter() {
// 	let footer = `<footer id="footer">YoungPeople Website Created by Ashston Martin</footer>`;

// 	document.getElementById("body").innerHTML += footer;
// }

// addFooter();
