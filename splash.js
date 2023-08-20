const body = document.querySelector("body");
const splash = document.createElement("div");
splash.classList.add("splash");
const content = document.createElement("div");
content.classList.add("splash-content");
const splashImage = document.createElement("img");
splashImage.setAttribute("src", "./assets/logo.png");
splashImage.setAttribute("alt", "logo");
const splashHeading = document.createElement("h1");
splashHeading.innerText = "Welcome to The Bug Slayers realm.";
content.appendChild(splashImage);
content.appendChild(splashHeading);
splash.appendChild(content);
body.prepend(splash);

setTimeout(() => {
  splash.classList.add("display-none");
}, 2000);
