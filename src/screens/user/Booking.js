import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import uuid from 'uuid';

import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  Header,
  CachedImage,
  Button,
  TextBox,
  Hr,
  Loading
} from '../../components/common';
import { LIGHT_GREY, GREY, WHITE, MAIN_BLUE, GOLD } from '../../../assets/colors';
import {
  CAROUSEL_PERSONS,
  CAROUSEL_ROOMS,
  getDates,
  myIndexOf
} from '../../components/booking/CarouselService';
import BookingCarousel from '../../components/booking/BookingCarousel';
import { BOOK } from '../../endpoints';
import { addReservation } from '../../actions';

let overlayTop = 20;
if (SCREEN_HEIGHT === 812 || SCREEN_WIDTH === 812) {
  overlayTop = 50;
}

class Booking extends Component {
  constructor(props) {
    super(props);

    this.onPressBook = this.onPressBook.bind(this);

    const roomId = props.navigation.getParam('id');
    const { hotelName } = props.navigation.getParam('name');
    this.selectedRoom = {};
    this.selectedHotel = {};

    for (const hotel of props.hotels) {
      if (hotel.name === hotelName) {
        this.selectedHotel = hotel;
      }
    }

    for (const room of this.selectedHotel.rooms.roomTypes) {
      if (room._id === roomId._id) {
        this.selectedRoom = room;
      }
    }

    // Get an array of all dates of the year
    const startDate = moment().startOf('year');
    const stopDate = moment().endOf('year');
    const dates = getDates(startDate, stopDate);

    // Get an array of all months
    const months = moment.monthsShort();

    // Get the current date and create an object with it's day of the month, week day and month
    const currentDate = moment();
    const currentDateObject = {
      dayOfWeek: moment(currentDate).format('ddd'),
      dayOfMonth: moment(currentDate).format('D'),
      month: moment(currentDate).format('MMM')
    };

    const today = {
      dayOfMonth: moment(currentDate).format('D'),
      month: moment(currentDate).format('MMM'),
      year: moment(currentDate).format('YYYY')
    };

    // Get the next day and create an object with it's day of the month, week day and month
    const nextDate = moment(currentDate).add(1, 'days');
    const nextDateObject = {
      dayOfWeek: moment(nextDate).format('ddd'),
      dayOfMonth: moment(nextDate).format('D'),
      month: moment(nextDate).format('MMM')
    };

    // Get the current month
    const currentMonth = currentDateObject.month;
    const currentMonthIndex = months.indexOf(currentMonth);

    // Get the dates of the current month to display on the carousel
    const displayDates = [];
    for (const date of dates) {
      if (date.month === currentMonth) {
        displayDates.push(date);
      }
    }

    // Get the index of today to display as the active date
    let activeDayIndex = 0;
    for (const date of displayDates) {
      if (date.dayOfMonth === currentDateObject.dayOfMonth && date.month === currentMonth) {
        activeDayIndex = displayDates.indexOf(date);
      }
    }

    // Get the index of the dates in the dates array
    const checkInDateIndex = myIndexOf(dates, currentDateObject);
    const checkOutDateIndex = myIndexOf(dates, nextDateObject);

    this.state = {
      dates,
      months,
      displayDates,
      today,
      currentDateObject,
      activeDayIndex,
      activeMonthIndex: currentMonthIndex,
      checkIn: currentDateObject,
      checkOut: nextDateObject,
      editCheckIn: false,
      editCheckOut: false,
      persons: CAROUSEL_PERSONS,
      activePersonsIndex: 1,
      rooms: CAROUSEL_ROOMS,
      activeRoomsIndex: 1,
      checkInDateIndex,
      checkOutDateIndex,
      checkInSelected: false,
      checkOutSelected: false,
      nightsBooked: 1,
      pricePerRoom: this.selectedRoom.price,
      priceMultiplier: 2,
      loading: false,
      scroll: false
    };
  }

  componentDidUpdate() {
    if (this.state.checkInSelected) {
      const nightsBooked = this.state.checkOutDateIndex - this.state.checkInDateIndex;
      this.setState({ nightsBooked, checkInSelected: false });
    }

    if (this.state.checkOutSelected) {
      const nightsBooked = this.state.checkOutDateIndex - this.state.checkInDateIndex;
      this.setState({ nightsBooked, checkOutSelected: false });
    }
  }

  onChangeDays(index) {
    // Get the day (number) that is active
    const activeDay = this.state.displayDates[index];
    this.setState({ activeDayIndex: index, currentDateObject: activeDay });
  }

  onChangeMonths(index) {
    // Get the current month
    const currentMonth = this.state.months[index];

    // Get the dates of the current month to display on the carousel
    const displayDates = [];
    for (const date of this.state.dates) {
      if (date.month === currentMonth) {
        displayDates.push(date);
      }
    }

    // Get the index of today to display as the active date
    let activeDayIndex = 0;
    for (const date of displayDates) {
      if (
        date.dayOfMonth === this.state.currentDateObject.dayOfMonth &&
        date.month === currentMonth
      ) {
        activeDayIndex = displayDates.indexOf(date);
      }
    }
    this.carousel.snapToItem(activeDayIndex);

    this.setState({
      displayDates,
      activeDayIndex,
      activeMonthIndex: index
    });
  }

  onChangeRooms(index) {
    const priceMultiplier = index + 1;
    this.setState({ activeRoomsIndex: index, priceMultiplier });
  }

  onPressBook() {
    const { firstName, lastName, picture, id } = this.props.user;
    const {
      nightsBooked,
      pricePerRoom,
      priceMultiplier,
      months,
      today,
      activePersonsIndex,
      activeRoomsIndex,
      checkIn,
      checkOut
    } = this.state;
    const rooms = activeRoomsIndex + 1;
    const persons = activePersonsIndex + 1;
    const price = nightsBooked * pricePerRoom * priceMultiplier;
    const { dayOfMonth, month } = checkIn;
    const { name, street, city, country, firstImage } = this.selectedHotel;
    const { roomTypeName, roomImage } = this.selectedRoom;

    let { year } = today;
    if (month < months.indexOf(today.month) || dayOfMonth < today.dayOfMonth) {
      year++;
    }

    const checkInObject = checkIn;
    checkInObject.year = year;
    checkInObject.dayOfWeek = moment(
      `${checkIn.dayOfMonth}-${checkIn.month}-${year}`,
      'DD-MMM-YYYY'
    ).format('dddd');

    const checkOutObject = checkOut;
    checkOutObject.year = year;
    checkOutObject.dayOfWeek = moment(
      `${checkOut.dayOfMonth}-${checkOut.month}-${year}`,
      'DD-MMM-YYYY'
    ).format('dddd');

    const reservation = {
      id: uuid.v4(),
      userId: id,
      userImage: picture,
      firstName,
      lastName,
      hotel: name,
      hotelImage: firstImage,
      street,
      city,
      country,
      room: roomTypeName,
      roomImage,
      price,
      nightsBooked,
      persons,
      roomsBooked: rooms,
      checkIn: checkInObject,
      checkOut: checkOutObject
    };

    Alert.alert(
      'Confirmation',
      'Are you sure you want to book this room?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => this.onPressOk(reservation)
        }
      ],
      { cancelable: false }
    );
  }

  onPressOk(reservation) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.props.user.token
      }
    };

    this.setState({ loading: true });

    axios
      .post(BOOK, reservation, config)
      .then(response => {
        if (response.status === 200) {
          this.setState({ loading: false });
          this.props.addReservation(reservation);
          Alert.alert('Success', 'Your request has been registered!', [{ text: 'OK' }], {
            cancelable: false
          });
        }
      })
      .catch(err => {
        if (err) {
          this.setState({ loading: false });
          Alert.alert(
            'Error',
            'Could not register your request. Please try again!',
            [
              {
                text: 'OK'
              }
            ],
            { cancelable: false }
          );
        }
      });
  }

  setDate() {
    const {
      editCheckIn,
      editCheckOut,
      displayDates,
      dates,
      months,
      activeDayIndex,
      activeMonthIndex,
      checkIn,
      checkOut
    } = this.state;

    if (editCheckIn) {
      const checkInObject = displayDates[activeDayIndex];
      checkInObject.month = months[activeMonthIndex];
      const checkInDateIndex = dates.indexOf(checkInObject);
      const checkInObjectIndex = displayDates.indexOf(checkInObject);

      if (months.indexOf(checkInObject.month) > months.indexOf(checkOut.month)) {
        if (checkInObject.dayOfMonth - checkOut.dayOfMonth >= 0) {
          const checkOutObject = displayDates[checkInObjectIndex + 1];
          checkOutObject.month = checkInObject.month;
          const checkOutDateIndex = dates.indexOf(checkOutObject);
          this.setState({ checkOut: checkOutObject, checkOutDateIndex });
        }

        const checkOutObject = dates[checkInDateIndex + 1];
        checkOutObject.month = checkInObject.month;
        const checkOutDateIndex = dates.indexOf(checkOutObject);
        this.setState({ checkOut: checkOutObject, checkOutDateIndex });
      } else if (months.indexOf(checkInObject.month) === months.indexOf(checkOut.month)) {
        if (checkInObject.dayOfMonth - checkOut.dayOfMonth >= 0) {
          const checkOutObject = displayDates[checkInObjectIndex + 1];
          checkOutObject.month = checkOut.month;
          const checkOutDateIndex = dates.indexOf(checkOutObject);
          this.setState({ checkOut: checkOutObject, checkOutDateIndex });
        }
      }

      this.setState({
        checkIn: checkInObject,
        checkInDateIndex,
        checkInSelected: true,
        editCheckIn: false
      });
    } else if (editCheckOut) {
      const checkOutObject = displayDates[activeDayIndex];
      checkOutObject.month = months[activeMonthIndex];
      const checkOutDateIndex = dates.indexOf(checkOutObject);
      const checkOutObjectIndex = displayDates.indexOf(checkOutObject);

      if (months.indexOf(checkIn.month) > months.indexOf(checkOutObject.month)) {
        const checkInObject = displayDates[checkOutObjectIndex - 1];
        checkInObject.month = checkOutObject.month;
        const checkInDateIndex = dates.indexOf(checkInObject);
        this.setState({ checkIn: checkInObject, checkInDateIndex });
      } else if (
        months.indexOf(checkIn.month) === months.indexOf(checkOutObject.month) &&
        checkOutObject.dayOfMonth - checkIn.dayOfMonth < 0
      ) {
        const checkInObject = displayDates[checkOutObjectIndex - 1];
        const checkInDateIndex = dates.indexOf(checkInObject);
        this.setState({ checkIn: checkInObject, checkInDateIndex });
      }

      this.setState({
        checkOut: checkOutObject,
        checkOutDateIndex,
        checkOutSelected: true,
        editCheckOut: false
      });
    }
  }

  getContainerHeight(event) {
    const { height } = event.nativeEvent.layout;
    if (height < 690) this.setState({ scroll: true });
  }

  editChecks(check) {
    if (check === 'in') {
      this.setState({ editCheckIn: !this.state.editCheckIn });
      if (this.state.editCheckOut) {
        this.setState({ editCheckOut: false });
      }
    } else if (check === 'out') {
      this.setState({ editCheckOut: !this.state.editCheckOut });
      if (this.state.editCheckIn) {
        this.setState({ editCheckIn: false });
      }
    }
  }

  render() {
    const {
      container,
      imageContainer,
      image,
      rowContainer,
      checksContainer,
      checkTextContainer,
      dates,
      setButton,
      editChecks,
      button,
      buttonContainer,
      imageOverlayContainer
    } = styles;
    const { roomTypeName, roomImage } = this.selectedRoom;

    return (
      <SafeAreaView forceInset={{ bottom: 'always', top: 'never' }} style={container}>
        {this.state.loading ? <Loading /> : null}
        <Header
          title={roomTypeName}
          backArrow
          home
          onBackPress={() => this.props.navigation.goBack()}
          onHomePress={() => this.props.navigation.navigate('User')}
        />
        <View
          onLayout={event => {
            this.getContainerHeight(event);
          }}
          style={container}
        >
          <ScrollView scrollEnabled={this.state.scroll} showsVerticalScrollIndicator={false}>
            <View style={imageContainer}>
              <CachedImage source={{ uri: roomImage }} style={image} />
              <LinearGradient
                colors={['rgba(24, 108, 196, 0.8)', 'transparent']}
                start={[0.5, 1]}
                end={[0.5, 0]}
                locations={[0.4, 1]}
                style={styles.gradient}
              />
            </View>
            <View style={imageOverlayContainer}>
              <TextBox type="regular" size={22} color={WHITE}>
                {this.state.nightsBooked === 1
                  ? `PRICE FOR ${this.state.nightsBooked} NIGHT`
                  : `PRICE FOR ${this.state.nightsBooked} NIGHTS`}
              </TextBox>
              <Hr containerStyle={{ width: 70, margin: 5 }} lineStyle={{ backgroundColor: GOLD }} />
              <TextBox type="regular" size={26} color={WHITE}>
                €{this.state.nightsBooked * this.state.pricePerRoom * this.state.priceMultiplier}
              </TextBox>
            </View>
            <View style={rowContainer}>
              <TouchableWithoutFeedback onPress={() => this.editChecks('in')}>
                <View style={[checksContainer, this.state.editCheckIn ? editChecks : null]}>
                  <View style={checkTextContainer}>
                    <TextBox type="regular" color={GREY} size={12}>
                      CHECK IN
                    </TextBox>
                  </View>
                  <View style={dates}>
                    <TextBox type="semi-bold" color={MAIN_BLUE} size={20}>
                      {this.state.editCheckIn
                        ? this.state.displayDates[this.state.activeDayIndex].dayOfMonth
                        : this.state.checkIn.dayOfMonth}
                    </TextBox>
                    <TextBox type="semi-bold" color={MAIN_BLUE} size={12}>
                      {this.state.editCheckIn
                        ? this.state.months[this.state.activeMonthIndex].toUpperCase()
                        : this.state.checkIn.month.toUpperCase()}
                    </TextBox>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <Button
                title="SET"
                textColor={WHITE}
                gradient
                onPress={() => this.setDate()}
                buttonStyle={setButton}
              />
              <TouchableWithoutFeedback onPress={() => this.editChecks('out')}>
                <View style={[checksContainer, this.state.editCheckOut ? editChecks : null]}>
                  <View style={checkTextContainer}>
                    <TextBox type="regular" color={GREY} size={12}>
                      CHECK OUT
                    </TextBox>
                  </View>
                  <View style={dates}>
                    <TextBox type="semi-bold" color={MAIN_BLUE} size={20}>
                      {this.state.editCheckOut
                        ? this.state.displayDates[this.state.activeDayIndex].dayOfMonth
                        : this.state.checkOut.dayOfMonth}
                    </TextBox>
                    <TextBox type="semi-bold" color={MAIN_BLUE} size={12}>
                      {this.state.editCheckOut
                        ? this.state.months[this.state.activeMonthIndex].toUpperCase()
                        : this.state.checkOut.month.toUpperCase()}
                    </TextBox>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <BookingCarousel
              reference={c => {
                this.carousel = c;
              }}
              type="days"
              data={this.state.displayDates}
              active={this.state.activeDayIndex}
              onSnapToItem={slideIndex => {
                this.onChangeDays(slideIndex);
              }}
            />
            <BookingCarousel
              type="months"
              data={this.state.months}
              active={this.state.activeMonthIndex}
              onSnapToItem={slideIndex => {
                this.onChangeMonths(slideIndex);
              }}
            />
            <BookingCarousel
              type="occupancy"
              data={this.state.persons}
              active={this.state.activePersonsIndex}
              onSnapToItem={slideIndex => {
                this.setState({ activePersonsIndex: slideIndex });
              }}
            />
            <BookingCarousel
              type="occupancy"
              data={this.state.rooms}
              active={this.state.activeRoomsIndex}
              onSnapToItem={slideIndex => {
                this.onChangeRooms(slideIndex);
              }}
            />
            <View style={buttonContainer}>
              <Button
                title="BOOK NOW"
                textColor={WHITE}
                gradient
                onPress={this.onPressBook}
                buttonStyle={button}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: 'center'
  },
  imageContainer: {
    height: SCREEN_HEIGHT / 3,
    width: SCREEN_WIDTH
  },
  image: {
    height: '100%',
    width: '100%'
  },
  gradient: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    bottom: 0
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checksContainer: {
    flex: 1,
    height: 90,
    borderWidth: 2,
    borderColor: WHITE,
    borderRadius: 5,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: WHITE,
    bottom: 36,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 5,
    shadowOpacity: 0.5
  },
  editChecks: {
    borderWidth: 2,
    borderColor: MAIN_BLUE
  },
  checkTextContainer: {
    height: 35,
    borderBottomWidth: 1,
    borderColor: LIGHT_GREY,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dates: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  setButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    height: 40,
    width: 60,
    bottom: 45
  },
  carouselContainer: {
    height: 60,
    borderTopWidth: 1,
    borderColor: LIGHT_GREY,
    backgroundColor: WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 4,
    shadowOpacity: 0.5
  },
  datesCarouselItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  },
  occupancyCarouselItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: GREY,
    height: 35
  },
  button: {
    height: 50,
    width: SCREEN_WIDTH - 50,
    overflow: 'hidden',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  imageOverlayContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: SCREEN_HEIGHT / 3,
    top: overlayTop
  },
  screenOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#000',
    opacity: 0.3,
    zIndex: 3
  }
});

const mapStateToProps = state => {
  return {
    hotels: state.hotelsArray.hotels,
    user: state.user
  };
};

export default connect(mapStateToProps, { addReservation })(Booking);
