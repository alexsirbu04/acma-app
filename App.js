import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import Welcome from './components/Welcome';
import SignIn from './components/SignIn';

export default class App extends Component {
  render() {
    return (
      <AppStack />
    )
  }
}

const AppStack = StackNavigator({
  Welcome: {
    screen: Welcome
  },
  SignIn: {
    screen: SignIn
  }
});
