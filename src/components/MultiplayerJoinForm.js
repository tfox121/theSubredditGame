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
      <label>{label}</label>
      <input {...input} autoComplete="off" required />
      {/* {renderError(meta)} */}
    </div>
  );
};

const MultiplayerJoinForm = props => {
  const { currentGame, change } = props;

  useEffect(() => {
    if (currentGame) {
      change('gameId', currentGame);
    }
  }, [currentGame]);

  const onSubmit = formValues => {
    props.onSubmit(formValues);
  };

  const handleClick = event => {
    if (event) {
      event.preventDefault();
    }
  };

  console.log(props.currentGame);
  return (
    <form onSubmit={props.handleSubmit(onSubmit)} className="ui form error">
      <h3>Join a game</h3>
      <Field name="gameId" component={renderInput} label="Enter game ID" />
      <Field name="name" component={renderInput} label="Your name!" />
      <div id="error-msg">{props.errorMsg}</div>
      <button
        onMouseDown={handleClick}
        onKeyUp={e => {
          if (e.keyCode === 13 || e.keyCode === 32) {
            handleClick();
          }
        }}
        className="ui animated button"
      >
        <div className="visible content">Go!</div>
        <div className="hidden content">
          <i className="angle double right icon"></i>
        </div>
      </button>
    </form>
  );
};

const validate = formValues => {
  const errors = {};

  if (!formValues.gameId) {
    errors.gameId = 'You must enter a game ID';
  }

  if (!formValues.name) {
    errors.name = 'You must enter a name';
  }

  return errors;
};

const mapStateToProps = state => {
  return {
    currentGame: state.multiplayer.currentGame,
    errorMsg: state.multiplayer.error
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ change }, dispatch);
};

const form = reduxForm({
  form: 'multiplayerJoinForm',
  validate
})(MultiplayerJoinForm);

export default connect(mapStateToProps, mapDispatchToProps)(form);
