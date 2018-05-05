import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import RoomList from '../components/rooms/RoomList';
import { Header } from '../components';


class Booking extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    const hotelId = this.props.navigation.state.params.id._id;
    this.selectedHotel = {};

    for (const hotel of this.props.hotels) {
      if (hotel._id === hotelId)
        this.selectedHotel = hotel;
    }
  }

  render() {
    const { containerStyle } = styles;
    const { name, rooms } = this.selectedHotel;
    return(
      <SafeAreaView forceInset={{ bottom: 'always', top: 'never' }} style={containerStyle}>
        <Header headerText={name} backArrow={true} onBackPress={() => this.props.navigation.goBack()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <RoomList rooms={rooms} navigation={this.props.navigation} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#ddd'
  }
});

const mapStateToProps = state => {
  return {
    hotels: state.hotelsReducer.hotels
  };
};

export default connect(mapStateToProps)(Booking);
