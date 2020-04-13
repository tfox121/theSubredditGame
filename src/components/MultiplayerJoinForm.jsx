import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { change, Field, reduxForm } from 'redux-form';

import './MultiplayerJoinForm.css';

// const renderError = ({ error, touched }) => {
//   if (touched && error) {
//     return <div className="ui error message">{error}</div>;
//   }
// };

const renderInput = ({ input, label, meta }) => {
  const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
  return (
    <div className={className}>
      <label htmlFor={label}>{label}</label>
      <input id={label} {...input} autoComplete="off" required />
      {/* {renderError(meta)} */}
    </div>
  );
};

const MultiplayerJoinForm = (props) => {
  const { currentGame, handleSubmit, errorMsg } = props;

  useEffect(() => {
    props.change('gameId', currentGame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGame]);

  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };

  const handleClick = (event) => {
    if (event) {
      event.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ui form error">
      <h3>join a game</h3>
      <Field name="gameId" component={renderInput} label="enter game ID" />
      <Field name="name" component={renderInput} label="your name!" />
      <div id="error-msg">{errorMsg}</div>
      <button
        type="submit"
        onMouseDown={handleClick}
        onKeyUp={(e) => {
          if (e.keyCode === 13 || e.keyCode === 32) {
            handleClick();
          }
        }}
        className="ui animated button"
      >
        <div className="visible content">go!</div>
        <div className="hidden content">
          <i className="angle double right icon" />
        </div>
      </button>
    </form>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.gameId) {
    errors.gameId = 'You must enter a game ID';
  }

  if (!formValues.name) {
    errors.name = 'You must enter a name';
  }

  return errors;
};

const mapStateToProps = (state) => ({
  currentGame: state.multiplayer.currentGame,
  errorMsg: state.multiplayer.error,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ change }, dispatch);

const form = reduxForm({
  form: 'multiplayerJoinForm',
  validate,
})(MultiplayerJoinForm);

export default connect(mapStateToProps, mapDispatchToProps)(form);
