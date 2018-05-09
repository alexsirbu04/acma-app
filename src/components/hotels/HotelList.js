import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HotelDetail from './HotelDetail';

class HotelList extends Component {
  constructor(props) {
    super(props);
    this.hotels = this.props.hotels;
  }

  renderHotels() {
    return this.hotels.map(hotel => (
      <HotelDetail navigation={this.props.navigation} key={hotel._id} hotel={hotel} />
    ));
  }

  render() {
    return <View>{this.renderHotels()}</View>;
  }
}

HotelList.propTypes = {
  navigation: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    hotels: state.hotelsReducer.hotels
  };
};

export default connect(mapStateToProps)(HotelList);
