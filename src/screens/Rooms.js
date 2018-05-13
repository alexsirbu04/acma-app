import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { LinearGradient } from 'expo';
import { connect } from 'react-redux';

import RoomList from '../components/rooms/RoomList';
import { Header } from '../components/common';
import { DARK_BLUE, LIGHT_BLUE } from '../../assets/colors';

class Rooms extends Component {
  constructor(props) {
    super(props);
    const hotelId = this.props.navigation.state.params.id._id;
    this.selectedHotel = {};

    for (const hotel of this.props.hotels) {
      if (hotel._id === hotelId) {
        this.selectedHotel = hotel;
      }
    }
  }

  render() {
    const { name, rooms } = this.selectedHotel;
    return (
      <SafeAreaView forceInset={{ bottom: 'always', top: 'never' }} style={styles.containerStyle}>
        <LinearGradient
          colors={[DARK_BLUE, LIGHT_BLUE]}
          start={[1, 1]}
          style={styles.gradientStyle}
        />
        <Header title={name} backArrow onBackPress={() => this.props.navigation.goBack()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <RoomList rooms={rooms} hotelName={name} navigation={this.props.navigation} />
        </ScrollView>
      </SafeAreaView>
    );
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

const mapStateToProps = state => {
  return {
    hotels: state.hotelsArray.hotels
  };
};

export default connect(mapStateToProps)(Rooms);
