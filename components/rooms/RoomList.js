import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RoomDetail from './RoomDetail';

class RoomList extends Component {
  renderRooms() {
    const { rooms, navigation } = this.props;
    return rooms.roomTypes.map(room =>
      <RoomDetail navigation={navigation} key={room._id} room={room} />
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
  navigation: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    hotels: state.hotelsReducer.hotels
   };
};

export default connect(mapStateToProps)(RoomList);