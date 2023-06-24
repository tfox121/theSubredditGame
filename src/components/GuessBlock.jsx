/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import './GuessBlock.css';

const GuessBlock = (props) => {
  const [guessNum, setGuessNum] = useState('');

  const onFormSubmit = (event) => {
    event.preventDefault();

    props.onSubmit(guessNum);
  };

  return (
    <div className="ui guess-block">
      <form onSubmit={onFormSubmit} className="ui form">
        <div className="field">
          <label htmlFor="guesses">
            how many subscribers do you think it has?
          </label>
          <input
            id="guesses"
            type="number"
            min="0"
            step="1"
            placeholder=""
            value={guessNum}
            onChange={(e) => {
              setGuessNum(e.target.value);
            }}
            required
          />
          <button className="ui button submit" type="submit">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuessBlock;
