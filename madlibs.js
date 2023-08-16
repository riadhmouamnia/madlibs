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
    //strips off the matched pattern from the word [noun]
    const singleWord = word.replace(wordPattern, "");
    console.log({ word, singleWord });
    // grab the matched word
    let match = word.match(wordPattern);
    console.log("match: ", match);
    // check if there is a match and create a new object
    if (!match) {
      return { word: singleWord };
    }
    const pos = match[0];
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
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    console.log(processedStory);
  });
