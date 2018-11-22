class HardAI {
  constructor() {
    this._corner = false;
    this._centre = false;
    this._myCorner = -1;
  }

  getMove(squares) {
    if (this._isFirstTurn(squares)) {
      if (this._isCentreFirstMove(squares)) {
        this._centre = true;
        const emptyCorner = this._getRandomEmptyCorner(squares);
        return emptyCorner === -1 ? this._randomMove(squares) : emptyCorner;
      }
      else {
        if (this._isCornerFirstMove(squares)) {
          this._corner = true;
        }
        return 4;
      }
    }
    else {
      const blockingMove = this._shouldWinOrBlock(squares, 'X');
      const winningMove = this._shouldWinOrBlock(squares, 'O');
      if (this._corner) {
        if (winningMove >= 0) {
          return winningMove;
        }
        else if (blockingMove >= 0) {
          return blockingMove;
        }
        else {
          const emptyEdge = this._getRandomEmptyEdge(squares);
          return emptyEdge === -1 ? this._randomMove(squares) : emptyEdge;
        }
      }
      else if (this._centre) {
        if (winningMove >= 0) {
          return winningMove;
        }
        else if (blockingMove >= 0) {
          return blockingMove;
        }
        else {
          const emptyCorner = this._getRandomEmptyCorner(squares);
          return emptyCorner === -1 ? this._randomMove(squares) : emptyCorner;
        }
      }
      else {
        const blockingMove = this._shouldWinOrBlock(squares, 'X');
        const winningMove = this._shouldWinOrBlock(squares, 'O');
        const takeCorner = this._adjacentEdgeIsSecondMove(squares);
        if (this._oppositeEdgeIsSecondMove(squares)) {
          const adjacentEdgeIsThirdMove = this._adjacentEdgeIsThirdMove(squares);
          if (adjacentEdgeIsThirdMove > 0) {
            return adjacentEdgeIsThirdMove;
          }
          else {
            if (winningMove >= 0) {
              return winningMove;
            }
            else if (blockingMove >= 0) {
              return blockingMove;
            }
            else {
              const emptyCorner = this._getRandomEmptyCorner(squares);
              return emptyCorner === -1 ? this._randomMove(squares) : emptyCorner;
            }
          }
        }
        else if (takeCorner >= 0) {
          return takeCorner;
        }
        else {
          if (winningMove >= 0) {
            return winningMove;
          }
          else if (blockingMove >= 0) {
            return blockingMove;
          }
          else {
            return this._randomMove(squares);
          }
        }
      }
    }
  }

  _getRandomEmptyCorner(squares) {
    const corners = [0, 2, 6, 8].filter((corner) => {
      return squares[corner] === null;
    });

    return corners.length === 0
      ? -1 : corners[Math.floor(Math.random() * Math.floor(corners.length))];
  }

  _getRandomEmptyEdge(squares) {
    const edges = [1, 3, 5, 7].filter((edge) => {
      return squares[edge] === null;
    });

    return edges.length === 0
      ? -1 : edges[Math.floor(Math.random() * Math.floor(edges.length))];
  }

  _isFirstTurn(squares) {
    let emptySquares = 0;
    squares.forEach((square) => {
      if (square !== null) {
        emptySquares++;
      }
    });
    return emptySquares > 1 ? false : true;
  }

  _isCornerFirstMove(squares) {
    return (
      squares[0] !== null ||
      squares[2] !== null ||
      squares[6] !== null ||
      squares[8] !== null
    );
  }

  _isCentreFirstMove(squares) {
    return squares[4] !== null;
  }

  _shouldWinOrBlock(squares, player) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] === player && squares[b] === player && squares[c] === null) {
        return c;
      }
      else if (squares[b] === player && squares[c] === player && squares[a] === null) {
        return a;
      }
      else if (squares[a] === player && squares[c] === player && squares[b] === null) {
        return b;
      }
    }
    return -1
  }

  _oppositeEdgeIsSecondMove(squares) {
    return (
      (squares[3] === 'X' && squares[5] === 'X') ||
      (squares[1] === 'X' && squares[7] === 'X')
    );
  }

  _adjacentEdgeIsThirdMove(squares) {
    const cornerMoves = {
      0: [1, 3, 2, 6, 7, 6, 5, 2],
      2: [1, 5, 0, 8, 7, 8, 3, 0],
      6: [3, 7, 8, 0, 1, 0, 5, 8],
      8: [5, 7, 6, 2, 1, 2, 3, 6]
    };
    const adjEdges = cornerMoves[this._myCorner];
    if (this._myCorner === -1) {
      return -1;
    }
    else if (squares[3] === 'X' && squares[4] === 'O' && squares[5] === 'X') {
      if (squares[adjEdges[0]] === 'X' && squares[adjEdges[1]] === 'X') {
        return squares[adjEdges[2]] ? -1 : adjEdges[2];
      }
      else if (squares[adjEdges[4]] === 'X') {
        return squares[adjEdges[5]] ? -1 : adjEdges[5];
      }
      else {
        return -1
      }
    }
    else {
      if (squares[adjEdges[0]] === 'X' && squares[adjEdges[1]] === 'X') {
        return squares[adjEdges[3]] ? -1 : adjEdges[3];
      }
      else if (squares[adjEdges[6]] === 'X') {
        return squares[adjEdges[7]] ? -1 : adjEdges[7];
      }
      else {
        return -1
      }
    }
  }

  _adjacentEdgeIsSecondMove(squares) {
    const adjacentEdges = [
      [1, 3, 0],
      [1, 5, 2],
      [3, 7, 6],
      [5, 7, 8]
    ];
    for (let i = 0; i < adjacentEdges.length; i++) {
      const [a, b, c] = adjacentEdges[i];
      if (squares[a] === 'X' && squares[b] === 'X' && squares[c] === null) {
        return c;
      }
    }
    return -1;
  }

  _randomMove(squares) {
    const emptySquares = [];
    squares.forEach((square, index) => {
      if (!square) {
        emptySquares.push(index);
      }
    });
    const randomNum = Math.floor(Math.random() * Math.floor(emptySquares.length));
    return emptySquares[randomNum];
  }
}

export default HardAI;
