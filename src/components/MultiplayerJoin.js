import React from 'react';
import { connect } from 'react-redux';

import MultiplayerJoinForm from './MultiplayerJoinForm';
import { fetchMultiplayerGame, joinMultiplayerGame } from '../actions';

class MultiplayerJoin extends React.Component {
  onSubmit = formValues => {
    this.props.joinMultiplayerGame(formValues.gameId, formValues.name);
  };
  render() {
    return (
      <>
        <MultiplayerJoinForm onSubmit={this.onSubmit} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentGame: state.multiplayer.currentGame
  };
};

export default connect(mapStateToProps, {
  fetchMultiplayerGame,
  joinMultiplayerGame
})(MultiplayerJoin);
