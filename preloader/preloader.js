// Preloader's JS of the site
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
  let loader = document.querySelector("#preloader");
  loader.style.display = "none";
};

function removeLoader() {
  let loader = document.querySelector("#preloader");
  loader.style.filter = "opacity(0.5)";
  loader.style.filter = "opacity(0)";
  loader.style.height = "100vh";
  if (loader.style.filter == "opacity(0)") {
    loader.style.height = "20vh";
    removeLoaderComplete = debounce(removeLoaderComplete, 500);
    removeLoaderComplete();
  }
}

window.addEventListener("load", debounce(removeLoader, 5000));

function addFooter() {
  let footer = `<footer id="footer">YoungPeople Website Created by Ashston Martin</footer>`;

  document.body.innerHTML += footer;
}

addFooter();
