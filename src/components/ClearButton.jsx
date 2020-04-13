import React from 'react';

const ClearButton = ({ clearState }) => {
  const onClick = (event) => {
    event.preventDefault();

    clearState();
  };

  return (
    <button
      onClick={onClick}
      className="ui button clear-button"
      type="submit"
    >
      clear
    </button>
  );
};

export default ClearButton;
