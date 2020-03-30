import React, { useState } from 'react';

import './GuessBlock.css';

const GuessBlock = props => {
  const [guessNum, setGuessNum] = useState('');

  const onFormSubmit = event => {
    event.preventDefault();

    props.onSubmit(guessNum);
  };

  return (
    <div className="ui guess-block">
      <form onSubmit={onFormSubmit} className="ui form">
        <div className="field">
          <label>How many subscribers do you think it has?</label>
          <input
            type="number"
            min="0"
            placeholder=""
            value={guessNum}
            onChange={e => {
              setGuessNum(e.target.value);
            }}
            required
          />
          <button className="ui button submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuessBlock;
