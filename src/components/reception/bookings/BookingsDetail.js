import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import { ONHOLD } from '../../../constants';
import { SCREEN_WIDTH, TextBox } from '../../common';
import { WHITE, GREY, LIGHT_GREY } from '../../../../assets/colors';

class BookingsDetail extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const { navigation, reservation } = this.props;
    navigation.navigate('ReservationExpanded', { reservation });
  }

  renderAvatar(picture, firstName, lastName) {
    const imageDimensions = 90;
    if (picture !== '') {
      return (
        <Avatar
          width={imageDimensions}
          height={imageDimensions}
          rounded
          source={{ uri: picture }}
        />
      );
    }

    const initials = String(firstName).charAt(0) + String(lastName).charAt(0);
    return <Avatar width={imageDimensions} height={imageDimensions} title={initials} rounded />;
  }

  render() {
    const { reservation } = this.props;
    const { firstName, lastName, userImage, price, persons, nightsBooked } = reservation;
    const { container, image, data, row, iconContainer, arrow } = styles;

    return (
      <TouchableWithoutFeedback onLongPress={this.onPress}>
        <View
          style={[
            container,
            {
              backgroundColor: reservation.status === ONHOLD ? LIGHT_GREY : WHITE
            }
          ]}
        >
          <View style={image}>{this.renderAvatar(userImage, firstName, lastName)}</View>
          <View style={data}>
            <TextBox type="semi-bold" size={20} color={GREY}>
              {firstName} {lastName}
            </TextBox>
            <View style={row}>
              <View style={iconContainer}>
                <Icon name="md-pricetag" type="ionicon" size={20} color={GREY} />
              </View>
              <TextBox type="regular" size={14} color={GREY} style={{ flex: 11 }}>
                € {price}
              </TextBox>
            </View>
            <View style={[row, { marginBottom: 2 }]}>
              <View style={iconContainer}>
                <Icon name="user" type="font-awesome" size={20} color={GREY} />
              </View>
              <TextBox type="regular" size={14} color={GREY} style={{ flex: 11 }}>
                Reservation for {persons} people
              </TextBox>
            </View>
            <View style={row}>
              <View style={iconContainer}>
                <Icon name="md-moon" type="ionicon" size={18} color={GREY} />
              </View>
              <TextBox type="regular" size={14} color={GREY} style={{ flex: 11 }}>
                {nightsBooked === 1 ? 'Staying for 1 night' : `Staying for ${nightsBooked} nights`}
              </TextBox>
            </View>
          </View>
          <TouchableOpacity style={arrow} onPress={this.onPress}>
            <Icon name="chevron-right" size={30} color={GREY} iconStyle={{ paddingRight: 5 }} />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

BookingsDetail.propTypes = {
  reservation: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    height: 110,
    width: SCREEN_WIDTH,
    flexDirection: 'row'
  },
  image: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5
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
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  iconContainer: {
    flex: 1,
    marginRight: 5
  }
});

export default BookingsDetail;
