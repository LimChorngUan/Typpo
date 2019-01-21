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
  }
}

/********************************************
 * Hippo
 ********************************************/
class Hippo {
  constructor() {
    this.img = new Image();
    // this.imgSrc = {
    //   normal: '../images/hippo-norm.png'
    // }
    this.img.src = '../images/hippo-norm.png'; // change this
    this.status = 'normal';
    this.x = 40;
    this.y = 350;
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.drawImage(this.img, 0, 0);
    context.restore();
  }
}

/********************************************
 * Normal Word
 ********************************************/
class Word {
  constructor(word, randPos) {
    this.word = word; // random word

    this.width = this.word.length * 20 + 15; // width of the box that contains the word
    this.height = 50; // height of the box
    this.x = randPos; // random position x of the box
    this.y = -this.height; // position of y of the box
    this.xWord = this.x + this.width / 2;
    this.yWord = this.y + this.height / 2 + this.height / 5; // position of word inside box

    this.speedY = 1;
  }

  update() {
    this.y += this.speedY;
    this.yWord = this.y + this.height / 2 + this.height / 5;
  }

  draw(context) {
    context.save();
    context.fillStyle = '#fff';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.fillStyle = '#3d3d3d';
    context.font = '27px Space Mono';
    context.textAlign = 'center';
    context.fillText(this.word, this.xWord, this.yWord);
    context.restore();
  }
}
