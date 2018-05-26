import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';

import { WHITE, GREY } from '../../../assets/colors';

export const Loading = () => {
  return (
    <View style={styles.screenOverlay}>
      <View style={styles.container}>
        <MaterialIndicator color={WHITE} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1
  },
  container: {
    height: 100,
    width: 150,
    backgroundColor: GREY,
    borderRadius: 10,
    opacity: 0.8
  }
});
