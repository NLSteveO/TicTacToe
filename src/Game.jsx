/* eslint-disable
  react/prop-types,
  react/jsx-no-bind,
  no-use-before-define,
*/
import React from 'react';
import Board from './Board.jsx';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      reverse: false,
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const row = Math.floor(i / 3) + 1;
    const column = i % 3 + 1;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState((prevState) => ({
      history: history.concat([{
        squares,
        column,
        row,
      }]),
      stepNumber: history.length,
      xIsNext: !prevState.xIsNext,
    }));
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  reverseMoves() {
    this.setState((prevState) => ({
      reverse: !prevState.reverse,
    }));
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let moves = history.map((step, move) => {
      const position = `(${step.column}, ${step.row})`;
      const bold = move === this.state.stepNumber;
      const desc = move
        ? `Go to move #${move} ${position}`
        : 'Go to game start';
      const text = bold
        ? <strong>{desc}</strong>
        : desc;
      const key = `${step.column}-${step.row}`;
      return (
        <li key={key}>
          <button type="button" onClick={() => this.jumpTo(move)}>{text}</button>
        </li>
      );
    });

    if (this.state.reverse) {
      moves = moves.reverse();
    }
    const reverseButton = <button type="button" onClick={() => this.reverseMoves()}>Reverse Order</button>;

    let status;
    if (winner) {
      status = `Winner: ${current.squares[winner[0]]}`;
    }
    else if (!winner && this.state.stepNumber === 9) {
      status = <strong>TIE!!!</strong>;
    }
    else {
      status = `Next player: ${(this.state.xIsNext ? 'X' : 'O')}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            winner={winner}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>{reverseButton}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}
