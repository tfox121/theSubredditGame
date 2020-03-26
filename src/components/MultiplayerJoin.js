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
      <div>
        <MultiplayerJoinForm
          onSubmit={this.onSubmit}
          initialValues={{ gameId: this.props.match.params.id }}
        />
      </div>
    );
  }
}

export default connect(null, { fetchMultiplayerGame, joinMultiplayerGame })(
  MultiplayerJoin
);
