import React from 'react';
import { Field, reduxForm } from 'redux-form';

class MultiplayerJoinForm extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <h3>Join</h3>
        <Field
          name="gameId"
          component={this.renderInput}
          label="Enter game ID"
        />
        <Field name="name" component={this.renderInput} label="Enter name" />
        <button className="ui button primary">Join</button>
      </form>
    );
  }
}

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

export default reduxForm({
  form: 'multiplayerJoinForm',
  validate
})(MultiplayerJoinForm);
