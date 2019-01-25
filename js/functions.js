/*****************************************
 * Typewritter effect Animation
 *****************************************/
// Make the words come out one by one
// target: html element that will output the sentence
function typewritter(target, sentence) {
  let counter = 0;
  let intervalId = setInterval(function() {
    if (counter < sentence.length) {
      target.innerHTML += sentence[counter];
      counter++;
    } else {
      clearInterval(intervalId);
    }
  }, 1000 / 25);
}

function hippoTalk() {
  let conversationBox = document.querySelector('.p-container');
  let sentences = [
    'Hello, my name is Hippo Lim.',
    'My dream is to become . . .',
    "World 's Fastest Typer!",
    'Can you please help me?'
  ];
  let line = 0; // line of the sentences

  var intervalId = setInterval(function() {
    if (line < sentences.length) {
      let p = document.createElement('p');
      // highlight and make line2 bold
      if (line === 2) {
        p.className = 'highlight bold';
      }
      conversationBox.appendChild(p);
      typewritter(p, sentences[line]);
      line++;
    } else {
      clearInterval(intervalId);
    }
  }, 1800);
}

/*****************************************
 * Hippo Typing Animation
 *****************************************/
function hippoType() {
  document.addEventListener('keydown', function() {
    typingAudio.play();

    if (hippo.status !== 'ice') {
      if (
        hippo.status === 'left' ||
        hippo.status === 'normal' ||
        hippo.status === 'sad'
      ) {
        hippo.status = 'right';
      } else if (hippo.status === 'right') {
        hippo.status = 'left';
      }
    }
  });
}

/*****************************************
 * Generate randomssssness
 *****************************************/
function randomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function randomPos() {
  return Math.floor(Math.random() * 400) + 400;
}

function randomDifficulty() {
  let levels = [
    'easy',
    'easy',
    'easy',
    'easy',
    'easy',
    'medium',
    'medium',
    'medium',
    'medium',
    'medium',
    'hard'
  ];
  return levels[randomIndex(levels)];
}

function randomWord(difficulty) {
  let randIndex;

  switch (difficulty) {
    case 'easy':
      randIndex = randomIndex(wordsEasy);
      return wordsEasy[randIndex];
    case 'medium':
      randIndex = randomIndex(wordsMedium);
      return wordsMedium[randIndex];
    case 'hard':
      randIndex = randomIndex(wordsHard);
      return wordsHard[randIndex];
  }
}

/*****************************************
 * Remove and reset words
 *****************************************/
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

/*****************************************
 * Draw Image
 *****************************************/
// x is the position that the word box fall onto
let wastePaper = new Image();
wastePaper.src = '../images/waste-paper.png';

function drawWaste() {
  wastePapers.forEach(function(paper) {
    let x = paper.x + paper.width / 2 - 35;
    context.drawImage(wastePaper, x, 600, 70, 70);
  });
}

function drawLevelUp() {
  levelUpImg.status = 'show';
  setTimeout(function() {
    levelUpImg.status = 'hide';
  }, 700);
  console.log('level up');
}

function drawFire() {
  fireImg.status = 'show';

  setTimeout(function() {
    console.log('hide');
    fireImg.status = 'hide';
  }, 2000);
  console.log('fire');
}

/********************************************
  Generate Words
 ********************************************/
function generateWord(wordSpeed) {
  let x = randomPos();
  let wordDifficulty;
  if (gameLevel === 1) {
    wordDifficulty = 'easy';
  } else {
    wordDifficulty = randomDifficulty();
  }
  let word = randomWord(wordDifficulty);
  let wordBox = new Word(word, wordDifficulty, wordSpeed, x);
  words.push(wordBox);
}

function generateWords() {
  clearInterval(levelIntervalId);
  levelIntervalId = setInterval(function() {
    generateWord(wordSpeed);
  }, timeInterval);

  if (gameLevel >= 5) {
    level5IntervalId = setInterval(function() {
      generateWord(1);
    }, 30000);
  }
}

/*****************************************
 * Generate Element
 *****************************************/
function generateElement() {
  if (
    words.length > 4 &&
    iceOrFire === 'ice' &&
    outputElement === true &&
    gameLevel >= 4
  ) {
    generateIce();
    outputElement = false;
    iceOrFire = 'fire';

    setTimeout(function() {
      outputElement = true;
    }, 15000);
  }

  if (
    words.length > 4 &&
    iceOrFire === 'fire' &&
    outputElement === true &&
    gameLevel >= 4
  ) {
    generateFire();
    outputElement = false;
    iceOrFire = 'ice';

    setTimeout(function() {
      outputElement = true;
    }, 10000);
  }
}

function generateFire() {
  let x = randomPos();
  let difficulty = randomDifficulty();
  let word = randomWord(difficulty);
  let wordBox = new FireWord(word, difficulty, wordSpeed, x);
  words.push(wordBox);
}

function generateIce() {
  let x = randomPos();
  let difficulty = randomDifficulty();
  let word = randomWord(difficulty);
  let wordBox = new IceWord(word, difficulty, wordSpeed, x);
  words.push(wordBox);
}

function generateGreen() {
  let x = randomPos();
  let word = randomWord('hard');
  let wordBox = new GreenWord(word, 'hard', wordSpeed, x);
  words.push(wordBox);
}

/*****************************************
 * Power
 *****************************************/
function fire() {
  clearInterval(levelIntervalId);
  drawFire();
  fireAudio.play();
  hippo.status = 'fire';
  let intervalId = setInterval(function() {
    words.forEach(function(word, i) {
      if (fireImg.top() < word.bottom()) {
        console.log('burn');
        words.splice(i, 1);
      }
    });
  }, 100);

  setTimeout(function() {
    clearInterval(intervalId);
    background.status = 'normal';
    hippo.status = 'normal';
    words = [];
    generateWords();
  }, 2300);
}

function ice() {
  clearInterval(levelIntervalId);
  clearInterval(level5IntervalId);
  iceAudio.play();
  checkWords();
  background.animation = 'fade';
  wordSpeed = 0;
  words.forEach(function(word) {
    word.speedY = 0;
  });

  setTimeout(function() {
    background.animation = '';
    background.status = 'ice';
    hippo.status = 'ice';
  }, 200);

  setTimeout(function() {
    background.status = 'normal';
    hippo.status = 'normal';
    wordSpeed = 2;
    generateWords();
    words.forEach(function(word) {
      word.speedY = wordSpeed;
    });
  }, 5000);
}

/********************************************
 * Level up
 ********************************************/
function LevelUp() {
  levelUpAudio.play();
  switch (gameLevel) {
    case 2:
      scoreToLevelUp = 100;
      wordSpeed = 1;
      timeInterval = 3000;
      break;
    case 3:
      console.log('lvl 3');
      scoreToLevelUp = 150;
      wordSpeed = 1;
      timeInterval = 2000;
      break;
    case 4:
      console.log('lvl 4');
      scoreToLevelUp = 250;
      wordSpeed = 1;
      timeInterval = 1200;
      break;
    case 5:
      console.log('lvl 5');
      scoreToLevelUp = 550;
      wordSpeed = 2;
      timeInterval = 2000;
      break;
    case 6:
      console.log('lvl 6');
      scoreToLevelUp = 1500;
      wordSpeed = 2;
      timeInterval = 1500;
      break;
    case 7:
      console.log('lvl 7');
      scoreToLevelUp = 3000;
      wordSpeed = 2;
      timeInterval = 1000;
      break;
    case 8:
      console.log('lvl 8');
      scoreToLevelUp = 4500;
      wordSpeed = 2;
      timeInterval = 800;
      break;
    case 9:
      console.log('lvl 9');
      scoreToLevelUp = 7500;
      wordSpeed = 2;
      timeInterval = 500;
      break;
    case 10:
      console.log('lvl 10');
      scoreToLevelUp = 10000000000000000000000000000;
      wordSpeed = 2;
      timeInterval = 500;
      break;
    case 11:
      console.log('you are not a human');
  }
}

/********************************************
 * Game Reset or Quit
 ********************************************/
// function gameReset() {
//   canvasReady();
//   gameOver.style.display = 'none';
//   words = [];
//   wastePapers = [];
//   gameLevel = 1;
//   scoreToLevelUp = 50;
//   wordSpeed = 1;
//   timeInterval = 3000;
//   levelIntervalId = 0;
//   level5IntervalId = 0;
//   iceOrFire = 'ice';
//   outputElement = true;
//   background.reset();
//   hippo.reset();
//   score.reset();
//   fireImg.reset();
//   levelUpImg.reset();
// }

function gameQuit() {
  quit.style.display = 'block';
  setTimeout(function() {
    quitAudio.play();
  }, 1000);
}
