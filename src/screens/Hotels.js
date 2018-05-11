import React, { Component } from 'react';
import { StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { LinearGradient } from 'expo';

import { Header } from '../components/common';
import { DARK_BLUE, LIGHT_BLUE } from '../../assets/colors';
import HotelList from '../components/hotels/HotelList';

class Dashboard extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView forceInset={{ bottom: 'always', top: 'never' }} style={styles.container}>
        <StatusBar barStyle="light-content" />
        <LinearGradient colors={[DARK_BLUE, LIGHT_BLUE]} start={[1, 1]} style={styles.gradient} />
        <Header title="Home" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <HotelList navigation={navigation} />
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

export default Dashboard;
