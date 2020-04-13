import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
  const singlePlayerClick = () => {
    const link = document.querySelector('.singleplayer.item');
    link.classList.add('active');
  };

  const multiPlayerClick = () => {
    const link = document.querySelector('.multiplayer.item');
    link.classList.add('active');
  };

  return (
    <>
      <Link to="/">
        <h1 className="ui header top">the subreddit game</h1>
      </Link>
      <div className="ui secondary two item pointing menu">
        <Link
          to="/singleplayer"
          onClick={singlePlayerClick}
          className="singleplayer item"
        >
          singleplayer
        </Link>
        <Link
          to="/multiplayer"
          onClick={multiPlayerClick}
          className="multiplayer item"
        >
          multiplayer
        </Link>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({ multiplayer: state.multiplayer });

export default connect(mapStateToProps, {})(Header);
