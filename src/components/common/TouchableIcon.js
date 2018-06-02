import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

export const TouchableIcon = ({ onPress, name, type, color, size, iconStyle, containerStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Icon name={name} type={type} color={color} size={size} iconStyle={iconStyle} />
    </TouchableOpacity>
  );
};

TouchableIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number
};
