class Box {
  constructor(y, x, onClick) {
    this.y = y;
    this.x = x;
    this.content = '';
    this.boardBox = document.getElementById(`${this.x}_${this.y}`);
    this.boardBox.onclick = onClick;
  }

  setX() {
    this.content = 'X';

    this.boardBox.classList.add('x-box');
  }

  setZero() {
    this.content = '0';
    this.boardBox.classList.add('zero-box');
  }

}

