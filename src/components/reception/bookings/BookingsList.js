import React, { Component } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import StoreProvider from '../../../store/StoreProvider';
import BookingsDetail from './BookingsDetail';
import { clearReservations } from '../../../actions';
import { SCREEN_WIDTH, TextBox, Hr } from '../../common';
import { WHITE, LIGHT_GREY } from '../../../../assets/colors';

class BookingsList extends Component {
  constructor(props) {
    super(props);

    this.refreshAsync = this.refreshAsync.bind(this);
  }

  state = {
    refreshing: false,
    renderData: []
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
      renderData: data
    };
  }

  async refreshAsync() {
    this.setState({ refreshing: true });
    this.props.clearReservations();
    await StoreProvider.loadReceptionReservations();
    this.setState({ refreshing: false });
  }

  renderReservation(reservation, index) {
    if (index === this.state.renderData.length - 1) {
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
    const { checkIn, checkOut, departures, arrivals } = this.props;
    if (checkIn && arrivals.length > 0) {
      return (
        <TextBox type="semi-bold" size={14} color={WHITE} style={{ marginBottom: 10 }}>
          {`TODAY'S ARRIVALS (${arrivals.length})`}
        </TextBox>
      );
    } else if (checkOut && departures.length > 0) {
      return (
        <TextBox type="semi-bold" size={14} color={WHITE} style={{ marginBottom: 10 }}>
          {`TODAY'S DEPARTURES (${departures.length})`}
        </TextBox>
      );
    }

    return null;
  }

  render() {
    const { container } = styles;
    const { refreshing, renderData } = this.state;
    const { scroll, checkOut, occupancy, arrivals, departures } = this.props;

    const length = checkOut ? departures.length : arrivals.length;

    return (
      <View style={[container, { height: scroll ? '100%' : 30 + length * 110 }]}>
        {this.renderSubheader()}
        <FlatList
          data={renderData}
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
  scroll: PropTypes.bool.isRequired,
  checkOut: PropTypes.bool,
  checkIn: PropTypes.bool,
  occupancy: PropTypes.bool
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
    arrivals: state.reservations.arrivals,
    departures: state.reservations.departures,
    staying: state.reservations.staying
  };
};

export default connect(
  mapStateToProps,
  { clearReservations }
)(BookingsList);
