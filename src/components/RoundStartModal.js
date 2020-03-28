import React, { useState } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const RoundStartModal = props => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = event => {
    event.preventDefault();
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);

  const startRound = event => {
    setModalOpen(false);
    props.onSubmit(event);
  };

  return (
    <Modal
      trigger={<Button onClick={handleOpen}>Begin!</Button>}
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
          <Icon name="checkmark" /> Let's do it!
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default RoundStartModal;
