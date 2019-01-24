/********************************************
 * Background Image
 ********************************************/
class Background {
  constructor(canvasWidth, canvasHeight) {
    this.img = {};
    this.imgSrc = {
      normal: '../images/hippo-background.png',
      ice: '../images/background-ice.png'
    };
    for (let status in this.imgSrc) {
      this.img[status] = new Image();
      this.img[status].src = this.imgSrc[status];
    }
    this.status = 'normal';
    this.animation = '';
    this.opacity = 1;
    this.width = canvasWidth;
    this.height = canvasHeight;
  }

  update() {
    if (this.animation === 'fade') {
      this.opacity -= 0.07;
    }
    if (this.status === 'ice') {
      if (this.opacity <= 1) {
        this.opacity += 0.1;
      }
    }
  }
  draw(context) {
    context.globalAlpha = this.opacity;
    context.drawImage(this.img[this.status], 0, 0);
    context.save();
    context.fillStyle = '#777777';
    context.font = '38px Space Mono';
    context.fillText('Score', 115, 112);
    context.restore();
  }

  reset() {
    this.status = 'normal';
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
      left: '../images/hippo-left-1.png',
      right: '../images/hippo-right-1.png',
      sad: '../images/hippo-sad.png',
      ice: '../images/hippo-ice.png',
      fire: '../images/hippo-fire.png'
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

  reset() {
    this.status = 'normal';
  }
}

/********************************************
 * Score
 ********************************************/
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

  addScore(score, difficulty) {
    switch (difficulty) {
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

  reset() {
    this.score = 0;
  }
}

/********************************************
 * Normal Word
 ********************************************/
class Word {
  constructor(word, difficulty, speed, randPos) {
    this.word = word; // random word
    this.score = 10;
    this.difficulty = difficulty;
    this.subStrEndIndex = 0;

    this.width = this.word.length * 20 + 15; // width of the box that contains the word
    this.height = 50; // height of the box
    this.x = randPos; // random position x of the box
    this.y = -this.height; // position of y of the box
    this.xWord = this.x + 15;
    this.yWord = this.y + this.height / 2 + this.height / 5; // position of word inside box

    this.speedY = speed;
  }

  update() {
    this.y += this.speedY;
    this.yWord = this.y + this.height / 2 + this.height / 5;
    // if word box fall onto table
    if (this.y + this.height > 630) {
      wastePapers.push(this);
      wastepaperAudio.play();
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

  bottom() {
    return this.y + this.height;
  }
}

/********************************************
 * Fire Word
 ********************************************/
class FireWord extends Word {
  constructor(word, difficulty, speed, randPos) {
    super(word, difficulty, speed, randPos);
    this.fire = 'fire';
  }

  draw(context) {
    context.save();

    // draw word box
    context.fillStyle = '#fd3d3d';
    context.fillRect(this.x, this.y, this.width, this.height);

    // draw text
    context.font = '27px Space Mono';
    // normal word
    context.fillStyle = '#fff';
    context.fillText(this.word, this.xWord, this.yWord);
    // highlighted word
    context.fillStyle = '#000';
    let subStrFront = this.word.substring(0, this.subStrEndIndex);
    context.fillText(subStrFront, this.xWord, this.yWord);
    context.restore();
  }
}

class Fire {
  constructor() {
    this.img = new Image();
    this.img.src = '../images/fire-balls.png';
    this.x = 350;
    this.y = 600;
    this.status = 'hide';
    this.speedY = -7;
  }

  update() {
    if (this.status === 'show') {
      if (this.y > -110) {
        this.y += this.speedY;
      }
    }
    if (this.status === 'hide') {
      this.y = 700;
    }
  }

  draw(context) {
    context.save();
    context.drawImage(this.img, this.x, this.y);
    context.restore();
  }

  top() {
    return this.y;
  }

  reset() {
    this.status === 'hide';
  }
}

/********************************************
 * Ice Word
 ********************************************/
class IceWord extends Word {
  constructor(word, difficulty, speed, randPos) {
    super(word, difficulty, speed, randPos);
    this.ice = 'ice';
  }

  draw(context) {
    context.save();

    // draw word box
    context.fillStyle = '#58DFFF';
    context.fillRect(this.x, this.y, this.width, this.height);

    // draw text
    context.font = '27px Space Mono';
    // normal word
    context.fillStyle = '#fff';
    context.fillText(this.word, this.xWord, this.yWord);
    // highlighted word
    context.fillStyle = '#3006FF';
    let subStrFront = this.word.substring(0, this.subStrEndIndex);
    context.fillText(subStrFront, this.xWord, this.yWord);
    context.restore();
  }
}

/********************************************
 * Green Word
 ********************************************/
class GreenWord extends Word {
  constructor(word, difficulty, speed, randPos) {
    super(word, difficulty, speed, randPos);
    this.green = 'green';
    this.score = 40;
  }

  draw(context) {
    context.save();

    // draw word box
    context.fillStyle = '#36D436';
    context.fillRect(this.x, this.y, this.width, this.height);

    // draw text
    context.font = '27px Space Mono';
    // normal word
    context.fillStyle = '#fff';
    context.fillText(this.word, this.xWord, this.yWord);
    // highlighted word
    context.fillStyle = '#006C00';
    let subStrFront = this.word.substring(0, this.subStrEndIndex);
    context.fillText(subStrFront, this.xWord, this.yWord);
    context.restore();
  }
}

class LevelUpImg {
  constructor() {
    this.img = new Image();
    this.img.src = '../images/level-up.png';

    this.x = 45;
    this.y = 280;

    this.status = 'hide';
    this.opacity = 0;
    this.speedY = -1;
  }

  update() {
    if (this.status === 'show') {
      if (this.opacity < 1) {
        this.opacity += 0.1;
      }
      if (this.y > 230) {
        this.y += this.speedY;
      }
    }

    if (this.status === 'hide') {
      this.y = 280;
      this.opacity = 0;
    }
  }

  draw(context) {
    context.save();
    context.globalAlpha = this.opacity;
    context.drawImage(this.img, this.x, this.y);
    context.restore();
  }

  reset() {
    this.status = 'hide';
  }
}

class ProgressBar {
  constructor() {
    this.x = 60;
    this.y = 250;
    this.width = 230;
    this.height = 50;

    this.barWidth = this.width - 20; // progress bar width
    this.barHeight = this.height - 20;
    this.level = 1;
    this.currentScore = 0; // real current score
    this.preLvlUp = 0; // previous level score
    this.toLvlUp = 50; // next level score
    this.normCurrent = this.currentScore - this.preLvlUp; // normCurrent current score
    this.normLvlUp = this.toLvlUp - this.preLvlUp;
    this.progress = (this.normCurrent / this.toLvlUp) * this.barWidth;
  }

  update() {
    this.normCurrent = this.currentScore - this.preLvlUp;
    this.normLvlUp = this.toLvlUp - this.preLvlUp;
    this.progress = (this.normCurrent / this.normLvlUp) * this.barWidth;
  }

  draw(context) {
    let gradient = context.createLinearGradient(80, 0, this.barWidth, 0);
    gradient.addColorStop(0, '#C6FFDD');
    gradient.addColorStop(0.8, '#FBD786');
    gradient.addColorStop(1, '#f7797d');

    context.save();
    // draw outer border line
    context.fillStyle = '#aaaaaa';
    context.fillRect(this.x, this.y, this.width, this.height);
    // draw inner
    context.fillStyle = '#fff';
    context.fillRect(this.x + 5, this.y + 5, this.width - 10, this.height - 10);

    // draw progress
    context.fillStyle = gradient;
    context.fillRect(this.x + 10, this.y + 10, this.progress, this.barHeight);

    // draw level
    context.font = '28px Space Mono';
    context.fillStyle = '#111111';
    context.textAlign = 'center';
    context.fillText(
      this.level,
      this.x + 10 + this.barWidth / 2,
      this.y + 10 + this.height / 2
    );

    context.restore();
  }
}
