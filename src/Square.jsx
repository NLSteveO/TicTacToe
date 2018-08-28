/* eslint-disable
  react/prop-types,
*/
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

export default Square;
