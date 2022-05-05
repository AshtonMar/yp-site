// Preloader's JS of the site
// let typeSpeed = 100;
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

// let amountOfCharacters = 0;

// function typeWriter() {
//   let messageArea = document.querySelector(".text");
//   let preloaderMessage = "Hi, There Welcome";

//   messageArea.innerHTML += preloaderMessage.charAt(amountOfCharacters);

//   amountOfCharacters++;
//   setTimeout(typeWriter, typeSpeed);

//   window.addEventListener("load", debounce(removeLoader, 10000));
// }

let removeLoaderComplete = () => {
  let loader = document.querySelector("#preloader");
  console.log("hello");
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
// typeWriter();
