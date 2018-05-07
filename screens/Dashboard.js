import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { LinearGradient } from 'expo';

import { Header } from '../components';
import { DARK_BLUE, LIGHT_BLUE } from '../assets/colors';
import HotelList from '../components/hotels/HotelList';

export default class Dashboard extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return(
      <SafeAreaView forceInset={{ bottom: 'always', top: 'never' }} style={styles.containerStyle}>
        <LinearGradient
          colors={[DARK_BLUE, LIGHT_BLUE]}
          start={[1, 1]}
          style={styles.gradientStyle}
        />
        <Header headerText='Dashboard' />
        <ScrollView showsVerticalScrollIndicator={false}>
          <HotelList navigation={this.props.navigation} />
        </ScrollView> 
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center'
  },
  gradientStyle: {
    position: 'absolute',
    height: '120%',
    width: '100%'
  }
});
