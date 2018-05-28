import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

import { SCREEN_WIDTH, TextBox, Swipeable, Loading } from '../common';
import { WHITE, GREY, LIGHT_GREY } from '../../../assets/colors';
import StoreProvider from '../../store/StoreProvider';

class ReservationsDetail extends Component {
  state = {
    loading: false
  };

  onCancel(index) {
    StoreProvider.cancelReservation(index);
    this.setState({ loading: true });
  }

  render() {
    const { reservation, border, index } = this.props;
    const { hotel, hotelImage, checkIn, persons } = reservation;
    const { container, image, data, row, iconContainer } = styles;

    return (
      <Swipeable height={110} onCancel={() => this.onCancel(index)}>
        <View style={[container, { borderBottomWidth: border ? 1 : 0 }]}>
          {this.state.loading ? <Loading small /> : null}
          <View style={image}>
            <Avatar width={90} height={90} rounded source={{ uri: hotelImage }} />
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
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 110,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    backgroundColor: WHITE,
    overflow: 'hidden',
    borderColor: LIGHT_GREY
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
  }
});

export default ReservationsDetail;
