/********************************************
 * Page Load
 *********************************************/
// window.onload = hippoTalk;
var container = document.getElementById('container'); // outer container that contains everything
var inputReady = document.getElementById('input-start');

var canvas = document.createElement('canvas');
canvas.width = 1000;
canvas.height = 700;
var context = canvas.getContext('2d');

var input = document.createElement('input');
// input.style.display = 'none';
input.autofocus = true;

var background = new Background(canvas.width, canvas.height);
var hippo = new Hippo();
var score = new Score();

var words = []; // all the words that user need to type
var wastePapers = []; // words that fall on the table

var gameLevel = 1;


/********************************************
 * Prepare canvas
 *********************************************/
function canvasReady() {
  // container.classList.add('fade-out');
  setTimeout(function() {
    container.innerHTML = '';

    container.style.opacity = '0';
    container.appendChild(canvas);
    container.appendChild(input);
    input.focus(); // focus user input
    drawEverything();
    container.className = 'container--dark fade-in--1';
  }, 400);
}

/********************************************
 * Update and Draw canvas
 *********************************************/
function updateEverything() {
  words.forEach(word => word.update());
}

function drawEverything() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  background.draw(context);
  hippo.draw(context);
  score.draw(context);
  words.forEach(word => word.draw(context));
  drawWaste();
}

function renderEverything() {
  var intervalId = setInterval(function() {
    updateEverything();
    drawEverything();

    //########## END GAME ###########
    if (wastePapers.length >= 10) {
      clearInterval(intervalId);
    }
  }, 17);
}

/********************************************
  Check Words
 ********************************************/
function checkWords() {
  input.addEventListener('keyup', function(e) {
    let inputText = input.value;
    let correctCounter = 0;

    words.forEach(function(word, wordIndex) {
      // 1. check if user input match words given
      if (inputText === word.word) {
        score.addScore(word.score, word.level);
        words.splice(wordIndex, 1);
        resetWords();
        correctCounter++;
      } else {
        // 2. check if user input match substring of the words
        if (inputText === word.word.substring(0, inputText.length)) {
          word.subStrEndIndex = inputText.length;
          correctCounter++;
        }
      }
    });

    // 3. if none is correct
    if (correctCounter === 0) {
      hippo.status = 'sad';
      resetWords();
    }
  });
}

// reset words array
function resetWords() {
  input.value = '';
  words.forEach(function(word) {
    word.reset();
  });
}

function removeWordFromArray(wordsArray, removeWord) {
  wordsArray.forEach(function(word, i) {
    if (removeWord === word.word) {
      wordsArray.splice(i, 1);
    }
  });
}

/********************************************
  Generate Words
 ********************************************/
function generateWord() {
  let x = randomPos();
  let wordDifficulty = randomDifficulty();
  let word = randomWord(wordDifficulty);
  // create new word
  let wordBox = new Word(word, x);
  // push to the words array
  words.push(wordBox);
}

/********************************************
  LEVELing
 ********************************************/
function leveling() {
  // Level 1
  if (gameLevel === 1) {
    var intervalId1 = setInterval(function () {
      generateWord();
    }, 3000)
  }
 
} 
/********************************************
 * Level UP!
 ********************************************/

/********************************************
 * GAME START
 ********************************************/
function gameStart() {
  canvasReady();
  hippoType();

  checkWords();
  renderEverything();
}
/********************************************
 * READY!!!
 ********************************************/
function checkReady() {
  setTimeout(function() {
    inputReady.addEventListener('keyup', function(e) {
      // listen to enter key
      if (e.keyCode === 13) {
        let userInput = inputReady.value;
        if (userInput === 'ready') {
          //########## GAME START ###########
          gameStart();
        } else {
          inputReady.value = '';
        }
      }
    });
  }, 9500);
}

//############################################################
//############################################################

// hippoTalk();
// // Listen to enter key after hippo done with his talking
// checkReady();

gameStart();
