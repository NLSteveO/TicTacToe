import PropTypes from 'prop-types';
import React from 'react';

function Square(props) {
  const className = props.winner
    ? 'winner-square'
    : 'square';
  return (
    <button
      type="button"
      className={className}
      data-index={props.index}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

Square.propTypes = {
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string,
  winner: PropTypes.bool.isRequired,
};
Square.defaultProps = {
  value: null,
};

export default Square;
