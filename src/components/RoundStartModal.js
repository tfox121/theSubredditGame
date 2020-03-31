import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const RoundStartModal = props => {
  const [modalOpen, setModalOpen] = useState(false);

  const game =
    props.multiplayer.currentGame &&
    props.multiplayer[props.multiplayer.currentGame];

  const player =
    game &&
    game.players.filter(player => {
      return player.name === props.multiplayer.playerName;
    })[0];

  const handleOpen = event => {
    event.preventDefault();
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);

  const startRound = event => {
    setModalOpen(false);
    props.onSubmit(event);
  };

  const buttonRender = player => {
    if (player.readyForNext) {
      return (
        <button className="ui button" disabled>
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
            <Icon name="arrow left" /> Back
          </Button>
          <Button color="green" onClick={startRound} inverted>
            <Icon name="checkmark" /> Let's go!
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  return buttonRender(player);
};

const mapStateToProps = state => {
  return { multiplayer: state.multiplayer };
};

export default connect(mapStateToProps)(RoundStartModal);
