import React from 'react';
import { Text, View, Dimensions, Platform, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo';

import { Arrow } from './Arrow';
import { DARK_BLUE, LIGHT_BLUE, WHITE } from '../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

let containerPaddingBottom = 10;
let containerHeight = 65;
if (Platform.OS === 'ios' && (SCREEN_HEIGHT === 812 || SCREEN_WIDTH === 812)) {
  containerPaddingBottom = 0;
  containerHeight = 95;
}

const Header = ({ headerText, backArrow, onBackPress }) => {
  const { textStyle, gradientStyle, containerStyle, arrowContainerStyle } = styles;
  if (backArrow === true) {
    return (
      <View style={containerStyle}>
        <LinearGradient
          colors={[DARK_BLUE, LIGHT_BLUE]}
          start={[1, 1]}
          style={styles.gradientStyle}
        />
        <Arrow 
          direction='back' 
          color={WHITE} 
          size={36} 
          iconContainerStyle={arrowContainerStyle} 
          iconStyle={{ paddingLeft: 10 }} 
          onPress={onBackPress}
        />
        <Text style={textStyle}>{headerText}</Text>
        <View style={{ flex: 1 }} />
      </View>
    );
  } else {
    return (
      <View style={containerStyle}>
        <LinearGradient
          colors={[DARK_BLUE, LIGHT_BLUE]}
          start={[1, 1]}
          style={styles.gradientStyle}
        />
        <Text style={textStyle}>{headerText}</Text>
      </View>
    );
  }
};

Header.propTypes = {
  headerText: PropTypes.string.isRequired,
  backArrow: PropTypes.bool,
  onBackPress: PropTypes.func
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    color: WHITE,
    fontWeight: '400'
  },
  gradientStyle: {
    position: 'absolute', 
    height: containerHeight, 
    width: SCREEN_WIDTH
  },
  containerStyle: {
    paddingTop: 30,
    paddingBottom: containerPaddingBottom,
    height: containerHeight,
    width: SCREEN_WIDTH,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  arrowContainerStyle: {
    flex: 1,
    alignItems: 'flex-start',
  }
});

export { Header };
