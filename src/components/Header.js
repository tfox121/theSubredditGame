import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Subreddit Game
      </Link>
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

export default Header;
