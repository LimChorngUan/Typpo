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
    if (
      hippo.status === 'left' ||
      hippo.status === 'normal' ||
      hippo.status === 'sad'
    ) {
      hippo.status = 'right';
    } else if (hippo.status === 'right') {
      hippo.status = 'left';
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
    'easy',
    'medium',
    'medium',
    'medium',
    'hard',
    'hard'
  ];
  return levels[randomIndex(levels)];
}

function randomWord(level) {
  let randIndex;

  switch (level) {
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
 * Draw waste paper
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
