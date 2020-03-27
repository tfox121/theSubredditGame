import React from 'react';
import { connect } from 'react-redux';

import { createMultiplayerGame } from '../actions';

import MultiplayerCreateForm from './MultiplayerCreateForm';

class MultiplayerCreate extends React.Component {
  onSubmit = async formValues => {
    this.props.createMultiplayerGame(formValues);
  };

  render() {
    return (
      <div>
        <MultiplayerCreateForm
          onSubmit={this.onSubmit}
          initialValues={{ rounds: 5 }}
        />
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
