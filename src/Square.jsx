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
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string,
  winner: PropTypes.bool.isRequired,
};
Square.defaultProps = {
  value: null,
};

export default Square;
