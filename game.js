class Game {
  constructor() {
    this.player1 = undefined;
    this.player2 = undefined;
    this.currentPlayerTurn = 1;
    this.gameFinished = false;

    this.initializeBoard();
    this.startGame();
  }

  initializeBoard() {
    this.board = [[], [], []];

    for (let x = 0; x <= 2; x++) {
      for (let y = 0; y <= 2; y++) {
        const onClick = () => {
          if (!this.gameFinished) {
            this.registerMove(x, y);
            this.checkWinner();
          }
        };

        this.board[y][x] = new Box(y, x, onClick);
      }
    }

  }

  checkWinner() {
    setTimeout(() => {
      if (this.didGameFinished()) {
        this.setGameAsFinished();

        this.showWinner();

        if (confirm('Le gustaria jugar otra partida')) {
          this.restartGame();
        } else {
          this.goToStartScreen();
        }
      }
    }, 10);
  }

  goToStartScreen() {
    history.back();
  }

  setGameAsFinished() {
    this.gameFinished = true;
  }

  cleanBoard() {
    for (let x = 0; x <= 2; x++) {
      for (let y = 0; y <= 2; y++) {
        this.board[y][x].clean();
      }
    }

  }

  restartGame() {
    this.gameFinished = false;
    this.cleanBoard();
  }

  registerMove(x, y) {
    if (!this.isValidMove(x, y)) {
      alert('Movimiento inválido!');
      return;
    }

    if (this.currentPlayerTurn === 1) {
      this.registerPlayer1Move(x, y);

    } else {
      this.registerPlayer2Move(x, y);

    }
  }

  registerPlayer1Move(x, y) {
    if (this.board[y][x].content.length === 0) {
      this.board[y][x].setX();
      
      this.currentPlayerTurn = 2;
    }
  }

  registerPlayer2Move(x, y) {
    if (this.board[y][x].content.length === 0) {
      this.board[y][x].setZero();
      this.currentPlayerTurn = 1;
    }
  }

  isValidMove(x, y) {
    return x >= 0 && x <= 2 && y >= 0 && y <= 2;
  }

  startGame() {
    this.player1 = new Player('Jugador 1', 'X');
    this.player2 = new Player('Jugador 2', '0');
  }

  didGameFinished() {
    return (
      this.didThisPlayerWon(this.player1.symbol) ||
      this.didThisPlayerWon(this.player2.symbol)
    );
  }

  didThisPlayerWon(playerSymbol) {
    const topRow =
      this.board[0][0].content === playerSymbol &&
      this.board[0][1].content === playerSymbol &&
      this.board[0][2].content === playerSymbol;
    const middleRow =
      this.board[1][0].content === playerSymbol &&
      this.board[1][1].content === playerSymbol &&
      this.board[1][2].content === playerSymbol;
    const bottomRow =
      this.board[2][0].content === playerSymbol &&
      this.board[2][1].content === playerSymbol &&
      this.board[2][2].content === playerSymbol;

    const leftColumn =
      this.board[0][0].content === playerSymbol &&
      this.board[1][0].content === playerSymbol &&
      this.board[2][0].content === playerSymbol;
    const middleColumn =
      this.board[0][1].content === playerSymbol &&
      this.board[1][1].content === playerSymbol &&
      this.board[2][1].content === playerSymbol;
    const rightColumn =
      this.board[0][2].content === playerSymbol &&
      this.board[1][2].content === playerSymbol &&
      this.board[2][2].content === playerSymbol;

    const leftRightDiagonal =
      this.board[0][0].content === playerSymbol &&
      (this.board[1][1].content === playerSymbol) &
        (this.board[2][2].content === playerSymbol);
    const rightLeftDiagonal =
      this.board[2][0].content === playerSymbol &&
      (this.board[1][1].content === playerSymbol) &
        (this.board[0][2].content === playerSymbol);

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
    if (this.didThisPlayerWon(this.player1.symbol)) {
      alert(`${this.player1.id} ganó!!!!`);
    } else {
      alert(`${this.player2.id} ganó!!!!`);
    }
  }
}

var myGame = new Game();
