import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Button, Header, Icon, Modal,
} from 'semantic-ui-react';

import { updateCall } from '../actions';

const RoundStartModal = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [playerData, setPlayerData] = useState({});

  const { multiplayer } = props;

  const game = multiplayer.currentGame && multiplayer[multiplayer.currentGame];

  useEffect(() => {
    if (!playerData) {
      setPlayerData(game
        && game.players.filter((player) => player.name === multiplayer.playerName)[0]);
    }
  }, [game, multiplayer, playerData]);

  if (!playerData) {
    return null;
  }

  const handleOpen = (event) => {
    event.preventDefault();
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);

  const startRound = (event) => {
    setModalOpen(false);
    props.onSubmit(event);
    updateCall('UPDATE', game._id);
  };

  const buttonRender = (player) => {
    if (player.readyForNext) {
      return (
        <button type="button" className="ui button" disabled>
          <div>Waiting...</div>
        </button>
      );
    }
    return (
      <Modal
        trigger={<Button onClick={handleOpen}>Ready!</Button>}
        open={modalOpen}
        onClose={handleClose}
        basic
        size="small"
      >
        <Header icon="bullhorn" content="Are you sure?" />
        <Modal.Content>
          <h3>No more players can join once the game begins.</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={handleClose} inverted>
            <Icon name="arrow left" />
            {' '}
            Back
          </Button>
          <Button color="green" onClick={startRound} inverted>
            <Icon name="checkmark" />
            Let&apos;s go!
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  return buttonRender(playerData);
};

const mapStateToProps = (state) => ({ multiplayer: state.multiplayer });

export default connect(mapStateToProps)(RoundStartModal);
