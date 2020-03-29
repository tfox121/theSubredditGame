import React from 'react';

import './SinglePlayer.css';

// import reddit from '../api/reddit';

import ClearButton from './ClearButton';
import GuessBlock from './GuessBlock';
import SubredditBlock from './SubredditBlock';
import RandomButtonBlock from './RandomButtonBlock';
import ResultBlock from './ResultBlock';

class SinglePlayer extends React.Component {
  componentDidMount() {
    const singleplayerLink = document.querySelector('.singleplayer.item');
    const multiplayerLink = document.querySelector('.multiplayer.item');
    singleplayerLink.classList.add('active');
    multiplayerLink.classList.remove('active');
  }
  state = {
    subredditInfo: {},
    guessNum: 0,
    loading: false,
    error: false,
    nsfw: 'randnsfw'
  };

  randomSubGenerator = async () => {
    if (
      this.state.guessNum !== 0 ||
      this.state.subredditInfo.display_name ||
      this.state.error
    ) {
      this.clearState();
    }
    this.setState({ loading: true });
    try {
      // const response = await reddit.get('/r/random/about.json');
      // this.setState({ subredditInfo: response.data.data, loading: false });
    } catch (err) {
      this.setState({ error: true, loading: false });
    }
  };

  onGuessSubmit = num => {
    this.setState({ guessNum: num });
  };

  clearState = () => {
    this.setState({
      subredditInfo: {},
      guessNum: 0,
      loading: false,
      error: false
    });
  };

  loadingRender = () => {
    if (this.state.loading) {
      return (
        <div className="ui vertical segment">
          <div className="ui active inverted loader"></div>
          <p>
            <br />
          </p>
        </div>
      );
    }
  };

  errorRender = () => {
    if (this.state.error) {
      return (
        <div className="ui vertical segment">
          <h2 className="ui header">Uh oh, there's been a problem!</h2>
        </div>
      );
    }
  };

  guessBlockRender = () => {
    if (this.state.subredditInfo.display_name) {
      return (
        <div className="ui vertical segment">
          <SubredditBlock subredditInfo={this.state.subredditInfo} />
          <GuessBlock onSubmit={this.onGuessSubmit} />
        </div>
      );
    }
  };

  resultBlockRender = () => {
    if (this.state.guessNum > 0) {
      return (
        <ResultBlock
          subredditInfo={this.state.subredditInfo}
          guessNum={this.state.guessNum}
        />
      );
    }
  };

  clearButtonRender = () => {
    if (this.state.guessNum > 0) {
      return <ClearButton clearState={this.clearState} />;
    }
  };

  render() {
    return (
      <div className="ui container">
        <div className="ui app rasied segment">
          <h1 className="ui header">The subreddit Game!</h1>
          <RandomButtonBlock onSubmit={this.randomSubGenerator} />
          {this.loadingRender()}
          {this.loadingRender()}
          {this.errorRender()}
          {this.guessBlockRender()}
          {this.resultBlockRender()}
          {this.clearButtonRender()}
        </div>
      </div>
    );
  }
}

export default SinglePlayer;
