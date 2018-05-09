import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { LinearGradient } from 'expo';

import { Header } from '../components/common';
import { DARK_BLUE, LIGHT_BLUE } from '../../assets/colors';
import HotelList from '../components/hotels/HotelList';

export default class Dashboard extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <SafeAreaView forceInset={{ bottom: 'always', top: 'never' }} style={styles.container}>
        <LinearGradient colors={[DARK_BLUE, LIGHT_BLUE]} start={[1, 1]} style={styles.gradient} />
        <Header title="Dashboard" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <HotelList navigation={this.props.navigation} />
        </ScrollView>
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
