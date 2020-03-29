import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = props => {
  const singlePlayerClick = event => {
    const link = document.querySelector('.singleplayer.item');
    link.classList.add('active');
  };

  const multiPlayerClick = event => {
    const link = document.querySelector('.multiplayer.item');
    link.classList.add('active');
  };

  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        <i className="reddit icon"></i>The subreddit Game
      </Link>
      {/* {props.multiplayer.currentGame && (
        <div className="item">
          Current Game: {props.multiplayer.currentGame}
        </div>
      )} */}
      <div className="right menu">
        <Link
          to="/singleplayer"
          onClick={singlePlayerClick}
          className="singleplayer item"
        >
          Singleplayer
        </Link>
        <Link
          to="/multiplayer"
          onClick={multiPlayerClick}
          className="multiplayer item"
        >
          Multiplayer
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { multiplayer: state.multiplayer };
};

export default connect(mapStateToProps, {})(Header);
