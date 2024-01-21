// Word and Hints
const options = {
  spring: "Java Blooms Framework",
  react: "Component Drama Queen",
  express: "Node Express Yourself",
  flask: "Python, web, flask-tastic!",
  python: "Snake",
  java: "Coffee",
  git: "Branching out",
  agile: "Start of Sprint: 😀, End: 💀",
  sql: "Querying for treasures",
  javascript: "ECMA-larious",
  css: "Styling chaos",
  html: "Markup magic",
  csharp: "Microsoft's baby",
  godot: "Playing with gods",
};

// Initial References
const message = $("#message");
const hintRef = $(".hint-ref");
const controls = $(".controls-container");
const startBtn = $("#start");
const restartBtn = $("#restart"); // New "Restart" button
const letterContainer = $("#letter-container");
const userInpSection = $("#user-input-section");
const resultText = $("#result");
const word = $("#word");
const words = Object.keys(options);
let randomWord = "",
  randomHint = "";
let winCount = 0,
  lossCount = 0;

// Generate random value
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

// Block all the buttons
const blocker = () => {
  let lettersButtons = $(".letters");
  stopGame();
};

// Start Game
restartBtn.on("click", () => {
  restartGame();
});

// Function to restart the game
const restartGame = () => {
  controls.addClass("hide");
  init();
};

// Stop Game
const stopGame = () => {
  controls.removeClass("hide");
};

// Generate Word Function
const generateWord = () => {
  letterContainer.removeClass("hide");
  userInpSection.text("");
  randomWord = words[generateRandomValue(words)];
  randomHint = options[randomWord];
  hintRef.html(`<div id="wordHint"><span>Hint: </span>${randomHint}</div>`);
  let displayItem = "";
  randomWord.split("").forEach((value) => {
    displayItem += '<span class="inputSpace">_ </span>';
  });

  // Display each element as span
  userInpSection.html(displayItem);
  userInpSection.append(`<div id='chanceCount'>Chances Left: ${lossCount}</div>`);
};

// Initial Function
const init = () => {
  winCount = 0;
  lossCount = 5;
  randomWord = "";
  word.text("");
  randomHint = "";
  message.text("");
  userInpSection.html("");
  letterContainer.addClass("hide");
  letterContainer.html("");
  generateWord();

  // For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = $(`<button class="letters">${String.fromCharCode(i)}</button>`);

    // Character button onclick
    button.on("click", () => {
      message.text(`Correct Letter`);
      message.css("color", "#008000");
      let charArray = randomWord.toUpperCase().split("");
      let inputSpace = $(".inputSpace");

      // If array contains clicked value, replace the matched Dash with Letter
      if (charArray.includes(button.text())) {
        charArray.forEach((char, index) => {
          // If character in array is the same as the clicked button
          if (char === button.text()) {
            button.addClass("correct");
            // Replace dash with letter
            inputSpace.eq(index).text(char);
            // Increment counter
            winCount += 1;
            // If winCount equals word length
            if (winCount == charArray.length) {
              resultText.html("You Won");
              word.html(`The word was: <span>${randomWord}</span>`);
              restartBtn.text("Restart"); // Changed to "Restart"
              // Block all buttons
              blocker();
            }
          }
        });
      } else {
        // Lose count
        button.addClass("incorrect");
        lossCount -= 1;
        $("#chanceCount").text(`Chances Left: ${lossCount}`);
        message.text(`Incorrect Letter`);
        message.css("color", "#ff0000");
        if (lossCount == 0) {
          word.html(`The word was: <span>${randomWord}</span>`);
          resultText.html("Game Over");
          blocker();
        }
      }

      // Disable clicked buttons
      button.prop("disabled", true);
      // Add the "chosen" class to the clicked key
      button.addClass("chosen");
    });

    // Append generated buttons to the letters container
    letterContainer.append(button);
  }
};

$(document).on("keydown", function (event) {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    const letter = String.fromCharCode(event.keyCode);
    $(".letters:contains(" + letter + ")").click();
  }
});

$(window).on("load", restartGame);