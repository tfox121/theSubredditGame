import React, { useEffect, useState } from 'react';

import './SinglePlayer.css';
import { axiosDefault as multiplayer } from '../api/multiplayer';

import ClearButton from './ClearButton';
import GuessBlock from './GuessBlock';
import SubredditBlock from './SubredditBlock';
import RandomButtonBlock from './RandomButtonBlock';
import ResultBlock from './ResultBlock';

const SinglePlayer = () => {
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

  const randomSubGenerator = async formValues => {
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

  const onGuessSubmit = num => {
    setGuessNum(num);
  };

  const clearState = () => {
    setSubredditInfo({});
    setGuessNum(0);
    setLoading(false);
    setError(false);
  };

  const loadingRender = () => {
    if (loading) {
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

  const errorRender = () => {
    if (error) {
      return (
        <div className="ui vertical segment">
          <h2 className="ui header">Uh oh, there's been a problem!</h2>
        </div>
      );
    }
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
  };

  const resultBlockRender = () => {
    if (guessNum > 0) {
      return <ResultBlock subredditInfo={subredditInfo} guessNum={guessNum} />;
    }
  };

  const clearButtonRender = () => {
    if (guessNum > 0) {
      return <ClearButton clearState={clearState} />;
    }
  };

  return (
    <>
      <RandomButtonBlock onSubmit={randomSubGenerator} />
      {loadingRender()}
      {loadingRender()}
      {errorRender()}
      {guessBlockRender()}
      {resultBlockRender()}
      {clearButtonRender()}
    </>
  );
};

export default SinglePlayer;
