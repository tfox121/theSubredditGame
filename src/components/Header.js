import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = props => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Subreddit Game
      </Link>
      {props.multiplayer.currentGame && (
        <Link
          to={`/multiplayer/join/${props.multiplayer.currentGame}`}
          className="item"
        >
          Current Game: {props.multiplayer.currentGame}
        </Link>
      )}
      <div className="right menu">
        <Link to="/singleplayer" className="item">
          Singleplayer
        </Link>
        <Link to="/multiplayer" className="item">
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
