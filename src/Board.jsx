import PropTypes from 'prop-types';
import React from 'react';
import Square from './Square.jsx';

class Board extends React.Component {
  handleClick = (e) => {
    const index = Number(e.target.dataset.index);
    this.props.onClick(index);
  };

  renderSquare(i) {
    const winner = this.props.winner
      ? this.props.winner.indexOf(i) !== -1
      : false;
    return (
      <Square
        winner={winner}
        value={this.props.squares[i]}
        index={i}
        onClick={this.handleClick}
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

Board.propTypes = {
  onClick: PropTypes.func.isRequired,
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  winner: PropTypes.arrayOf(PropTypes.number),
};
Board.defaultProps = {
  winner: false,
};
export default Board;
