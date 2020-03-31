import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { source } from '../api/multiplayer';
import { createMultiplayerGame } from '../actions';

import MultiplayerCreateForm from './MultiplayerCreateForm';

const MultiplayerCreate = props => {
  useEffect(() => {
    console.log('MOUNTED');
    return () => {
      console.log('UNMOUNTED CREATE COMPONENT');

      // source.cancel();
    };
  }, []);

  const onSubmit = async formValues => {
    props.createMultiplayerGame(formValues);
  };

  return (
    <div>
      <MultiplayerCreateForm
        onSubmit={onSubmit}
        initialValues={{ rounds: 5 }}
      />
    </div>
  );
};

export default connect(null, { createMultiplayerGame })(MultiplayerCreate);
