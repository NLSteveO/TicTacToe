import React from 'react';
import Board from './Board.jsx';
import isEqual from 'lodash.isequal';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        column: 0,
        row: 0,
      }],
      reverse: false,
      stepNumber: 0,
      winner: null,
      xIsNext: true,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const winner = this.calculateWinner(this.state.stepNumber);
    if (!isEqual(prevState.winner, winner)) {
      this.setState(() => ({
        winner,
      }));
    }
    if (!this.state.xIsNext && !winner && !this.state.paused) {
      this.computersTurn();
    }
  }

  computersTurn() {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = this.state.winner;
    if (winner || (!winner && this.state.stepNumber === 9)) {
      return;
    }
    const emptySquares = [];
    squares.forEach((square, index) => {
      if (!square) {
        emptySquares.push(index);
      }
    });
    const randomNum = Math.floor(Math.random() * Math.floor(emptySquares.length));
    const computersSquare = emptySquares[randomNum];

    const row = Math.floor(computersSquare / 3) + 1;
    const column = computersSquare % 3 + 1;
    squares[computersSquare] = this.state.xIsNext ? 'X' : 'O';
    setTimeout(() => this.setState((prevState) => {
      const previousHistory = prevState.history.slice(0, prevState.stepNumber + 1);
      return {
        history: previousHistory.concat([{
          squares,
          column,
          row,
        }]),
        stepNumber: previousHistory.length,
        xIsNext: !prevState.xIsNext,
      };
    }), 500);
  }

  handleClick = (i) => {
    if (!this.state.xIsNext) {
      return;
    }
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.state.winner || squares[i]) {
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
  };

  jumpTo = (e) => {
    if (
      (!this.state.xIsNext && !this.state.winner)
      && !(this.state.stepNumber < (this.state.history.length - 1))
      && !(!this.state.winner && this.state.stepNumber === 9)
    ) {
      return;
    }
    const step = Number(e.currentTarget.dataset.move);
    this.setState({
      paused: true,
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  };

  reverseMoves = () => {
    this.setState((prevState) => ({
      reverse: !prevState.reverse,
    }));
  };

  pauseComputer = () => {
    this.setState((prevState) => ({
      paused: !prevState.paused,
    }));
  };

  calculateWinner(stepNumber) {
    const history = this.state.history;
    const current = history[stepNumber];
    const squares = current.squares.slice();
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

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.state.winner;

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
          <button type="button" data-move={move} onClick={this.jumpTo}>{text}</button>
        </li>
      );
    });

    if (this.state.reverse) {
      moves = moves.reverse();
    }
    const reverseButton = <button type="button" onClick={this.reverseMoves}>Reverse Order</button>;
    const pauseButton = (
      <button type="button" onClick={this.pauseComputer}>
        {this.state.paused ? 'Continue' : 'Pause'}
      </button>
    );

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
            onClick={this.handleClick}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>{reverseButton}</div>
          <ol>{moves}</ol>
          <div>{pauseButton}</div>
        </div>
      </div>
    );
  }
}

export default Game;
