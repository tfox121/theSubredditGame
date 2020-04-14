import React, { useState, useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { clearCurrentGame } from '../../actions';
import './MultiplayerCreateForm.css';


const MultiplayerCreateForm = (props) => {
  const [disableButton, setDisableButton] = useState(false);
  const [buttonText, setButtonText] = useState('create');

  const { currentGame, handleSubmit } = props;
  useEffect(() => {
    let mounted = true;
    if (currentGame && mounted) {
      console.log('SETTING STATE');
      setButtonText('created!');
      setTimeout(() => {
        setButtonText('create');
        setDisableButton(false);
      }, 3800);
    }
    return () => {
      mounted = false;
      console.log('UNMOUNTED');
    };
  }, [currentGame]);

  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
    return null;
  };

  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label htmlFor="rounds">{label}</label>
        <input
          {...input}
          id="rounds"
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

  const onSubmit = (formValues) => {
    props.clearCurrentGame();
    setButtonText('Creating...');
    props.onSubmit({ ...formValues, nsfw: 0 });
    setDisableButton(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ui form error">
      <h3>create a new game</h3>
      <Field name="rounds" component={renderInput} label="how many rounds?" />
      <button type="submit" className="ui button" disabled={disableButton}>
        <div className="visible content">{buttonText}</div>
      </button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  currentGame: state.multiplayer.currentGame,
});

const form = reduxForm({
  form: 'multiplayerCreateForm',
})(MultiplayerCreateForm);

export default connect(mapStateToProps, { clearCurrentGame })(form);
