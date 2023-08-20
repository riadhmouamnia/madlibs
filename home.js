document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");

  // create the main container
  const landingPageContainer = document.createElement("main");
  landingPageContainer.classList.add("landing-container");

  // create the instructions container element
  const instructionsContainer = document.createElement("div");
  instructionsContainer.classList.add("instructions");
  const headingOne = document.createElement("h1");
  headingOne.innerText = "Welcome to MadLibs Adventure!";
  const description = document.createElement("p");
  description.innerText =
    "Unleash your creativity with our interactive MadLibs game. Fill in the blanks with nouns, verbs, and adjectives to create hilarious stories.";
  const headingTwo = document.createElement("h2");
  headingTwo.innerText = "How to Play:";

  const ol = document.createElement("ol");
  const stepOne = document.createElement("li");
  stepOne.innerText =
    "Type in different nouns, verbs, and adjectives in the input fields on the right.";
  const stepTwo = document.createElement("li");
  stepTwo.innerText =
    "As you type, the story on the left will automatically update.";
  const stepThree = document.createElement("li");
  stepThree.innerText = "Watch your customized story come to life!";
  ol.append(stepOne, stepTwo, stepThree);

  const link = document.createElement("a");
  link.setAttribute("href", "#game");
  const button = document.createElement("button");
  button.innerText = "Get Started!";
  link.appendChild(button);

  instructionsContainer.append(headingOne, description, headingTwo, ol, link);

  // create the illustration container element
  const illustrationContainer = document.createElement("div");
  illustrationContainer.classList.add("illustration");
  const img = document.createElement("img");
  img.setAttribute("src", "assets/illustration.png");
  img.setAttribute("alt", "illustration");
  illustrationContainer.appendChild(img);

  // append the two containers to the main container
  landingPageContainer.appendChild(instructionsContainer);
  landingPageContainer.appendChild(illustrationContainer);

  // append the main container to the body
  body.prepend(landingPageContainer);
});
