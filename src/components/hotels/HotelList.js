import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HotelDetail from './HotelDetail';

const HotelList = ({ hotels, navigation }) => {
  return (
    <FlatList
      data={hotels}
      keyExtractor={item => item._id}
      renderItem={({ item }) => <HotelDetail navigation={navigation} hotel={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

HotelList.propTypes = {
  hotels: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    hotels: state.hotelsArray.hotels
  };
};

export default connect(mapStateToProps)(HotelList);
