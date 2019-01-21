/*****************************************
 * Typewritter effect
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
 * Generate random words
 *****************************************/
function randomIndex(wordsArray) {
  return Math.floor(Math.random() * wordsArray.length);
}

function generateWord(level) {
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
