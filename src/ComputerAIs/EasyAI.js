class EasyAI {
  getMove(squares) {
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

export default EasyAI;
