import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// import { joinSource } from '../actions';
import { joinGameMultiplayer } from '../actions';

import MultiplayerJoinForm from './MultiplayerJoinForm';

const MultiplayerJoin = (props) => {
  const { currentGame } = props;

  useEffect(() => () => {
    console.log('UNMOUNTED JOIN COMPONENT');
    // joinSource.cancel();
  }, []);

  const onSubmit = (formValues) => {
    props.joinGameMultiplayer(
      formValues.gameId,
      formValues.name,
      props.clientId,
    );
  };

  return (
    <>
      <MultiplayerJoinForm
        onSubmit={onSubmit}
        initialValues={{ gameId: currentGame }}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  currentGame: state.multiplayer.currentGame,
  clientId: state.multiplayer.clientId,
});

export default connect(mapStateToProps, {
  joinGameMultiplayer,
})(MultiplayerJoin);
