import React from 'react';
import { Text, View, SafeAreaView, Dimensions, Platform } from 'react-native';
import PropTypes from 'prop-types';

import { Arrow } from './Arrow';

let d = Dimensions.get('window');
const { height, width } = d;
let containerPaddingBottom = 10;
let containerHeight = 65;
if (Platform.OS === 'ios' && (height === 812 || width === 812)) {
  containerPaddingBottom = 0;
  containerHeight = 95;
}

const Header = ({ headerText, backArrow, onBackPress }) => {
  const { textStyle, containerStyle, arrowContainerStyle } = styles;
  if (backArrow === true) {
    return (
      <View style={containerStyle}>
        <Arrow 
          direction='back' 
          color='#fff' 
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

const styles = {
  textStyle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '400'
  },
  containerStyle: {
    paddingTop: 30,
    paddingBottom: containerPaddingBottom,
    height: containerHeight,
    backgroundColor: '#1d7cf4',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  arrowContainerStyle: {
    flex: 1,
    alignItems: 'flex-start',
  }
};

export { Header };
