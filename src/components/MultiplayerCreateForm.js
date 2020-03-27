import React from 'react';
import { Field, reduxForm } from 'redux-form';

class MultiplayerCreateForm extends React.Component {
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

  renderRadio = ({ input, label, meta }) => {
    return (
      <div className="inline field">
        <p>{label}</p>
        <br />
        <div class="ui toggle checkbox">
          <input
            type="checkbox"
            id="nsfw"
            class="hidden"
            name="nsfw"
            tabindex="0"
            {...input}
          />
          <label for="nsfw">NSFW</label>
        </div>
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
        <h3>Start a new game!</h3>
        <Field
          name="rounds"
          component={this.renderInput}
          label="How many rounds shall we play?"
        />
        <Field
          name="nsfw"
          component={this.renderRadio}
          label="Feeling brave?"
        />
        <button className="ui button primary">New Game</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.rounds) {
    errors.name = 'You have to play at least one round...';
  }

  return errors;
};

export default reduxForm({
  form: 'multiplayerCreateForm',
  validate
})(MultiplayerCreateForm);
