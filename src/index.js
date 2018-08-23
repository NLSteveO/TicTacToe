/* eslint-disable
  react/require-optimization,
  react/prefer-stateless-function,
  react/prop-types,
  react/button-has-type,
  react/no-access-state-in-setstate,
  react/no-multi-comp,
  react/no-unused-state,
  react/jsx-no-bind,
  react/no-array-index-key,
  class-methods-use-this,
  node/no-unsupported-features,
  object-shorthand,
  prefer-template,
  no-use-before-define,
  no-warning-comments,
  no-unused-vars
*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const rows = [];
    for (let i = 0; i <= 6; i += 3) {
      const squares = [];
      for (let j = i; j < i + 3; j++) {
        squares.push(this.renderSquare(j));
      }
      rows.push(
        <div
          key={i}
          className="board-row"
        >
          {squares}
        </div>
      );
    }
    return (
      <div>
        {rows}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
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
    this.setState({
      history: history.concat([{
        squares: squares,
        column: column,
        row: row,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const position = '(' + step.column + ', ' + step.row + ')';
      const bold = move === this.state.stepNumber;
      const desc = move
        ? 'Go to move #' + move + ' ' + position
        : 'Go to game start';
      const text = bold
        ? <strong>{desc}</strong>
        : desc;
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{text}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

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
      return squares[a];
    }
  }
  return null;
}
