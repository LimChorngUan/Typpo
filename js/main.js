/********************************************
 * Page Load
 *********************************************/
// window.onload = hippoTalk;
var container = document.getElementById('container'); // outer container that contains everything
var inputStart = document.getElementById('input-start');

var canvas = document.createElement('canvas');
canvas.width = 1000;
canvas.height = 700;
var context = canvas.getContext('2d');

var background = new Background(canvas.width, canvas.height);
var hippo = new Hippo();
var words = [];

/********************************************
 * RESET game
 *********************************************/
function gameStart() {
  // container.classList.add('fade-out');

  setTimeout(function() {
    container.innerHTML = '';
    container.style.opacity = '0';
    container.appendChild(canvas);
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
  words.forEach(word => word.draw(context));
}

//############################################

// hippoTalk();

// setTimeout(function() {
//   document.addEventListener('keyup', function (e) {
//     // listen to enter key
//     if (e.keyCode === 13) {
//       let userInput = inputStart.value;
//       if (userInput === 'ready') {
//         gameStart();
//       }
//       else {
//         inputStart.value = '';
//       }
//     }
//   })
// }, 9500);

gameStart();

var everythingIntervalId = setInterval(function() {
  updateEverything();
  drawEverything();
}, 50);

var wordIntervalId = setInterval(function() {
  let word = generateWord('easy');
  let x = Math.floor(Math.random() * 400) + 400;
  let wordBox = new Word(word, x);

  words.push(wordBox);
}, 4000);
