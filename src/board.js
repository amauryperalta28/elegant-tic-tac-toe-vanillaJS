function Board() {
  this.player1 = undefined;
  this.player2 = undefined;
  let currentPlayerTurn = 1;

  this.screen = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  this.reset = function () {
    currentPlayerTurn = 1;
    this.screen = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
  };

  this.registerMove = function (player, x, y) {
    if (x >= 0 && x <= 2 && y >= 0 && x <= y) {
      this.screen[x][y] = player.symbol;

      if (player.id === 'Player1') {
        currentPlayerTurn = 2;
      } else {
        currentPlayerTurn = 1;
      }
    } else {
      alert('Invalid move!');
    }
  };

  this.start = function () {
    this.player1 = new Player('Player1', 'X');
    this.player2 = new Player('Player1', '0');

    this.reset();
  };

  this.didGameFinished = function (symbol) {
    const topRow =
      this.screen[0][0] === symbol &&
      this.screen[0][1] === symbol &&
      this.screen[0][2] === symbol;
    const middleRow =
      this.screen[1][0] === symbol &&
      this.screen[1][1] === symbol &&
      this.screen[1][2] === symbol;
    const bottomRow =
      this.screen[2][0] === symbol &&
      this.screen[2][1] === symbol &&
      this.screen[2][2] === symbol;

    const leftColumn =
      this.screen[0][0] === symbol &&
      this.screen[0][1] === symbol &&
      this.screen[0][2] === symbol;
    const middleColumn =
      this.screen[1][0] === symbol &&
      this.screen[1][1] === symbol &&
      this.screen[1][2] === symbol;
    const rightColumn =
      this.screen[0][2] === symbol &&
      this.screen[1][2] === symbol &&
      this.screen[2][2] === symbol;

    const leftRightDiagonal =
      this.screen[0][0] === symbol &&
      (this.screen[1][1] === symbol) & (this.screen[2][2] === symbol);
    const rightLeftDiagonal =
      this.screen[0][2] === symbol &&
      (this.screen[1][1] === symbol) & (this.screen[2][0] === symbol);

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

    return winnerPositions.every((w) => w);
  };

  this.getWinner = function () {
    if (this.didGameFinished(player1.symbol)) {
      alert(`${player1.id}`);
    } else {
      alert(`${player2.id}`);
    }
  };
}
