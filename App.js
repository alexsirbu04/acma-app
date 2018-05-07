import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';

import Welcome from './screens/Welcome';
import SignIn from './screens/SignIn';
import Dashboard from './screens/Dashboard';
import Rooms from './screens/Rooms';
import Booking from './screens/Booking';

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
