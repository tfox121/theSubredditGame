import React from "react";

import './GuessBlock.css';

class GuessBlock extends React.Component {
  state = { guessNum: 0 };

  onFormSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.guessNum);
  };

  render() {
    return (
      <div className="ui guess-block">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>How many subscribers do you think it has?</label>
            <input
              type="number"
              min="0"
              value={this.state.guessNum}
              onChange={e => {
                this.setState({ guessNum: e.target.value });
              }}
              required
            />
            <button className="ui button submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default GuessBlock;
