import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import moment from 'moment';
import { LinearGradient } from 'expo';

import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  Header,
  CachedImage,
  Button,
  TextBox,
  Hr
} from '../components/common';
import { LIGHT_BLUE, LIGHT_GREY, GREY, WHITE, MAIN_BLUE } from '../../assets/colors';
import { CAROUSEL_PERSONS, CAROUSEL_ROOMS, getDates } from '../components/booking/CarouselService';
import BookingCarousel from '../components/booking/BookingCarousel';

class Booking extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    const roomId = this.props.navigation.state.params.id._id;
    const { hotelName } = this.props.navigation.state.params.name;
    this.selectedRoom = {};
    this.selectedHotel = {};

    for (const hotel of this.props.hotels) {
      if (hotel.name === hotelName) {
        this.selectedHotel = hotel;
      }
    }

    for (const room of this.selectedHotel.rooms.roomTypes) {
      if (room._id === roomId) {
        this.selectedRoom = room;
      }
    }
  }

  state = {
    dates: [],
    months: [],
    displayDates: [],
    currentDateObject: {},
    activeDayIndex: 0,
    activeMonthIndex: 0,
    checkIn: {},
    checkOut: {},
    editCheckIn: false,
    editCheckOut: false,
    persons: [],
    activePersonsIndex: 1,
    rooms: [],
    activeRoomsIndex: 1,
    nightsBooked: 1,
    totalPrice: 0
  };

  componentWillMount() {
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

    // Get the next day and create an object with it's day of the month, week day and month
    const nextDate = moment(currentDate).add(1, 'days');
    const nextDateObject = {
      dayOfWeek: moment(nextDate).format('ddd'),
      dayOfMonth: moment(nextDate).format('D'),
      month: moment(nextDate).format('MMM')
    };

    // Get the previous, current and next month
    const currentMonth = currentDateObject.month;
    const currentMonthIndex = months.indexOf(currentMonth);
    const previousMonth = months[currentMonthIndex - 1];
    const nextMonth = months[currentMonthIndex + 1];

    // Get the dates of the previous, current and next month to display on the carousel
    const displayDates = [];
    for (const date of dates) {
      if (date.month === currentMonth || date.month === previousMonth || date.month === nextMonth) {
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

    this.setState({
      dates,
      months,
      checkIn: currentDateObject,
      checkOut: nextDateObject,
      activeMonthIndex: currentMonthIndex,
      activeDayIndex,
      currentDateObject,
      displayDates,
      persons: CAROUSEL_PERSONS,
      rooms: CAROUSEL_ROOMS,
      totalPrice: this.selectedRoom.price
    });
  }

  onChangeDays(index) {
    // Get the day (number) that is active
    const activeDay = this.state.displayDates[index];
    this.setState({ activeDayIndex: index, currentDateObject: activeDay });
  }

  onChangeMonths(index) {
    // Get the previous, current and next month
    const currentMonth = this.state.months[index];
    const previousMonth = this.state.months[index - 1];
    const nextMonth = this.state.months[index + 1];

    // Get the dates of the previous, current and next month to display on the carousel
    const displayDates = [];
    for (const date of this.state.dates) {
      if (date.month === currentMonth || date.month === previousMonth || date.month === nextMonth) {
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

  setDate(price) {
    if (this.state.editCheckIn) {
      const checkInObject = this.state.displayDates[this.state.activeDayIndex];
      checkInObject.month = this.state.months[this.state.activeMonthIndex];
      const checkOutObject = this.state.displayDates[this.state.activeDayIndex + 1];
      checkOutObject.month = this.state.months[this.state.activeMonthIndex];

      const checkInDateIndex = this.state.displayDates.indexOf(checkInObject);
      const checkOutDateIndex = this.state.displayDates.indexOf(checkOutObject);
      const nightsBooked = checkOutDateIndex - checkInDateIndex;
      const totalPrice = nightsBooked * price;

      this.setState({
        checkIn: checkInObject,
        checkOut: checkOutObject,
        editCheckIn: false,
        nightsBooked,
        totalPrice
      });
    } else if (this.state.editCheckOut) {
      const checkOutObject = this.state.displayDates[this.state.activeDayIndex];
      checkOutObject.month = this.state.months[this.state.activeMonthIndex];

      const checkInDateIndex = this.state.displayDates.indexOf(this.state.checkIn);
      const checkOutDateIndex = this.state.displayDates.indexOf(checkOutObject);
      const nightsBooked = checkOutDateIndex - checkInDateIndex;
      const totalPrice = nightsBooked * price;

      this.setState({
        checkOut: checkOutObject,
        editCheckOut: false,
        nightsBooked,
        totalPrice
      });
    }
  }

  editChecks(check) {
    if (check === 'in') {
      this.setState({ editCheckIn: !this.state.editCheckIn });
      if (this.state.editCheckOut) {
        this.setState({ editCheckOut: false });
      }
    } else if (check === 'out') {
      this.carousel.snapToItem(this.state.activeDayIndex + 1);
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
      button
    } = styles;
    const { roomTypeName, roomImage, price } = this.selectedRoom;

    return (
      <SafeAreaView forceInset={{ bottom: 'always', top: 'never' }} style={container}>
        <Header title={roomTypeName} backArrow onBackPress={() => this.props.navigation.goBack()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={imageContainer}>
            <CachedImage source={{ uri: roomImage }} style={image} />
            <LinearGradient
              colors={[LIGHT_BLUE, 'transparent']}
              start={[0.5, 1]}
              end={[0.5, 0]}
              style={styles.gradient}
            />
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
              onPress={() => this.setDate(price)}
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
              this.setState({ activeRoomsIndex: slideIndex });
            }}
          />
          {/* <View style={rowContainer}>
            <View style={leftColumnContainer}>
              <TextBox type="regular" size={16} color={MAIN_BLUE}>
                PRICE PER NIGHT
              </TextBox>
            </View>
            <View style={rightColumnContainer}>
              <TextBox type="regular" size={16} color={GREY}>
                €{price}
              </TextBox>
            </View>
          </View> */}
          <View style={rowContainer}>
            <TextBox type="regular" size={20} color={MAIN_BLUE} style={{ paddingTop: 10 }}>
              {this.state.nightsBooked === 1
                ? `PRICE FOR ${this.state.nightsBooked} NIGHT`
                : `PRICE FOR ${this.state.nightsBooked} NIGHTS`}
            </TextBox>
          </View>
          <View style={rowContainer}>
            <Hr containerStyle={{ width: 60, margin: 5 }} />
          </View>
          <View style={rowContainer}>
            <TextBox type="regular" size={24} color={GREY} style={{ marginBottom: 10 }}>
              €{this.state.totalPrice}
            </TextBox>
          </View>
          <Button
            title="BOOK NOW"
            textColor={WHITE}
            gradient
            onPress={() => console.log('Pressed!')}
            buttonStyle={button}
          />
        </ScrollView>
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
    top: '30%',
    height: '70%',
    width: '100%'
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
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    hotels: state.hotelsReducer.hotels
  };
};

export default connect(mapStateToProps)(Booking);
