import React, { useEffect } from 'react';
import { Breakpoint } from 'react-socks';

import MultiplayerCreate from './MultiplayerCreate';
import MultiplayerJoin from './MultiplayerJoin';

import './Multiplayer.css';

const Multiplayer = props => {
  const { id } = props.match.params;

  useEffect(() => {
    const singleplayerLink = document.querySelector('.singleplayer.item');
    const multiplayerLink = document.querySelector('.multiplayer.item');
    multiplayerLink.classList.add('active');
    singleplayerLink.classList.remove('active');
  }, []);

  return (
    <div className="option-container">
      <Breakpoint medium up>
        <div className="ui center aligned basic segment vertical">
          <div className="ui two column very relaxed stackable grid">
            <div className="column">
              <MultiplayerCreate />
            </div>
            <div className="column">
              <MultiplayerJoin joinId={id} />
            </div>
          </div>
          <div className="ui vertical divider">Or</div>
        </div>
      </Breakpoint>
      <Breakpoint small down>
        <div className="ui center aligned basic segment horizontal">
          <MultiplayerCreate />
          <br />
          <div className="ui horizontal divider">Or</div>
          <MultiplayerJoin joinId={id} />
        </div>
      </Breakpoint>
    </div>
  );
};

// const TestComponent = () => {
//   useEffect(() => {
//     console.log('RENDERED');
//   }, []);
//   return <div>TEST</div>;
// };

export default Multiplayer;
