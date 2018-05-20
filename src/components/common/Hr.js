import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { TextBox } from './TextBox';
import { GREY } from '../../../assets/colors';

export const Hr = ({ text, textSize, color, lineStyle, containerStyle }) => {
  const { container, textStyle, line } = styles;
  if (text) {
    return (
      <View style={[container, containerStyle]}>
        <View style={[line, lineStyle, { backgroundColor: color }]} />
        <TextBox type="semi-bold" size={textSize || 13} color={color || GREY} style={textStyle}>
          {text}
        </TextBox>
        <View style={[line, lineStyle, { backgroundColor: color }]} />
      </View>
    );
  }

  return (
    <View style={[container, containerStyle]}>
      <View style={[line, lineStyle]} />
    </View>
  );
};

Hr.propTypes = {
  text: PropTypes.string,
  textSize: PropTypes.number,
  textColor: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    padding: 10
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: GREY
  }
});
