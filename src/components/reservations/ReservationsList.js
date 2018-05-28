import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

import ReservationDetail from './ReservationsDetail';
import { TextBox } from '../common';
import { WHITE } from '../../../assets/colors';

class ReservationsList extends Component {
  renderReservation(reservation, index) {
    if (index === this.props.reservations.length - 1) {
      return <ReservationDetail reservation={reservation} index={index} />;
    }

    return <ReservationDetail border reservation={reservation} index={index} />;
  }

  render() {
    const { container } = styles;
    const { reservations } = this.props;

    if (reservations.length > 0 && reservations.length <= 3) {
      return (
        <View style={container}>
          <TextBox type="semi-bold" size={14} color={WHITE} style={{ marginBottom: 10 }}>
            UPCOMING RESERVATIONS ({reservations.length})
          </TextBox>
          <FlatList
            data={reservations}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => this.renderReservation(item, index)}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      );
    }

    if (reservations.length > 3) {
      return (
        <View style={container}>
          <TextBox type="semi-bold" size={14} color={WHITE} style={{ marginBottom: 10 }}>
            UPCOMING RESERVATIONS ({reservations.length})
          </TextBox>
          <FlatList
            data={reservations}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => this.renderReservation(item, index)}
            showsVerticalScrollIndicator={false}
          />
        </View>
      );
    }

    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 15
  }
});

const mapStateToProps = state => {
  return {
    reservations: state.reservationsArray.reservations
  };
};

export default connect(mapStateToProps)(ReservationsList);
