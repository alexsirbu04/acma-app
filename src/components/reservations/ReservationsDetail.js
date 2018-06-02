import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import { ONHOLD } from '../../constants';
import { SCREEN_WIDTH, TextBox, Swipeable, Loading, Button } from '../common';
import { WHITE, GREY } from '../../../assets/colors';
import StoreProvider from '../../store/StoreProvider';

class ReservationsDetail extends Component {
  constructor(props) {
    super(props);

    this.onCheckIn = this.onCheckIn.bind(this);
  }

  state = {
    loading: false,
    focus: false
  };

  static getDerivedStateFromProps(props) {
    if (props.reservation.status === ONHOLD) {
      return {
        focus: true
      };
    }

    return null;
  }

  onCancel(index) {
    StoreProvider.cancelReservation(index);
    this.setState({ loading: true });
  }

  onCheckIn() {
    const { persons } = this.props.reservation;
    const { navigation } = this.props;
    navigation.navigate('CheckIn', { persons });
  }

  render() {
    const { reservation, index } = this.props;
    const { hotel, hotelImage, checkIn, persons } = reservation;
    const { container, image, data, row, iconContainer, focusContainer, button } = styles;

    return (
      <Swipeable height={110} onCancel={() => this.onCancel(index)} swipe={!this.state.focus}>
        <View style={container}>
          {this.state.loading ? <Loading small /> : null}
          <View style={image}>
            <Avatar width={90} height={90} source={{ uri: hotelImage }} />
          </View>
          <View style={data}>
            <TextBox type="semi-bold" size={20} color={GREY}>
              {hotel}
            </TextBox>
            <View style={row}>
              <View style={iconContainer}>
                <Icon name="user" type="font-awesome" size={20} color={GREY} />
              </View>
              <TextBox type="regular" size={14} color={GREY} style={{ flex: 11 }}>
                Reservation for {persons} people
              </TextBox>
            </View>
            <View style={row}>
              <View style={iconContainer}>
                <Icon name="calendar" type="font-awesome" size={18} color={GREY} />
              </View>
              <TextBox type="regular" size={14} color={GREY} style={{ flex: 11 }}>
                {checkIn.dayOfWeek}, {checkIn.month} {checkIn.dayOfMonth}
              </TextBox>
            </View>
          </View>
          {/* <View style={arrow}>
        <Icon name="chevron-right" size={30} color={GREY} iconStyle={{ paddingRight: 5 }} />
      </View> */}
        </View>
        {this.state.focus ? (
          <View style={focusContainer}>
            <Button
              title="CHECK IN"
              textColor={WHITE}
              gradient
              onPress={this.onCheckIn}
              buttonStyle={button}
            />
          </View>
        ) : null}
      </Swipeable>
    );
  }
}

ReservationsDetail.propTypes = {
  navigation: PropTypes.object.isRequired,
  reservation: PropTypes.object.isRequired,
  index: PropTypes.number
};

const styles = StyleSheet.create({
  container: {
    height: 110,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    backgroundColor: WHITE
  },
  image: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  data: {
    flex: 6,
    justifyContent: 'center',
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10
  },
  arrow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 6
  },
  iconContainer: {
    flex: 1,
    marginRight: 5
  },
  focusContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(85, 85, 85, 0.7)'
  },
  button: {
    height: 50,
    width: SCREEN_WIDTH - 50,
    overflow: 'hidden',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ReservationsDetail;
