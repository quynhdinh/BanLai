import React from 'react';
import {
  zmpready,
  App,
  View,
} from 'zmp-framework/react';
import store from '../store';

export default () => {

  // ZMP Parameters
  const zmpparams = {
    name: 'BanLai',
      theme: 'auto', // Automatic theme detection
      // App store
      store: store,
  };

  zmpready(() => {
    // Call ZMP APIs here
    store.dispatch('login')
  });

  return (
    <App { ...zmpparams } >
        {/* Your main view, should have "view-main" class */}
        <View main className="safe-areas" url="/" />

    </App>
  );
}