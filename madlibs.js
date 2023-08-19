const splash = document.querySelector(".splash");
document.addEventListener("DOMContentLoaded",(e) => {
setTimeout(()=>{
  splash.classList.add("display-none") 
}, 2000)
});




function parseStory(rawStory) {
  //create array from raw story
  const storyWords = rawStory.split(" ");
  //checking for words with regex pattern
  const wordPattern = /\[.]/gi;
  // creeate new object of words in array
  const parsedStory = storyWords.map((word) => {
    //strips off the matched pattern from the word ex: noun[n] => noun
    const singleWord = word.replace(wordPattern, "");
    // grab the matched word
    let match = word.match(wordPattern);
    // check if there is a match and create a new object
    if (!match) {
      return { word: singleWord };
    }
    const pos = match[0]; // ["[n]"]
    if (pos === "[n]") {
      return { word: singleWord, pos: "noun" };
    } else if (pos === "[v]") {
      return { word: singleWord, pos: "verb" };
    } else if (pos === "[a]") {
      return { word: singleWord, pos: "adjective" };
    }
  });
  return parsedStory;
}

function createPunctuationText(word, previewContainer, editContainer) {
  // create element for the punctuation text
  const punctuationPreview = document.createElement("span");
  const punctuationEdit = document.createElement("span");
  punctuationPreview.innerText = `${word.word} `;
  punctuationEdit.innerText = `${word.word} `;
  // appending punctuation element/span to the divs
  previewContainer.appendChild(punctuationPreview);
  editContainer.appendChild(punctuationEdit);
}

function createPlainText(word, previewContainer, editContainer) {
  // create element for the regular words text 
  const spanPreview = document.createElement("span");
  const spanEdit = document.createElement("span");
  spanPreview.innerText = ` ${word.word} `;
  spanEdit.innerText = ` ${word.word} `;
  // appending regular words element/span to the divs
  previewContainer.appendChild(spanPreview);
  editContainer.appendChild(spanEdit);
}

function createPos(word, previewContainer, editContainer) {
  const preWhiteSpace = document.createElement("span");
  const postWhiteSpace = document.createElement("span");
  preWhiteSpace.innerText = " ";
  postWhiteSpace.innerText = " ";

  // create input element and its attributes 
  const input = document.createElement("input");
  input.setAttribute("maxlength", "20");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", `[${word.pos}]`);

  const output = document.createElement("mark");
  output.innerText = `[${word.word}]`;

  // append input to the edit container 
  editContainer.appendChild(preWhiteSpace);
  editContainer.appendChild(input);
  editContainer.appendChild(postWhiteSpace);

  // append output to the edit container
  previewContainer.appendChild(preWhiteSpace);
  previewContainer.appendChild(output);

  // synchronizing the input and the output 
  input.addEventListener("input", () => {
    if (input.value) {
      output.innerHTML = input.value;
      input.classList.add("filled");
      output.classList.add("filled");
    } else {
      input.classList.remove("filled");
      output.classList.remove("filled");
      output.innerText = `[${word.pos}]`;
    }
  });
}

function renderStoryToDOM(processedStory) {
  const previewContainer = document.querySelector(".madLibsPreview");
  const editContainer = document.querySelector(".madLibsEdit");

  processedStory.forEach((word) => {
    if (word.word === "." || word.word === ",") {
      createPunctuationText(word, previewContainer, editContainer);
    } else if (word.pos) {
      createPos(word, previewContainer, editContainer);
    } else {
      createPlainText(word, previewContainer, editContainer);
    }
  });

  const inputFields = document.querySelectorAll("input");
  const outputs = document.querySelectorAll("mark");
  const clearButton = document.querySelector("#clearBtn");
  inputFields.forEach((input, i) => {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const nextIndex = (i + 1) % inputFields.length;
        inputFields[nextIndex].focus();
      }
    });
  });
  
  clearButton.addEventListener('click', () => {
    for(let i=0; i<inputFields.length; i++) {
      inputFields[i].value = "";
      outputs[i].innerText = inputFields[i].placeholder;
      inputFields[i].classList.remove("filled");
      outputs[i].classList.remove("filled");
    }
  })  
}   

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    renderStoryToDOM(processedStory);
  });
