import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import UserTabBar from './UserTabBar';
import ReceptionTabBar from './ReceptionTabBar';
import ManagerTabBar from './ManagerTabBar';

import Welcome from '../screens/Welcome';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

import Hotels from '../screens/user/Hotels';
import Account from '../screens/user/Account';
import Rooms from '../screens/user/Rooms';
import Booking from '../screens/user/Booking';
import Reservations from '../screens/user/Reservations';
import CheckIn from '../screens/user/CheckIn';

import Dashboard from '../screens/reception/Dashboard';
import ReservationExpanded from '../screens/reception/ReservationExpanded';
import Occupancy from '../screens/reception/Occupancy';

import ManagerDashboard from '../screens/manager/Dashboard';

const AccountStack = createStackNavigator(
  {
    Account: {
      screen: Account
    },
    Reservations: {
      screen: Reservations
    },
    CheckIn: {
      screen: CheckIn
    }
  },
  {
    headerMode: 'none'
  }
);

const UserTabStack = createBottomTabNavigator(
  {
    Home: {
      screen: Hotels
    },
    Profile: {
      screen: AccountStack
    }
  },
  {
    navigationOptions: () => ({
      header: null
    }),
    tabBarComponent: ({ navigation }) => <UserTabBar navigation={navigation} />
  }
);

const UserStack = createStackNavigator(
  {
    User: {
      screen: UserTabStack,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Rooms: {
      screen: Rooms
    },
    Booking: {
      screen: Booking
    }
  },
  {
    headerMode: 'none'
  }
);

const ReceptionDashboardStack = createStackNavigator(
  {
    Dashboard: {
      screen: Dashboard
    },
    ReservationExpanded: {
      screen: ReservationExpanded
    }
  },
  {
    headerMode: 'none'
  }
);

const ReceptionOccupancyStack = createStackNavigator(
  {
    Occupancy: {
      screen: Occupancy
    },
    ReservationExpanded: {
      screen: ReservationExpanded
    }
  },
  {
    headerMode: 'none'
  }
);

const ReceptionTabStack = createBottomTabNavigator(
  {
    Dashboard: {
      screen: ReceptionDashboardStack
    },
    Occupancy: {
      screen: ReceptionOccupancyStack
    },
    Profile: {
      screen: Account
    }
  },
  {
    navigationOptions: () => ({
      header: null
    }),
    tabBarComponent: ({ navigation }) => <ReceptionTabBar navigation={navigation} />
  }
);

const ManagerTabStack = createBottomTabNavigator(
  {
    Dashboard: {
      screen: ManagerDashboard
    },
    Profile: {
      screen: Account
    }
  },
  {
    navigationOptions: () => ({
      header: null
    }),
    tabBarComponent: ({ navigation }) => <ManagerTabBar navigation={navigation} />
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
    User: {
      screen: UserStack
    },
    Reception: {
      screen: ReceptionTabStack,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Manager: {
      screen: ManagerTabStack,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },
  {
    headerMode: 'none'
  }
);

export default AppStack;
