import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

const FrontPage = () => {
  useEffect(() => {
    const singleplayerLink = document.querySelector('.singleplayer.item');
    const multiplayerLink = document.querySelector('.multiplayer.item');
    multiplayerLink.classList.remove('active');
    singleplayerLink.classList.remove('active');
  }, []);

  return (
    <div className="ui list">
      <div className="item">
        <Link to="/singleplayer" className="ui right labeled icon button">
          <i className="right arrow icon"></i>
          Single Player
        </Link>
      </div>
      <div className="item">
        <Link to="/multiplayer" className="ui right labeled icon button">
          <i className="right arrow icon"></i>
          Multiplayer
        </Link>
      </div>
    </div>
  );
};

export default FrontPage;
