/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
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

/**
 * Render a word or a ponctuation to the DOM in a <span> element.
 * @param {Object} objWord Object containing a word attribute with word value or ponctuation.
 * @returns {HTMLElement} A span containing the word or the ponctuation.
 */
const renderWord = objWord => {
  const word = objWord.word;

  // Create a span element
  const textSpan = document.createElement('span');

  // Check if object word has previewId
  if ('previewId' in objWord) {
    textSpan.innerHTML = ' ' + objWord.pos + ' ';
    textSpan.setAttribute('id', objWord.previewId);
    textSpan.setAttribute('class', 'input-text-preview')
  }
  else {
    textSpan.innerHTML = ' ' + word + ' ';
  }

  return textSpan;
};


/**
 * Find the preview element and update it's content with the input entered value.
 * @param {Object} objWord Object containing a word, pos, editId, previewId as attributes.
 * @param {HTMLElement} input The input element corresponding in the edit-content div.
 */
const matchAndUpdatePreviewInput = (objWord, input) => {
  // Get the text from preview-content div with the corresponding id.
  const inputTextPreview = document.getElementById(objWord.previewId);
    let value = input.value;

    if (input.value === '') {
      value = objWord.pos;
      inputTextPreview.classList.add('input-text-preview')
      inputTextPreview.classList.remove('input-text-preview-change')
    } else {
      inputTextPreview.classList.add('input-text-preview-change')
      inputTextPreview.classList.remove('input-text-preview')
    }

    inputTextPreview.innerHTML = value;
    
};


/**
 * Find the next input field and focus it by pressing Enter key.
 * @param {Event} event Keypress event.
 * @param {String} currentEditId Current input field id in the edit-content div.
 */
const nextInputFocus = (event, currentEditId) => {
  // Check if the pressed key is 'Enter'
  if (event.key === "Enter") {
    const currentEditIdNb = Number(currentEditId.split('-')[1]);

    // Get the next input by incrementing the input id
    let nextInput = document.getElementById('input-' + (currentEditIdNb + 1));

    // Check if this is the final input.
    if (!nextInput)
      // Get the first input.
      nextInput = document.getElementById('input-' + 0);

    nextInput.focus()
  }
};

/**
 * Render an input element with the corresponding pos value to the DOM.
 * @param {Object} objWord Object containing a word, pos, editId, previewId as attributes.
 * @returns {HTMLElement} An input element with the corresponding pos placedholder.
 */
const renderInput = objWord => {
  // Create an input element.
  const input = document.createElement('input');
  input.setAttribute('id', objWord.editId);
  input.setAttribute('class', 'edit-input');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', objWord.pos);
  input.setAttribute('maxlength', 15);

  // Add event listener for input value change.
  input.addEventListener('input', () => {
    matchAndUpdatePreviewInput(objWord, input);
  });

  // Add event listener for input 'enter' key.
  input.addEventListener('keypress', event => {
    nextInputFocus(event, objWord.editId);
  });

  return input;
};

/**
 * Render the processed story to the DOM.
 * @param {Array} processedStory Array containing the processed story after parsing.
 */
const renderStory = processedStory => {
  // Find the corresponding div for the edit and preview story
  const editContent = document.getElementById('edit-content');
  const previewContent = document.getElementById('preview-content');

  // Counter for the numbers of inputs
  let inputCounter = 0;

  processedStory.forEach((objWord, index) => {
    // Check if word object has not the 'pos' attribute.
    if (!('pos' in objWord)) {

      // Call renderWord to return a span for edit-content div.
      const textSpanEdit = renderWord(objWord);
      const textSpanPreview = renderWord(objWord);

      // Append the spans to edit and preview content divs.
      editContent.appendChild(textSpanEdit);
      previewContent.appendChild(textSpanPreview);

    } else {

      // Add ids for input in edit-content and for corresponding text in preview 
      objWord.editId = 'input' + '-' + inputCounter;
      objWord.previewId = objWord.pos + '-' + index;
      inputCounter++;

      // Call renderWord to return an input and a span for edit and preview divs.
      const inputEdit = renderInput(objWord);
      const inputTextPreview = renderWord(objWord);

      // Append the input and the span to edit and preview content divs.
      editContent.appendChild(inputEdit);
      previewContent.appendChild(inputTextPreview);
    }
  });
};

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    renderStory(processedStory);
  });
