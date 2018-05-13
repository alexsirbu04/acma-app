import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

export const TextBox = props => {
  const { children, color, size, type, ellipsizeMode, numberOfLines, onPress, style } = props;
  return (
    <Text
      fontfamily={type}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={[style, { fontFamily: type, color, fontSize: size }]}
    >
      {children}
    </Text>
  );
};

TextBox.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  ellipsizeMode: PropTypes.string,
  numberOfLines: PropTypes.number
};
