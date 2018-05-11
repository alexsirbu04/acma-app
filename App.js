import React, { Component } from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import DashboardTabBar from './src/components/DashboardTabBar';
import store from './src/store';

import Welcome from './src/screens/Welcome';
import SignIn from './src/screens/SignIn';
import Hotels from './src/screens/Hotels';
import Account from './src/screens/Account';
import Rooms from './src/screens/Rooms';
import Booking from './src/screens/Booking';

// eslint-disable-next-line
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppStack />
      </Provider>
    );
  }
}

const TabStack = createBottomTabNavigator(
  {
    Home: {
      screen: Hotels
    },
    Account: {
      screen: Account
    }
  },
  {
    navigationOptions: () => ({
      header: null
    }),
    tabBarComponent: ({ navigation }) => <DashboardTabBar navigation={navigation} />
  }
);

const AppStack = createStackNavigator(
  {
    Welcome: {
      screen: Welcome
    },
    SignIn: {
      screen: SignIn
    },
    Dashboard: {
      screen: TabStack
    },
    Rooms: {
      path: 'hotel/:id',
      screen: Rooms
    },
    Booking: {
      path: 'hotel/:name/:room',
      screen: Booking
    }
  },
  {
    headerMode: 'none'
  }
);
