import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { Header } from '../components';
import HotelList from '../components/hotels/HotelList';

class Dashboard extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return(
      <SafeAreaView forceInset={{ bottom: 'always', top: 'never' }} style={styles.container}>
        <Header headerText='Dashboard' />
        <ScrollView showsVerticalScrollIndicator={false}>
          <HotelList navigation={this.props.navigation} />
        </ScrollView> 
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd'
  }
});

export default Dashboard;
