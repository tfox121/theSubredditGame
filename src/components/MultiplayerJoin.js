import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// import { joinSource } from '../actions';
import { joinGameMultiplayer } from '../actions';

import MultiplayerJoinForm from './MultiplayerJoinForm';

const MultiplayerJoin = (props) => {
  useEffect(() => {
    return () => {
      console.log('UNMOUNTED JOIN COMPONENT');
      // joinSource.cancel();
    };
  }, []);

  const onSubmit = (formValues) => {
    props.joinGameMultiplayer(
      formValues.gameId,
      formValues.name,
      props.clientId
    );
  };

  return (
    <>
      <MultiplayerJoinForm
        onSubmit={onSubmit}
        initialValues={{ gameId: props.currentGame }}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentGame: state.multiplayer.currentGame,
    clientId: state.multiplayer.clientId,
  };
};

export default connect(mapStateToProps, {
  joinGameMultiplayer,
})(MultiplayerJoin);
