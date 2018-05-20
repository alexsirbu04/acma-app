import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

export const Arrow = ({ onPress, direction, color, size, iconContainerStyle, iconStyle }) => {
  let iconName;
  if (direction === 'left') {
    iconName = 'chevron-left';
  } else if (direction === 'right') {
    iconName = 'chevron-right';
  }

  return (
    <View style={iconContainerStyle}>
      <TouchableOpacity onPress={onPress}>
        <Icon name={iconName} size={size} iconStyle={iconStyle} color={color} />
      </TouchableOpacity>
    </View>
  );
};

Arrow.propTypes = {
  direction: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  color: PropTypes.string,
  size: PropTypes.number
};
