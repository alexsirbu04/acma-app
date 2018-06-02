import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo';

import { DARK_GOLD, LIGHT_GOLD } from '../../../assets/colors';
import { TextBox } from './TextBox';

export const Button = props => {
  const { title, onPress, gradient, textColor, buttonStyle, disabled } = props;

  if (gradient === true) {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled} style={buttonStyle}>
        <LinearGradient
          colors={[DARK_GOLD, LIGHT_GOLD]}
          start={[0, 1]}
          end={[0.5, 0.5]}
          style={styles.gradientStyle}
        />
        <TextBox type="semi-bold" size={16} color={textColor}>
          {title}
        </TextBox>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <TextBox type="semi-bold" size={16} color={textColor}>
        {title}
      </TextBox>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradientStyle: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  }
});

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  gradient: PropTypes.bool,
  textColor: PropTypes.string,
  disabled: PropTypes.bool
};
