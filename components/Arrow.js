import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

const Arrow = ({ onPress, direction, color, size, iconContainerStyle, iconStyle }) => {
  let iconName;
  if (direction === 'back')
    iconName = 'chevron-left';
  else if (direction === 'forward')
    iconName = 'chevron-right';

  return (
    <View style={iconContainerStyle}>
      <TouchableOpacity onPress={onPress}>
        <Icon name={iconName} size={size} iconStyle={iconStyle} color={color} />
      </TouchableOpacity>
    </View>
  );
};

Arrow.propTypes = {
  onPress: PropTypes.func,
  direction: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number
}

export { Arrow };
