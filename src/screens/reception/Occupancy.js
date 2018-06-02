import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { LinearGradient } from 'expo';

import BookingsList from '../../components/reception/bookings/BookingsList';
import { ONGOING } from '../../constants';
import { Header } from '../../components/common';
import { DARK_BLUE, LIGHT_BLUE } from '../../../assets/colors';

const Occupancy = ({ navigation }) => {
  return (
    <SafeAreaView forceInset={{ bottom: 'always', top: 'never' }} style={styles.container}>
      <LinearGradient colors={[DARK_BLUE, LIGHT_BLUE]} start={[1, 1]} style={styles.gradient} />
      <Header title="Occupancy" />
      <BookingsList navigation={navigation} status={ONGOING} occupancy scroll />
    </SafeAreaView>
  );
};

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

export default Occupancy;
