import React from "react";

import './RandomButtonBlock.css';

class RandomButtonBlock extends React.Component {
  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit()
  }

  render() {
    return (
      <div className="ui vertical segment random-button-block">
        <form onSubmit={this.onSubmit} className="ui form">
          <div className="field">
            <button className="ui animated button" tabIndex="0" type="submit">
                <div className="visible content">Generate subreddit</div>
                <div className="hidden content">
                  Woooooooo!
                </div>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default RandomButtonBlock;
