class Board {
  constructor() {
    this.player1 = undefined;
    this.player2 = undefined;
    this.currentPlayerTurn = 1;
    this.gameFinished = false;

    this.screen = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];

    this.boundBoxesWithEvents();
    this.initGame();
  }

  boundBoxesWithEvents() {
    for (let x = 0; x <= 2; x++) {
      for (let y = 0; y <= 2; y++) {
        const test = document.getElementById(`${x}_${y}`);

        test.onclick = () => {
          const coordX = test.id[0];
          const coordY = test.id[2];
          if (!this.gameFinished) {
            this.registerMove(coordX, coordY);
          }
        };
      }
    }
  }

  registerMove(x, y) {
    if (x >= 0 && x <= 2 && y >= 0 && y <= 2) {
      const clickedBox = document.getElementById(`${x}_${y}`);

      if (this.currentPlayerTurn === 1) {
        this.screen[y][x] = this.player1.symbol;
        clickedBox.classList.add('x-box');
        this.currentPlayerTurn = 2;
      } else {
        this.screen[y][x] = this.player2.symbol;
        clickedBox.classList.add('zero-box');
        this.currentPlayerTurn = 1;
      }

      if (this.didGameFinished('X') || this.didGameFinished('0')) {
        this.gameFinished = true;
        // alert('Se termino el juego');
        this.showWinner();
      }
    } else {
      alert('Invalid move!');
    }
  }

  initGame() {
    this.player1 = new Player('Player1', 'X');
    this.player2 = new Player('Player1', '0');

    this.reset();
  }

  didGameFinished(symbol) {
    const topRow =
      this.screen[0][0] === symbol &&
      this.screen[1][0] === symbol &&
      this.screen[2][0] === symbol;
    const middleRow =
      this.screen[0][1] === symbol &&
      this.screen[1][1] === symbol &&
      this.screen[2][1] === symbol;
    const bottomRow =
      this.screen[2][0] === symbol &&
      this.screen[2][1] === symbol &&
      this.screen[2][2] === symbol;

    const leftColumn =
      this.screen[0][0] === symbol &&
      this.screen[1][0] === symbol &&
      this.screen[2][0] === symbol;
    const middleColumn =
      this.screen[0][1] === symbol &&
      this.screen[1][1] === symbol &&
      this.screen[2][1] === symbol;
    const rightColumn =
      this.screen[2][0] === symbol &&
      this.screen[2][1] === symbol &&
      this.screen[2][2] === symbol;

    const leftRightDiagonal =
      this.screen[0][0] === symbol &&
      (this.screen[1][1] === symbol) & (this.screen[2][2] === symbol);
    const rightLeftDiagonal =
      this.screen[2][0] === symbol &&
      (this.screen[1][1] === symbol) & (this.screen[0][2] === symbol);

    const winnerPositions = [
      topRow,
      middleRow,
      bottomRow,
      leftColumn,
      middleColumn,
      rightColumn,
      leftRightDiagonal,
      rightLeftDiagonal,
    ];

    return winnerPositions.some((w) => w);
  }

  showWinner() {
    if (this.didGameFinished(this.player1.symbol)) {
      alert(`${this.player1.id} won!!!!`);
    } else {
      alert(`${this.player2.id} won!!!!`);
    }
  }

  reset() {
    this.currentPlayerTurn = 1;
    this.screen = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
  }
}

var myBoard = new Board();
