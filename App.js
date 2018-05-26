import React, { Component } from 'react';
import { AppLoading, ScreenOrientation } from 'expo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { store, persistor } from './src/store';
import StoreProvider from './src/store/StoreProvider';

import AppStack from './src/navigation';

ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT_UP);

export default class App extends Component {
  state = {
    ready: false
  };

  render() {
    if (!this.state.ready) {
      return (
        <Provider store={store}>
          <AppLoading
            startAsync={() => StoreProvider.loadAssets()}
            onFinish={() => this.setState({ ready: true })}
          />
        </Provider>
      );
    }

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppStack />
        </PersistGate>
      </Provider>
    );
  }
}
