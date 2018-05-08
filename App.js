import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './src/reducers';

import Welcome from './src/screens/Welcome';
import SignIn from './src/screens/SignIn';
import Dashboard from './src/screens/Dashboard';
import Rooms from './src/screens/Rooms';
import Booking from './src/screens/Booking';

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <AppStack />
      </Provider>
    )
  }
}

const AppStack = StackNavigator({
  Welcome: {
    screen: Welcome
  },
  SignIn: {
    screen: SignIn
  },
  Dashboard: {
    screen: Dashboard
  },
  Rooms: {
    path: 'hotel/:id',
    screen: Rooms
  },
  Booking: {
    path: 'hotel/:name/:room',
    screen: Booking
  }
});
