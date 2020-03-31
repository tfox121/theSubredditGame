import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { source } from '../api/multiplayer';
import { joinMultiplayerGame } from '../actions';

import MultiplayerJoinForm from './MultiplayerJoinForm';

const MultiplayerJoin = props => {
  useEffect(() => {
    return () => {
      console.log('UNMOUNTED JOIN COMPONENT');
      // source.cancel();
    };
  }, []);

  const onSubmit = formValues => {
    props.joinMultiplayerGame(formValues.gameId, formValues.name);
  };

  return (
    <>
      <MultiplayerJoinForm
        onSubmit={onSubmit}
        initialValues={{ gameId: props.joinId }}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    currentGame: state.multiplayer.currentGame
  };
};

export default connect(mapStateToProps, {
  joinMultiplayerGame
})(MultiplayerJoin);
