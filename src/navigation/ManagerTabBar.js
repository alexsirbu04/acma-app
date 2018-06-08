import React, { Component } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
import { Icon } from 'react-native-elements';

import { DARK_BLUE, LIGHT_BLUE, WHITE } from '../../assets/colors';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../components/common';

let iPhoneX = false;
if (Platform.OS === 'ios' && (SCREEN_HEIGHT === 812 || SCREEN_WIDTH === 812)) {
  iPhoneX = true;
}

export default class ManagerTabBar extends Component {
  renderIcons() {
    const { navigate, state } = this.props.navigation;
    const { routes } = state;
    const iconNameFocus = ['ios-home', 'ios-person'];
    const iconName = ['ios-home-outline', 'ios-person-outline'];

    return routes.map((route, index) => {
      const focused = index === state.index;

      return (
        <TouchableOpacity
          key={route.routeName}
          onPress={() => navigate(route.routeName)}
          style={styles.iconContainer}
        >
          <Icon
            name={focused ? iconNameFocus[index] : iconName[index]}
            type="ionicon"
            size={iPhoneX ? 35 : 30}
            color={WHITE}
          />
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={[DARK_BLUE, LIGHT_BLUE]} start={[1, 1]} style={styles.gradient} />
        {this.renderIcons()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    height: '100%',
    width: SCREEN_WIDTH
  },
  container: {
    height: iPhoneX ? 70 : 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: iPhoneX ? 5 : 0
  }
});
