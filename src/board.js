class Board {
  constructor() {
    this.player1 = undefined;
    this.player2 = undefined;
    this.currentPlayerTurn = 1;

    this.screen = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];

    this.boundWithGameEvents();
    this.start();
  }

  boundWithGameEvents() {
    for (let x = 0; x <= 2; x++) {
      for (let y = 0; y <= 2; y++) {
        const test = document.getElementById(`${x}_${y}`);

        test.onclick = () => {
          console.log(test.id);
          const coordX = test.id[0];
          const coordY = test.id[2];
          this.registerMove(coordX, coordY);
        };
      }
    }
  }

  registerMove(x, y) {
    if (x >= 0 && x <= 2 && y >= 0 && y <= 2) {
      const test = document.getElementById(`${x}_${y}`);
      if (this.currentPlayerTurn === 1) {
        this.screen[y][x] = this.player1.symbol;
        test.classList.add('x-box');
        this.currentPlayerTurn = 2;
      } else {
        this.screen[y][x] = this.player2.symbol;
        test.classList.add('zero-box');
        this.currentPlayerTurn = 1;
      }

      if(this.didGameFinished('X') || this.didGameFinished('0')){
alert('Se termino el juego');
      }
    } else {
      alert('Invalid move!');
    }
  }

  start() {
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

  getWinner() {
    if (this.didGameFinished(player1.symbol)) {
      alert(`${player1.id}`);
    } else {
      alert(`${player2.id}`);
    }
  }

  init() {
    const test = document.getElementById('1_1');
    test.onclick = () => {
      console.log('Yo soy 1_1 y me hicieron click, k lo k');
    };
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
