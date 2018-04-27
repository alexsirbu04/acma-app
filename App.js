import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import Welcome from './screens/Welcome';
import SignIn from './screens/SignIn';

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
