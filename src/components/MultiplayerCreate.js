import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { createSource } from '../actions';
import { createGameMultiplayer } from '../actions';

import MultiplayerCreateForm from './MultiplayerCreateForm';

const MultiplayerCreate = props => {
  useEffect(() => {
    return () => {
      console.log('UNMOUNTED CREATE COMPONENT');

      createSource.cancel();
    };
  }, []);

  const onSubmit = async formValues => {
    await props.createGameMultiplayer(formValues);
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

export default connect(null, { createGameMultiplayer })(MultiplayerCreate);
