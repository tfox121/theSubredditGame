import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  clearCurrentGame,
  createGameMultiplayer,
  // createSource
} from '../../actions';

import MultiplayerCreateForm from './MultiplayerCreateForm';

const MultiplayerCreate = (props) => {
  useEffect(() => () => {
    console.log('UNMOUNTED CREATE COMPONENT');

    // createSource.cancel();
  }, []);

  const onSubmit = async (formValues) => {
    await props.createGameMultiplayer(formValues);
  };

  return (
    <MultiplayerCreateForm
      onSubmit={onSubmit}
      initialValues={{ rounds: 5 }}
    />
  );
};

export default connect(null, { createGameMultiplayer, clearCurrentGame })(
  MultiplayerCreate,
);
