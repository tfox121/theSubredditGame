import React from 'react';
import { reduxForm } from 'redux-form';

import './RandomButtonBlock.css';

const RandomButtonBlock = ({ handleSubmit, onSubmit }) => {
  const nsfwSubmitHandler = (formValues) => {
    onSubmit({ ...formValues, nsfw: 0 });
  };

  return (
    <div className="ui basic segment random-button-block">
      <form onSubmit={handleSubmit(nsfwSubmitHandler)} className="ui form">
        <div className="field">
          <button className="ui animated button generate-sub" tabIndex="0" type="submit">
            <div className="visible content">generate subreddit</div>
            <div className="hidden content">woooooooo!</div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'singeplayerGenerateForm',
})(RandomButtonBlock);
