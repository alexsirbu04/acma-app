import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import RoomDetail from './RoomDetail';

export default class RoomList extends Component {
  renderRooms() {
    const { rooms, navigation, hotelName } = this.props;
    return rooms.roomTypes.map(room =>
      <RoomDetail navigation={navigation} key={room._id} hotelName={hotelName} room={room} />
    );
  }

  render() {
    return (
      <View>
        {this.renderRooms()}
      </View>
    );
  }
}

RoomList.propTypes = {
  rooms: PropTypes.object.isRequired,
  hotelName: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired
};
