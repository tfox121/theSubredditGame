import React, { useState, useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { clearCurrentGame } from '../actions';
import './MultiplayerCreateForm.css';

import NsfwSlider from './NsfwSlider';

const MultiplayerCreateForm = props => {
  const [nsfw, setNsfw] = useState(0);
  const [disableButton, setDisableButton] = useState(false);
  const [buttonText, setButtonText] = useState('Create');

  const { currentGame } = props;
  useEffect(() => {
    let mounted = true;
    if (currentGame && mounted) {
      console.log('SETTING STATE');
      setButtonText('Created!');
      setTimeout(() => {
        setButtonText('Create');
        setDisableButton(false);
      }, 3800);
    }
    return () => {
      mounted = false;
      console.log('UNMOUNTED');
    };
  }, [currentGame]);

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
    setButtonText('Creating...');
    props.onSubmit({ ...formValues, nsfw });
    setDisableButton(true);
  };

  return (
    <form onSubmit={props.handleSubmit(onSubmit)} className="ui form error">
      <h3>Create a new game</h3>
      <Field name="rounds" component={renderInput} label="How many rounds?" />
      <NsfwSlider nsfw={nsfw} width="12" onChange={onChange} />
      <button className="ui button" disabled={disableButton}>
        <div className="visible content">{buttonText}</div>
      </button>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    currentGame: state.multiplayer.currentGame
  };
};

const form = reduxForm({
  form: 'multiplayerCreateForm'
})(MultiplayerCreateForm);

export default connect(mapStateToProps, { clearCurrentGame })(form);
