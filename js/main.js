var container = document.getElementById('container'); // outer container that contains everything
var inputReady = document.getElementById('input-start');

var canvas = document.createElement('canvas');
canvas.width = 1000;
canvas.height = 700;
var context = canvas.getContext('2d');

var input = document.createElement('input');
input.className = 'user-input';
input.autofocus = true;

var gameIntervalId;
var background = new Background(canvas.width, canvas.height);
var hippo = new Hippo();
var score = new Score();
var progressBar = new ProgressBar();
var levelUpImg = new LevelUpImg();
var fireImg = new Fire();
var gameOverImg = new Image();
gameOverImg.src = '../images/background-bye.png';

var words = []; // all the words that user need to type
var wastePapers = []; // words that fall on the table

// Initial value to level 1
var gameLevel = 1;
var scoreToLevelUp = 50;
var wordSpeed = 1;
var timeInterval = 5000;
var levelIntervalId = 0;
var level5IntervalId = 0;
var level6IntervalId = 0;

// check status;
var iceOrFire = 'ice';
var outputElement = true;
var gameOnGoing = true;
// Game Over page
var gameOver = document.getElementById('game-over');
var btnReplay = document.querySelector('.btn-replay');
var btnQuit = document.querySelector('.btn-quit');
var quit = document.getElementById('quit');

/********************************************
 * Prepare canvas
 *********************************************/
function canvasReady() {
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
  background.update();
  words.forEach(word => word.update());
  fireImg.update();
  levelUpImg.update();
  progressBar.update();
  generateElement();
}

function drawEverything() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  background.draw(context);
  hippo.draw(context);
  score.draw(context);
  progressBar.draw(context);
  words.forEach(word => word.draw(context));
  fireImg.draw(context);
  levelUpImg.draw(context);
  drawWaste();
}

function renderEverything() {
  gameIntervalId = setInterval(function() {
    updateEverything();
    drawEverything();
    checkGameOnGoing();
  }, 17);
}

/********************************************
 * Check If game is on going or GAME OVER
 *********************************************/
function checkGameOnGoing() {
  if (wastePapers.length >= 10) {
    gameOnGoing = false;
    hippo.status = 'sad';
    preGameOverAudio.play();
    mainAudio.pause();

    setTimeout(function() {
      clearInterval(gameIntervalId);
    }, 100);

    setTimeout(function() {
      gameOverAudio.play();
      gameOver.style.display = 'flex';

      // btnReplay.addEventListener('click', function() {
      //   clickAudio.play();
      //   gameReset();
      //   gameStart();
      // });
      btnQuit.addEventListener('click', function() {
        clickAudio.play();
        gameQuit();
      });
    }, 2000);
  }
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
        correctAudio.play();
        // Check elements
        if (word.hasOwnProperty('ice')) {
          ice();
        }
        if (word.hasOwnProperty('fire')) {
          fire();
        }
        if (word.hasOwnProperty('green')) {
          greenAudio.play();
        }

        // add score, remove word, reset
        word.vanish = true;
        score.addScore(word.score, word.difficulty);
        progressBar.currentScore = score.score;
        correctCounter++;
        words.splice(wordIndex, 1);
        resetWords();

        // check level up
        if (score.score >= scoreToLevelUp) {
          if (background.status !== 'ice') {
            progressBar.preLvlUp = scoreToLevelUp;
            gameLevel += 1;
            progressBar.level = gameLevel;
            LevelUp();
            progressBar.toLvlUp = scoreToLevelUp;
            generateWords();
            levelUpImg.status = 'show';
            drawLevelUp();
          }
        }
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
      incorrectAudio.play();
      if (hippo.status !== 'ice') {
        hippo.status = 'sad';
      }

      resetWords();
    }
  });
}

/********************************************
 * GAME START
 ********************************************/
function gameStart() {
  hippoType();
  generateWords();
  setInterval(function() {
    generateGreen();
  }, 80000);
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
      typingAudio.play();
      if (e.keyCode === 13) {
        let userInput = inputReady.value;
        if (userInput === 'ready') {
          //########## GAME START ###########
          container.classList.add('fade-out');
          canvasReady();
          gameStart();
        } else {
          inputReady.value = '';
        }
      }
    });
  }, 9500);
}


setTimeout(function() {
  mainAudio.play();
  hippoTalk();
  checkReady();
}, 1000) 

// window.onload = function () {
  
// };
// container.classList.add('fade-out');
// canvasReady();
// gameStart();
