import React, { useState } from 'react';
import { reduxForm } from 'redux-form';

import './RandomButtonBlock.css';

import NsfwSlider from './NsfwSlider';

const RandomButtonBlock = (props) => {
  const [nsfw, setNsfw] = useState(0);

  const onSubmit = (formValues) => {
    props.onSubmit({ ...formValues, nsfw });
  };

  const onChange = (value) => {
    setNsfw(value);
  };

  return (
    <div className="ui basic segment random-button-block">
      <form onSubmit={props.handleSubmit(onSubmit)} className="ui form">
        <div className="field">
          <button className="ui animated button" tabIndex="0" type="submit">
            <div className="visible content">generate subreddit</div>
            <div className="hidden content">woooooooo!</div>
          </button>
          <NsfwSlider nsfw={nsfw} width="6" onChange={onChange} />
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'singeplayerGenerateForm',
})(RandomButtonBlock);
