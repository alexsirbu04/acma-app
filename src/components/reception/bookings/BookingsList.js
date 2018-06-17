import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BookingsDetail from './BookingsDetail';
import { SCREEN_WIDTH, TextBox, Hr } from '../../common';
import { WHITE, LIGHT_GREY } from '../../../../assets/colors';

class BookingsList extends Component {
  state = {
    data: []
  };

  static getDerivedStateFromProps(props) {
    const { checkIn, checkOut, occupancy, arrivals, departures, staying } = props;
    let data = [];
    if (checkIn) {
      data = arrivals;
    } else if (checkOut) {
      data = departures;
    } else if (occupancy) {
      data = staying;
    }

    return {
      data
    };
  }

  renderReservation(reservation, index) {
    if (index === this.state.data.length - 1) {
      return (
        <BookingsDetail
          reservation={reservation}
          index={index}
          navigation={this.props.navigation}
          occupancy={this.props.occupancy}
        />
      );
    }

    return (
      <View>
        <BookingsDetail
          reservation={reservation}
          index={index}
          navigation={this.props.navigation}
          occupancy={this.props.occupancy}
        />
        <Hr color={LIGHT_GREY} width={SCREEN_WIDTH} />
      </View>
    );
  }

  renderSubheader() {
    const { checkIn, checkOut, departures, arrivals } = this.props;
    if (checkIn && arrivals.length > 0) {
      return (
        <TextBox type="semi-bold" size={14} color={WHITE} style={{ marginBottom: 12.5 }}>
          {`TODAY'S ARRIVALS (${arrivals.length})`}
        </TextBox>
      );
    } else if (checkOut && departures.length > 0) {
      return (
        <TextBox type="semi-bold" size={14} color={WHITE} style={{ marginBottom: 12.5 }}>
          {`TODAY'S DEPARTURES (${departures.length})`}
        </TextBox>
      );
    }

    return null;
  }

  render() {
    const { container } = styles;
    const { data } = this.state;
    const { scroll } = this.props;

    return (
      <View style={container}>
        {this.renderSubheader()}
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => this.renderReservation(item, index)}
          showsVerticalScrollIndicator={false}
          scrollEnabled={scroll}
        />
      </View>
    );
  }
}

BookingsList.propTypes = {
  navigation: PropTypes.object.isRequired,
  scroll: PropTypes.bool.isRequired,
  checkOut: PropTypes.bool,
  checkIn: PropTypes.bool,
  occupancy: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 7.5
  }
});

const mapStateToProps = state => {
  return {
    arrivals: state.reservations.arrivals,
    departures: state.reservations.departures,
    staying: state.reservations.staying
  };
};

export default connect(mapStateToProps)(BookingsList);
