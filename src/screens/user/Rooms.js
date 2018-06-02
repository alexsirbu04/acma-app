import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { LinearGradient } from 'expo';
import { connect } from 'react-redux';

import RoomList from '../../components/rooms/RoomList';
import { Header } from '../../components/common';
import { DARK_BLUE, LIGHT_BLUE } from '../../../assets/colors';

class Rooms extends Component {
  constructor(props) {
    super(props);
    const hotelId = props.navigation.getParam('id');
    this.selectedHotel = {};

    for (const hotel of props.hotels) {
      if (hotel._id === hotelId._id) {
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
        <RoomList rooms={rooms} hotelName={name} navigation={this.props.navigation} />
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
