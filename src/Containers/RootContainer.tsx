
import React from 'react';
import {
  StatusBar,
} from 'react-native';

import Videos from 'src/Screens/Videos';

function RootContainer() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Videos />
    </>
  );
}

export default RootContainer;
