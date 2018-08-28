/* eslint-disable
  react/prop-types,
  react/jsx-no-bind,
*/
import React from 'react';
import Square from './Square.jsx';

class Board extends React.Component {
  renderSquare(i) {
    const winner = this.props.winner
      ? this.props.winner.indexOf(i) !== -1
      : false;
    return (
      <Square
        winner={winner}
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

export default Board;
