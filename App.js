import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { store, persistor } from './src/store';
import StoreProvider from './src/store/StoreProvider';

import AppStack from './src/navigation';

// eslint-disable-next-line
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={<AppLoading />}
          persistor={persistor}
          onBeforeLift={() => StoreProvider.loadAssetsAsync(store)}
        >
          <AppStack
            ref={navigatorRef => {
              this.navigator = navigatorRef;
            }}
          />
        </PersistGate>
      </Provider>
    );
  }
}
