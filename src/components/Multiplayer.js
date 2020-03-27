import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchMultiplayerGames } from '../actions';

const Multiplayer = props => {
  // const { fetchMultiplayerGames } = props;
  // useEffect(() => {
  //   console.log('Fetching games');
  //   fetchMultiplayerGames();
  // }, []);

  return (
    <div className="ui list">
      <div className="item">
        <Link to="/multiplayer/new" className="ui right labeled icon button">
          <i className="right arrow icon"></i>
          New
        </Link>
      </div>
      <div className="item">
        <Link to="/multiplayer/join" className="ui right labeled icon button">
          <i className="right arrow icon"></i>
          Join
        </Link>
      </div>
    </div>
  );
};

export default connect(null, { fetchMultiplayerGames })(Multiplayer);
