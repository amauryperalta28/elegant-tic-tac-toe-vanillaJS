class Game {
  constructor() {
    this.player1 = undefined;
    this.player2 = undefined;
    this.currentPlayerTurn = 1;
    this.gameFinished = false;

    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];

    this.initializeBoard();
    this.boundBoxesWithEvents();
    this.initGame();
  }

  boundBoxesWithEvents() {
    for (let x = 0; x <= 2; x++) {
      for (let y = 0; y <= 2; y++) {
        const boardBox = document.getElementById(`${x}_${y}`);

        boardBox.onclick = () => {
          const coordX = boardBox.id[0];
          const coordY = boardBox.id[2];
          if (!this.gameFinished) {
            this.registerMove(coordX, coordY);
            this.checkWinner();
          }
        };
      }
    }
  }

  initializeBoard() {
    for (let x = 0; x <= 2; x++) {
      for (let y = 0; y <= 2; y++) {
        this.board[y][x] = new Box(y, x);
      }
    }
  }

  checkWinner() {
    // setTimeout(() => {
      if (this.didGameFinished('X') || this.didGameFinished('0')) {
        this.setGameAsFinished();
        this.showWinner();

        if (confirm('Le gustaria jugar otra partida')) {
          this.restartGame();
        } else {
          this.goToStartScreen();
        }
      }
    // }, 10);
  }

  goToStartScreen() {
    location.href = '/src';
  }

  setGameAsFinished() {
    this.gameFinished = true;
  }

  restartGame() {
    location.reload();
  }

  registerMove(x, y) {
    if (this.isValidMove(x, y)) {
      if (this.currentPlayerTurn === 1) {
        this.registerPlayer1Move(x, y);

        this.currentPlayerTurn = 2;
      } else {
        this.registerPlayer2Move(x, y);
        this.currentPlayerTurn = 1;
      }
    } else {
      alert('Movimiento inválido!');
    }
  }

  registerPlayer1Move(x, y) {
    this.board[y][x].setX();
  }

  registerPlayer2Move(x, y) {
    this.board[y][x].setZero();
  }

  isValidMove(x, y) {
    return x >= 0 && x <= 2 && y >= 0 && y <= 2;
  }

  initGame() {
    this.player1 = new Player('Jugador 1', 'X');
    this.player2 = new Player('Jugador 2', '0');
  }

  didGameFinished(symbol) {
    const topRow =
      this.board[0][0].content === symbol &&
      this.board[0][1].content === symbol &&
      this.board[0][2].content === symbol;
    const middleRow =
      this.board[1][0].content === symbol &&
      this.board[1][1].content === symbol &&
      this.board[1][2].content === symbol;
    const bottomRow =
      this.board[2][0].content === symbol &&
      this.board[2][1].content === symbol &&
      this.board[2][2].content === symbol;

    const leftColumn =
      this.board[0][2].content === symbol &&
      this.board[1][2].content === symbol &&
      this.board[2][2].content === symbol;
    const middleColumn =
      this.board[0][1].content === symbol &&
      this.board[1][1].content === symbol &&
      this.board[2][1].content === symbol;
    const rightColumn =
      this.board[0][0].content.content === symbol &&
      this.board[1][0].content.content === symbol &&
      this.board[2][0].content.content === symbol;

    const leftRightDiagonal =
      this.board[0][0].content === symbol &&
      (this.board[1][1].content === symbol) &
        (this.board[2][2].content === symbol);
    const rightLeftDiagonal =
      this.board[2][0].content === symbol &&
      (this.board[1][1].content === symbol) &
        (this.board[0][2].content === symbol);

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
      alert(`${this.player1.id} ganó!!!!`);
    } else {
      alert(`${this.player2.id} ganó!!!!`);
    }
  }

}

var myGame = new Game();
