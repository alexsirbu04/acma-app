import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { TextBox, SCREEN_WIDTH } from '../common';
import { WHITE } from '../../../assets/colors';

export default class Legend extends Component {
  renderItems() {
    const { data, colorScale } = this.props;

    return data.map((item, index) => {
      return (
        <View key={item.x} style={styles.row}>
          <View style={{ width: '40%', alignItems: 'flex-end' }}>
            <View style={[styles.dot, { backgroundColor: colorScale[index] }]} />
          </View>
          <View style={{ width: '60%', alignItems: 'flex-start' }}>
            <TextBox type="regular" size={16} color={WHITE}>
              {item.y}% {item.x}
            </TextBox>
          </View>
        </View>
      );
    });
  }

  render() {
    return <View style={styles.container}>{this.renderItems()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    bottom: 40
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2.5,
    width: SCREEN_WIDTH - 40
  },
  dot: {
    width: 15,
    height: 15,
    marginRight: 10,
    borderRadius: 50,
    backgroundColor: WHITE
  }
});
