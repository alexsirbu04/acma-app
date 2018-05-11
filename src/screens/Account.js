import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { LinearGradient } from 'expo';

import { Header, TextBox } from '../components/common';
import { DARK_BLUE, LIGHT_BLUE, WHITE } from '../../assets/colors';

// eslint-disable-next-line
export default class Account extends Component {
  render() {
    return (
      <SafeAreaView forceInset={{ bottom: 'always', top: 'never' }} style={styles.container}>
        <LinearGradient colors={[DARK_BLUE, LIGHT_BLUE]} start={[1, 1]} style={styles.gradient} />
        <Header title="Account" />
        <TextBox type="regular" color={WHITE} size={20}>
          Account tab
        </TextBox>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  gradient: {
    position: 'absolute',
    height: '120%',
    width: '100%'
  }
});
