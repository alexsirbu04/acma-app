import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo';

import { DARK_GOLD, LIGHT_GOLD } from '../assets/colors';

const Button = ({ title, onPress, containerStyle, buttonStyle }) => {
    return (
      <TouchableOpacity onPress={onPress} style={containerStyle}>
        <LinearGradient
          colors={[DARK_GOLD, LIGHT_GOLD]}
          start={[ 0, 1 ]}
          end={[ 0.5, 0.5 ]}
          style={styles.gradientStyle}
        />
        <Text style={buttonStyle}>{title}</Text>
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
  onPress: PropTypes.func.isRequired
};

export { Button };
