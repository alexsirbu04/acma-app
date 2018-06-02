import React, { Component } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import StoreProvider from '../../../store/StoreProvider';
import BookingsDetail from './BookingsDetail';
import { ONHOLD, ONGOING } from '../../../constants';
import { clearReservations } from '../../../actions';
import { SCREEN_WIDTH, TextBox, Hr } from '../../common';
import { WHITE, LIGHT_GREY } from '../../../../assets/colors';

class BookingsList extends Component {
  constructor(props) {
    super(props);

    this.refreshAsync = this.refreshAsync.bind(this);
  }

  state = {
    reservations: [],
    expiring: [],
    refreshing: false
  };

  static getDerivedStateFromProps(props) {
    const reservations = [];
    const expiring = [];
    const ongoing = [];
    const now = moment().format('YYYY-MM-DD');

    if (props.allReservations.length > 0) {
      for (const reservation of props.allReservations) {
        if (!props.occupancy) {
          if (reservation.status === props.status || reservation.status === ONHOLD) {
            reservations.push(reservation);
          }

          if (props.status === ONGOING) {
            const checkOutDate = moment(
              `${reservation.checkOut.dayOfMonth}-${reservation.checkOut.month}-${
                reservation.year
              }`,
              'DD-MMM-YYYY'
            ).format('YYYY-MM-DD');
            if (reservation.status === ONGOING && moment(checkOutDate).isSame(now)) {
              expiring.push(reservation);
            }
          }
        } else {
          if (reservation.status === props.status) {
            reservations.push(reservation);
          }
        }
      }

      return {
        reservations,
        expiring,
        ongoing
      };
    }

    return null;
  }

  async refreshAsync() {
    this.setState({ refreshing: true });
    this.props.clearReservations();
    await StoreProvider.loadReceptionReservations();
    this.setState({ refreshing: false });
  }

  renderReservation(reservation, index) {
    if (index === this.state.reservations.length - 1) {
      return (
        <BookingsDetail
          reservation={reservation}
          index={index}
          navigation={this.props.navigation}
        />
      );
    }

    return (
      <View>
        <BookingsDetail
          reservation={reservation}
          index={index}
          navigation={this.props.navigation}
        />
        <Hr color={LIGHT_GREY} width={SCREEN_WIDTH} />
      </View>
    );
  }

  renderSubheader() {
    const { status, occupancy, departures } = this.props;
    const { reservations, expiring } = this.state;
    if (!occupancy && !departures && reservations.length > 0) {
      return (
        <TextBox type="semi-bold" size={14} color={WHITE} style={{ marginBottom: 10 }}>
          {status === 'upcoming' ? `TODAY'S ARRIVALS (${reservations.length})` : null}
        </TextBox>
      );
    } else if (!occupancy && departures && expiring.length > 0) {
      return (
        <TextBox type="semi-bold" size={14} color={WHITE} style={{ marginBottom: 10 }}>
          {status === 'ongoing' && departures ? `TODAY'S DEPARTURES (${expiring.length})` : null}
        </TextBox>
      );
    }

    return null;
  }

  render() {
    const { container } = styles;
    const { reservations, expiring, refreshing } = this.state;
    const { scroll, departures, occupancy } = this.props;

    return (
      <View style={[container, { height: scroll ? '100%' : 30 + reservations.length * 110 }]}>
        {this.renderSubheader()}
        <FlatList
          data={departures ? expiring : reservations}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => this.renderReservation(item, index)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={scroll}
          refreshControl={
            occupancy ? (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.refreshAsync}
                tintColor={WHITE}
              />
            ) : null
          }
        />
      </View>
    );
  }
}

BookingsList.propTypes = {
  navigation: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  scroll: PropTypes.bool.isRequired,
  departures: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 15
  },
  button: {
    height: 50,
    marginTop: 15,
    width: SCREEN_WIDTH - 50,
    overflow: 'hidden',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    allReservations: state.reservationsArray.reservations
  };
};

export default connect(mapStateToProps, { clearReservations })(BookingsList);
