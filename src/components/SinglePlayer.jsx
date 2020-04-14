import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import multiplayer from '../api/multiplayer';
import guesses from '../api/guesses';

import GuessBlock from './GuessBlock';
import SubredditBlock from './SubredditBlock';
import RandomButtonBlock from './RandomButtonBlock';
import ResultBlock from './ResultBlock';

const SinglePlayer = (props) => {
  useEffect(() => {
    const singleplayerLink = document.querySelector('.singleplayer.item');
    const multiplayerLink = document.querySelector('.multiplayer.item');
    singleplayerLink.classList.add('active');
    multiplayerLink.classList.remove('active');
  }, []);

  const [subredditInfo, setSubredditInfo] = useState({});
  const [guessNum, setGuessNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const clearState = () => {
    setSubredditInfo({});
    setGuessNum(0);
    setLoading(false);
    setError(false);
  };

  const randomSubGenerator = async (formValues) => {
    if (guessNum !== 0 || subredditInfo.display_name || error) {
      clearState();
    }
    setLoading(true);
    try {
      const response = await multiplayer.get(`/generate/${formValues.nsfw}`);
      setSubredditInfo(response.data);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  const onGuessSubmit = (num) => {
    setGuessNum(num);
    guesses.post('/', {
      subredditName: subredditInfo.display_name,
      nsfw: subredditInfo.over18,
      guess: num,
      subscribers: subredditInfo.subscribers,
      clientId: props.clientId,
    });
  };


  const loadingRender = () => {
    if (loading) {
      return (
        <div className="ui vertical segment">
          <div className="ui active loader" />
          <p>
            <br />
          </p>
        </div>
      );
    }
    return null;
  };

  const errorRender = () => {
    if (error) {
      return (
        <div className="ui vertical segment">
          <h2 className="ui header">Uh oh, there&apos;s been a problem!</h2>
        </div>
      );
    }
    return null;
  };

  const guessBlockRender = () => {
    if (subredditInfo.display_name) {
      return (
        <div className="ui vertical segment">
          <SubredditBlock subredditInfo={subredditInfo} />
          <GuessBlock onSubmit={onGuessSubmit} />
        </div>
      );
    }
    return null;
  };

  const resultBlockRender = () => {
    if (guessNum > 0) {
      return <ResultBlock subredditInfo={subredditInfo} guessNum={guessNum} />;
    }
    return null;
  };

  const newSubredditButtonRender = () => {
    if (guessNum > 0) {
      return <RandomButtonBlock onSubmit={randomSubGenerator} />;
    }
    return null;
  };

  return (
    <>
      <RandomButtonBlock onSubmit={randomSubGenerator} />
      {loadingRender()}
      {errorRender()}
      {guessBlockRender()}
      {resultBlockRender()}
      {newSubredditButtonRender()}
    </>
  );
};

const mapStateToProps = (state) => ({
  clientId: state.multiplayer.clientId,
});

export default connect(mapStateToProps)(SinglePlayer);
