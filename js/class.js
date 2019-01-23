/********************************************
 * Background Image
 ********************************************/
class Background {
  constructor(canvasWidth, canvasHeight) {
    this.img = new Image();
    this.img.src = '../images/hippo-background.png';
    this.width = canvasWidth;
    this.height = canvasHeight;
  }

  draw(context) {
    context.drawImage(this.img, 0, 0);
    context.save();
    context.fillStyle = '#777777';
    context.font = '38px Space Mono';
    context.fillText('Score', 115, 112);
    context.restore();
  }
}

/********************************************
 * Hippo
 ********************************************/
class Hippo {
  constructor() {
    this.x = 40;
    this.y = 350;

    this.img = {};
    this.imgSrc = {
      normal: '../images/hippo-norm.png',
      left: '../images/hippo-left.png',
      right: '../images/hippo-right.png',
      sad: '../images/hippo-sad.png'
    };
    for (let status in this.imgSrc) {
      this.img[status] = new Image();
      this.img[status].src = this.imgSrc[status];
    }

    this.status = 'normal';
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.drawImage(this.img[this.status], 0, 0);
    context.restore();
  }
}

/********************************************
 * Score
 ********************************************/
// Check this
class Score {
  constructor() {
    this.score = 0;
    this.x = 285 - 30;
    this.y = 145 + 40;
  }

  draw(context) {
    context.save();
    context.fillStyle = '#777777';
    context.font = '38px Space Mono';
    context.textAlign = 'right';
    context.fillText(String(this.score), this.x, this.y);
    context.restore();
  }

  addScore(score, level) {
    switch (level) {
      case 'easy':
        this.score += score;
        break;
      case 'medium':
        this.score += score * 3;
        break;
      case 'hard':
        this.score += score * 5;
        break;
    }
  }

  currentScore() {
    return this.score;
  }
}

/********************************************
 * Normal Word
 ********************************************/
class Word {
  constructor(word, randPos) {
    this.word = word; // random word
    this.score = 10;

    this.subStrEndIndex = 0;

    this.width = this.word.length * 20 + 15; // width of the box that contains the word
    this.height = 50; // height of the box
    this.x = randPos; // random position x of the box
    this.y = -this.height; // position of y of the box
    this.xWord = this.x + 15;
    this.yWord = this.y + this.height / 2 + this.height / 5; // position of word inside box

    this.speedY = 1;
  }

  update() {
    this.y += this.speedY;
    this.yWord = this.y + this.height / 2 + this.height / 5;
    // if word box fall onto table
    if (this.y + this.height > 630) {
      wastePapers.push(this);
      removeWordFromArray(words, this.word);
    }
  }

  draw(context) {
    context.save();

    // draw word box
    context.fillStyle = '#fff';
    context.fillRect(this.x, this.y, this.width, this.height);

    // draw text
    context.font = '27px Space Mono';
    // normal word
    context.fillStyle = '#3d3d3d';
    context.fillText(this.word, this.xWord, this.yWord);
    // highlighted word
    context.fillStyle = '#fd5f5f';
    let subStrFront = this.word.substring(0, this.subStrEndIndex);
    context.fillText(subStrFront, this.xWord, this.yWord);
    context.restore();
  }

  reset() {
    this.subStrEndIndex = 0;
  }

  vanish() {}

  addSpeed() {
    this.speedY++;
  }

  reduceSpeed() {
    this.speedY--;
  }
}


