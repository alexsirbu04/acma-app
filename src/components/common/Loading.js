import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import { WHITE, GREY } from '../../../assets/colors';

export const Loading = ({ small, simple }) => {
  if (small) {
    return (
      <View style={styles.screenOverlay}>
        <View style={styles.smallContainer}>
          <ActivityIndicator color={WHITE} size="large" />
        </View>
      </View>
    );
  }

  if (simple) {
    return (
      <View style={styles.simpleScreenOverlay}>
        <View style={styles.simpleContainer}>
          <ActivityIndicator color={WHITE} size="large" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screenOverlay}>
      <View style={styles.container}>
        <ActivityIndicator color={WHITE} size="large" />
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
    zIndex: 3
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 150,
    backgroundColor: GREY,
    borderRadius: 10,
    opacity: 0.8
  },
  simpleScreenOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 3
  },
  simpleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 150,
    backgroundColor: GREY,
    borderRadius: 10,
    opacity: 0.8
  },
  smallContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
    backgroundColor: GREY,
    borderRadius: 10,
    opacity: 0.8
  }
});
