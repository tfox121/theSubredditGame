import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Header.css';

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
    <>
      <h1 className="ui header top">The subreddit Game</h1>
      {/* {props.multiplayer.currentGame && (
        <div className="item">
          Current Game: {props.multiplayer.currentGame}
        </div>
      )} */}

      <div className="ui secondary two item pointing menu inverted">
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
    </>
  );
};

const mapStateToProps = state => {
  return { multiplayer: state.multiplayer };
};

export default connect(mapStateToProps, {})(Header);
