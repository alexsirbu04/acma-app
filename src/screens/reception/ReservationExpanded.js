import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { LinearGradient } from 'expo';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import Error from '../../components/Error';
import {
  Header,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  TextBox,
  Hr,
  CachedImage,
  Button,
  Loading
} from '../../components/common';
import { UPCOMING, ONHOLD, ONGOING, FINISHED } from '../../constants';
import {
  DARK_BLUE,
  LIGHT_BLUE,
  WHITE,
  GREY,
  LIGHT_GREY,
  MEDIUM_GREY
} from '../../../assets/colors';
import StoreProvider from '../../store/StoreProvider';
import { deleteReservation } from '../../actions';

class ReservationExpanded extends Component {
  constructor(props) {
    super(props);

    const { navigation } = props;
    this.reservation = navigation.getParam('reservation');
    this.occupancy = navigation.getParam('occupancy');
    this.id = this.reservation.id;

    this.onPressCheckIn = this.onPressCheckIn.bind(this);
    this.onPressCheckOut = this.onPressCheckOut.bind(this);
  }

  state = {
    loading: false
  };

  async onPressCheckIn() {
    this.setState({ loading: true });
    await StoreProvider.updateReservationStatus(this.id, ONHOLD, 'arrivals');
    this.setState({ loading: false });
    this.props.navigation.goBack();
  }

  async onPressCheckOut() {
    this.setState({ loading: true });

    if (!this.occupancy) {
      const reservation = this.props.departures.find(element => element.id === this.id);
      const dIndex = this.props.departures.indexOf(reservation);
      const sIndex = this.props.staying.indexOf(reservation);
      await StoreProvider.updateReservationStatus(this.id, FINISHED, 'departures');
      this.props.deleteReservation('departures', dIndex);
      this.props.deleteReservation('staying', sIndex);
    } else {
      const reservation = this.props.staying.find(element => element.id === this.id);
      const index = this.props.staying.indexOf(reservation);
      await StoreProvider.updateReservationStatus(this.id, FINISHED, 'staying');
      this.props.deleteReservation('staying', index);
    }

    this.setState({ loading: false });
    this.props.navigation.goBack();
  }

  renderCheckInButton(status) {
    if (status === UPCOMING) {
      return (
        <Button
          title="CHECK IN"
          textColor={WHITE}
          gradient
          onPress={this.onPressCheckIn}
          buttonStyle={styles.button}
        />
      );
    }

    return null;
  }

  renderCheckOutButton(status) {
    if (status === ONGOING) {
      return (
        <Button
          title="CHECK OUT"
          textColor={WHITE}
          gradient
          onPress={this.onPressCheckOut}
          buttonStyle={styles.button}
        />
      );
    }
  }

  renderOnHoldButton(status) {
    if (status === ONHOLD) {
      return (
        <Button title="ON HOLD" textColor={WHITE} gradient disabled buttonStyle={styles.button} />
      );
    }
  }

  render() {
    const {
      container,
      backgroundGradient,
      imageGradient,
      contentContainer,
      row,
      image,
      imageOverlay,
      dateContainer
    } = styles;
    const { navigation } = this.props;
    const {
      firstName,
      lastName,
      checkIn,
      checkOut,
      price,
      persons,
      nightsBooked,
      room,
      roomImage,
      roomsBooked,
      status
    } = this.reservation;

    return (
      <SafeAreaView forceInset={{ bottom: 'always', top: 'never' }} style={container}>
        <Error />
        {this.state.loading ? <Loading /> : null}
        <LinearGradient
          colors={[DARK_BLUE, LIGHT_BLUE]}
          start={[1, 1]}
          style={backgroundGradient}
        />
        <Header title="Details" backArrow onBackPress={() => navigation.goBack()} />
        <View style={contentContainer}>
          <View>
            <CachedImage source={{ uri: roomImage }} style={image} />
            <LinearGradient
              colors={['rgba(26, 47, 127, 0.8)', 'transparent']}
              start={[0.5, 1]}
              end={[0.5, 0]}
              locations={[0.4, 1]}
              style={imageGradient}
            />
            <View style={imageOverlay}>
              <TextBox type="semi-bold" size={24} color={WHITE}>
                {room.toUpperCase()}
              </TextBox>
              <View style={row}>
                <View style={dateContainer}>
                  <Icon
                    type="font-awesome"
                    name="calendar-check-o"
                    color={WHITE}
                    containerStyle={{ marginRight: 10 }}
                  />
                  <TextBox type="regular" size={18} color={WHITE}>
                    {checkIn.dayOfWeek.substr(0, 3)}, {checkIn.month} {checkIn.dayOfMonth}
                  </TextBox>
                </View>
                <View style={dateContainer}>
                  <TextBox type="regular" size={18} color={WHITE}>
                    {checkOut.dayOfWeek.substr(0, 3)}, {checkOut.month} {checkOut.dayOfMonth}
                  </TextBox>
                  <Icon
                    type="font-awesome"
                    name="calendar-times-o"
                    color={WHITE}
                    containerStyle={{ marginLeft: 10 }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={row}>
            <TextBox type="regular" size={18} color={MEDIUM_GREY}>
              Guest
            </TextBox>
            <TextBox type="regular" size={18} color={GREY}>
              {firstName} {lastName}
            </TextBox>
          </View>
          <Hr color={LIGHT_GREY} width={SCREEN_WIDTH - 30} containerStyle={{ marginLeft: 15 }} />
          <View style={row}>
            <TextBox type="regular" size={18} color={MEDIUM_GREY}>
              Rooms
            </TextBox>
            <TextBox type="regular" size={18} color={GREY}>
              {roomsBooked}
            </TextBox>
          </View>
          <Hr color={LIGHT_GREY} width={SCREEN_WIDTH - 30} containerStyle={{ marginLeft: 15 }} />
          <View style={row}>
            <TextBox type="regular" size={18} color={MEDIUM_GREY}>
              Persons
            </TextBox>
            <TextBox type="regular" size={18} color={GREY}>
              {persons}
            </TextBox>
          </View>
          <Hr color={LIGHT_GREY} width={SCREEN_WIDTH - 30} containerStyle={{ marginLeft: 15 }} />
          <View style={row}>
            <TextBox type="regular" size={18} color={MEDIUM_GREY}>
              Costs
            </TextBox>
            <TextBox type="regular" size={18} color={GREY}>
              {nightsBooked === 1 ? `${nightsBooked} night` : `${nightsBooked} nights`}
            </TextBox>
            <TextBox type="regular" size={18} color={GREY}>
              €{price}
            </TextBox>
          </View>
        </View>
        {this.renderCheckInButton(status)}
        {this.renderCheckOutButton(status)}
        {this.renderOnHoldButton(status)}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  backgroundGradient: {
    position: 'absolute',
    height: '120%',
    width: '100%'
  },
  imageGradient: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  contentContainer: {
    backgroundColor: WHITE,
    width: SCREEN_WIDTH
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 3
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  imageOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: SCREEN_HEIGHT / 8,
    bottom: 0
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  button: {
    height: 50,
    width: SCREEN_WIDTH - 20,
    overflow: 'hidden',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
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
  { deleteReservation }
)(ReservationExpanded);
