import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';

import './MultiplayerCreateForm.css';

import NsfwSlider from './NsfwSlider';

const MultiplayerCreateForm = props => {
  const [nsfw, setNsfw] = useState(0);

  const onChange = value => {
    setNsfw(value);
  };

  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input
          {...input}
          type="number"
          min="1"
          max="50"
          step="1"
          autoComplete="off"
          required
        />
        {renderError(meta)}
      </div>
    );
  };

  const onSubmit = formValues => {
    console.log(formValues);
    props.onSubmit({ ...formValues, nsfw });
  };

  const handleClick = event => {
    if (event) {
      event.preventDefault();
      const hiddenText = document.querySelector('.hidden.content');
      const button = document.querySelector('.ui.button');
      hiddenText.style.display = 'block';
      button.classList.add('animated');
      setTimeout(() => {
        hiddenText.style.display = 'none';
        button.classList.remove('animated');
      }, 4000);
    }
  };

  return (
    <form onSubmit={props.handleSubmit(onSubmit)} className="ui form error">
      <h3>Create a new game</h3>
      <Field name="rounds" component={renderInput} label="How many rounds?" />
      <NsfwSlider nsfw={nsfw} onChange={onChange} />
      <button
        onMouseDown={handleClick}
        onKeyUp={e => {
          if (e.keyCode === 13 || e.keyCode === 32) {
            handleClick();
          }
        }}
        className="ui button"
      >
        <div className="visible content">Create</div>
        <div className="hidden content create">Building...</div>
      </button>
    </form>
  );
};

// const validate = formValues => {
//   const errors = {};

//   if (!formValues.rounds) {
//     errors.name = 'You have to play at least one round...';
//   }

//   return errors;
// };

export default reduxForm({
  form: 'multiplayerCreateForm' /* ,
  validate */
})(MultiplayerCreateForm);
