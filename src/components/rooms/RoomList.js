import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

import RoomDetail from './RoomDetail';

const RoomList = ({ rooms, navigation, hotelName }) => {
  return (
    <FlatList
      data={rooms.roomTypes}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <RoomDetail navigation={navigation} hotelName={hotelName} room={item} />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};

RoomList.propTypes = {
  rooms: PropTypes.object.isRequired,
  hotelName: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired
};

export default RoomList;
