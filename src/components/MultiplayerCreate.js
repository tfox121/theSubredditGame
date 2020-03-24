import React from 'react';
import { connect } from 'react-redux';

import { createMultiplayerGame } from '../actions';

class MultiplayerCreate extends React.Component {
  onClick = async () => {
    this.props.createMultiplayerGame();
  };

  render() {
    return (
      <div>
        <h3>Create</h3>
        <button className="ui button primary" onClick={this.onClick}>
          New Game
        </button>
        <div>{this.props.currentGame}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentGame: state.multiplayer.currentGame
  };
};

export default connect(mapStateToProps, { createMultiplayerGame })(
  MultiplayerCreate
);
