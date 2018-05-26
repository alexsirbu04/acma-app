import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import DashboardTabBar from './DashboardTabBar';
import Welcome from '../screens/Welcome';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Hotels from '../screens/Hotels';
import Account from '../screens/Account';
import Rooms from '../screens/Rooms';
import Booking from '../screens/Booking';

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
    SignUp: {
      screen: SignUp
    },
    Dashboard: {
      screen: TabStack,
      navigationOptions: {
        gesturesEnabled: false
      }
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

export default AppStack;
