import React from 'react';
import { Text, View, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo';

import { Arrow } from './Arrow';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './Dimensions';
import { DARK_BLUE, LIGHT_BLUE, WHITE } from '../../../assets/colors';

let containerPaddingBottom = 10;
let containerHeight = 65;
if (Platform.OS === 'ios' && (SCREEN_HEIGHT === 812 || SCREEN_WIDTH === 812)) {
  containerPaddingBottom = 0;
  containerHeight = 95;
}

export const Header = ({
  title,
  backArrow,
  home,
  refresh,
  onBackPress,
  onHomePress,
  onRefreshPress
}) => {
  const { text, gradient, container, leftComponent, rightComponent } = styles;

  return (
    <View style={container}>
      <LinearGradient colors={[DARK_BLUE, LIGHT_BLUE]} start={[1, 1]} style={gradient} />
      {backArrow || home ? (
        <Arrow
          direction="left"
          color={WHITE}
          size={36}
          iconContainerStyle={leftComponent}
          iconStyle={{ paddingLeft: 10 }}
          onPress={onBackPress}
        />
      ) : null}
      {refresh && !backArrow ? <View style={leftComponent} /> : null}
      <Text style={text}>{title}</Text>
      {backArrow && !home && !refresh ? <View style={rightComponent} /> : null}
      {home ? (
        <View style={rightComponent}>
          <TouchableOpacity onPress={onHomePress}>
            <Icon
              type="ionicon"
              name="ios-home"
              size={30}
              color={WHITE}
              iconStyle={{ paddingRight: 20 }}
            />
          </TouchableOpacity>
        </View>
      ) : null}
      {refresh ? (
        <View style={rightComponent}>
          <TouchableOpacity onPress={onRefreshPress}>
            <Icon name="refresh" size={26} color={WHITE} iconStyle={{ paddingRight: 20 }} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  backArrow: PropTypes.bool,
  onBackPress: PropTypes.func
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: WHITE,
    fontWeight: '400'
  },
  gradient: {
    position: 'absolute',
    height: containerHeight,
    width: SCREEN_WIDTH
  },
  container: {
    paddingTop: 30,
    paddingBottom: containerPaddingBottom,
    height: containerHeight,
    width: SCREEN_WIDTH,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftComponent: {
    flex: 1,
    alignItems: 'flex-start'
  },
  rightComponent: {
    flex: 1,
    alignItems: 'flex-end'
  }
});
