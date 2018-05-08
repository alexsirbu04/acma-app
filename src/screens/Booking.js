import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import moment from 'moment';
import { LinearGradient } from 'expo';
import Carousel from 'react-native-snap-carousel';

import { SCREEN_HEIGHT, SCREEN_WIDTH, Header, CachedImage, Button, TextBox } from '../components/common';
import { LIGHT_BLUE, LIGHT_GREY, GREY, WHITE, MAIN_BLUE } from '../../assets/colors';
import { CAROUSEL_PERSONS, CAROUSEL_ROOMS } from '../components/rooms/CarouselArrays';

class Booking extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    const roomId = this.props.navigation.state.params.id._id;
    const hotelName = this.props.navigation.state.params.name.hotelName;
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

    this.renderDaysItem = this.renderDaysItem.bind(this);
    this.renderMonthsItem = this.renderMonthsItem.bind(this);
    this.renderPersonsItem = this.renderPersonsItem.bind(this);
    this.renderRoomsItem = this.renderRoomsItem.bind(this);
  }

  state = {
    dates: [],
    months: [],
    displayDates: [],
    currentDate: {},
    activeDay: '',
    activeDayIndex: 0,
    activeMonthIndex: 0,
    checkIn: {},
    checkOut: {},
    editCheckIn: false,
    editCheckOut: false,
    persons: [],
    activePersonsIndex: 1,
    rooms: [],
    activeRoomsIndex: 1
  }

  componentWillMount() {
    // Get an array of all dates of the year
    const startDate = moment().startOf('year');
    const stopDate = moment().endOf('year');
    const dates = this.getDates(startDate, stopDate);

    // Get an array of all months
    const months = moment.monthsShort();
    // Get the current date and create an object with it's day of the month, week day and month
    const currentDate = moment();
    const currentDateObject = {
      dayOfWeek: moment(currentDate).format('ddd'),
      dayOfMonth: moment(currentDate).format('D'),
      month: moment(currentDate).format('MMM')
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
      currentDate: currentDateObject,
      checkIn: currentDateObject, 
      checkOut: currentDateObject,
      activeMonthIndex: currentMonthIndex,
      activeDayIndex,
      displayDates,
      persons: CAROUSEL_PERSONS,
      rooms: CAROUSEL_ROOMS
    });
  }

  onChangeDays(index) {
    // Get the day (number) that is active
    const activeDate = this.state.displayDates[index];
    const activeDay = activeDate.dayOfMonth;
    this.setState({ activeDayIndex: index, activeDay });
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
      if (date.dayOfMonth === this.state.activeDay && date.month === currentMonth) {
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

  getDates(start, stop) {
    // Method to get an array of dates between 2 dates
    const dateArray = [];
    let currentDate = moment(start);
    const stopDate = moment(stop);
    while (currentDate <= stopDate) {
        const dateObj = { 
          dayOfWeek: moment(currentDate).format('ddd'),
          dayOfMonth: moment(currentDate).format('D'),
          month: moment(currentDate).format('MMM')
        };

        dateArray.push(dateObj);
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  }

  setDate() {
    if (this.state.editCheckIn) {
      const checkInObject = this.state.displayDates[this.state.activeDayIndex];
      checkInObject.month = this.state.months[this.state.activeMonthIndex];
      this.setState({ 
        checkIn: checkInObject, 
        editCheckIn: false
      });
    } else if (this.state.editCheckOut) {
      const checkOutObject = this.state.displayDates[this.state.activeDayIndex];
      checkOutObject.month = this.state.months[this.state.activeMonthIndex];
      this.setState({ 
        checkOut: checkOutObject,
        editCheckOut: false
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
      this.setState({ editCheckOut: !this.state.editCheckOut });
      if (this.state.editCheckIn) {
        this.setState({ editCheckIn: false });
      }
    }
  }

  renderDaysItem({ item, index }) {
    const { 
      datesCarouselItemContainer
    } = styles;

    if (index === this.state.activeDayIndex) {
      return (
        <View style={datesCarouselItemContainer}>
          <TextBox type='regular' color={MAIN_BLUE} size={16} style={{ borderColor: MAIN_BLUE, paddingBottom: 2 }}>
            {item.dayOfWeek}
          </TextBox>
          <TextBox type='regular' color={MAIN_BLUE} size={16} style={{ borderColor: MAIN_BLUE }}>
            {item.dayOfMonth}
          </TextBox>
        </View>
      );
    }

    return (
      <View style={datesCarouselItemContainer}>
        <TextBox type='regular' color={GREY} size={14} style={{ paddingBottom: 2 }}>
          {item.dayOfWeek}
        </TextBox>
        <TextBox type='regular' color={GREY} size={14}>
          {item.dayOfMonth}
        </TextBox>
      </View>
    );
  }

  renderMonthsItem({ item, index }) {
    const { 
      datesCarouselItemContainer
    } = styles;

    if (index === this.state.activeMonthIndex) {
      return (
        <View style={datesCarouselItemContainer}>
          <TextBox type='regular' color={MAIN_BLUE} size={16}>{item.toUpperCase()}</TextBox>
        </View>
      );
    }

    return (
      <View style={datesCarouselItemContainer}>
        <TextBox type='regular' color={GREY} size={14}>{item.toUpperCase()}</TextBox>
      </View>
    );
  }

  renderPersonsItem({ item, index }) {
    const { 
      occupancyCarouselItemContainer
    } = styles;

    if (index === this.state.activePersonsIndex) {
      return (
        <View style={[occupancyCarouselItemContainer, { borderColor: MAIN_BLUE }]}>
          <TextBox type='regular' color={MAIN_BLUE} size={16}>{item}</TextBox>
        </View>
      );
    }

    return (
      <View style={occupancyCarouselItemContainer}>
        <TextBox type='regular' color={GREY} size={14}>{item}</TextBox>
      </View>
    );
  }

  renderRoomsItem({ item, index }) {
    const { 
      occupancyCarouselItemContainer
    } = styles;

    if (index === this.state.activeRoomsIndex) {
      return (
        <View style={[occupancyCarouselItemContainer, { borderColor: MAIN_BLUE }]}>
          <TextBox type='regular' color={MAIN_BLUE} size={16}>{item}</TextBox>
        </View>
      );
    }

    return (
      <View style={occupancyCarouselItemContainer}>
        <TextBox type='regular' color={GREY} size={14}>{item}</TextBox>
      </View>
    );
  }

  render() {
    const {
      container,
      imageContainer,
      image,
      checksContainer,
      checkInOutContainer,
      checkTextContainer,
      dates,
      setButton,
      carouselContainer,
      editChecks,
      button
    } = styles;
    const { 
      roomTypeName,
      roomImage 
    } = this.selectedRoom;

    return (
      <SafeAreaView forceInset={{ bottom: 'always', top: 'never' }} style={container}>
        <Header title={roomTypeName} backArrow onBackPress={() => this.props.navigation.goBack()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={imageContainer}>
            <CachedImage
              source={{ uri: roomImage }}
              style={image} 
            />
            <LinearGradient
              colors={[LIGHT_BLUE, 'transparent']}
              start={[0.5, 1]}
              end={[0.5, 0]}
              style={styles.gradient}
            />
          </View>
          <View style={checksContainer}>
            <TouchableWithoutFeedback onPress={() => this.editChecks('in')}>
              <View style={[checkInOutContainer, this.state.editCheckIn ? editChecks : null]}>
                <View style={checkTextContainer}>
                <TextBox type='regular' color={GREY} size={10}>CHECK IN</TextBox>
                </View>
                <View style={dates}>
                  <TextBox type='semi-bold' color={MAIN_BLUE} size={20}>
                    {
                      this.state.editCheckIn 
                        ? 
                      this.state.displayDates[this.state.activeDayIndex].dayOfMonth 
                        : 
                      this.state.checkIn.dayOfMonth
                    }
                  </TextBox>
                  <TextBox type='semi-bold' color={MAIN_BLUE} size={10}>
                    {
                      this.state.editCheckIn
                        ?
                      this.state.months[this.state.activeMonthIndex].toUpperCase()
                        :
                      this.state.checkIn.month.toUpperCase()
                    }
                  </TextBox>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <Button
              title='SET'
              textColor={WHITE}
              gradient
              onPress={() => this.setDate()}
              buttonStyle={setButton}
            />
            <TouchableWithoutFeedback onPress={() => this.editChecks('out')}>
              <View style={[checkInOutContainer, this.state.editCheckOut ? editChecks : null]}>
                <View style={checkTextContainer}>
                  <TextBox type='regular' color={GREY} size={10}>CHECK OUT</TextBox>
                </View>
                <View style={dates}>
                  <TextBox type='semi-bold' color={MAIN_BLUE} size={20}>
                    {
                      this.state.editCheckOut 
                        ? 
                      this.state.displayDates[this.state.activeDayIndex].dayOfMonth 
                        : 
                      this.state.checkOut.dayOfMonth
                    }
                  </TextBox>
                  <TextBox type='semi-bold' color={MAIN_BLUE} size={10}>
                    {
                      this.state.editCheckOut 
                        ? 
                      this.state.months[this.state.activeMonthIndex].toUpperCase()
                        : 
                      this.state.checkOut.month.toUpperCase()
                    }
                  </TextBox>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={carouselContainer}>
            <Carousel
              ref={(c) => { this.carousel = c; }}
              data={this.state.displayDates}
              renderItem={this.renderDaysItem}
              sliderWidth={SCREEN_WIDTH}
              itemWidth={60}
              firstItem={this.state.activeDayIndex}
              inactiveSlideOpacity={0.6}
              inactiveSlideScale={1}
              onSnapToItem={(slideIndex) => { this.onChangeDays(slideIndex); }}
              contentContainerCustomStyle={{ justifyContent: 'center', alignItems: 'center' }}
            />
          </View>
          <View style={carouselContainer}>
            <Carousel
              data={this.state.months}
              renderItem={this.renderMonthsItem}
              sliderWidth={SCREEN_WIDTH}
              itemWidth={60}
              firstItem={this.state.activeMonthIndex}
              inactiveSlideOpacity={0.6}
              inactiveSlideScale={1}
              onSnapToItem={(slideIndex) => { this.onChangeMonths(slideIndex); }}
              contentContainerCustomStyle={{ justifyContent: 'center', alignItems: 'center' }}
            />
          </View>
          <View style={carouselContainer}>
            <Carousel
              data={this.state.persons}
              renderItem={this.renderPersonsItem}
              sliderWidth={SCREEN_WIDTH}
              itemWidth={120}
              firstItem={this.state.activePersonsIndex}
              inactiveSlideOpacity={0.6}
              inactiveSlideScale={1}
              onSnapToItem={(slideIndex) => { this.setState({ activePersonsIndex: slideIndex }); }}
              contentContainerCustomStyle={{ justifyContent: 'center', alignItems: 'center' }}
            />
          </View>
          <View style={carouselContainer}>
            <Carousel
              data={this.state.rooms}
              renderItem={this.renderRoomsItem}
              sliderWidth={SCREEN_WIDTH}
              itemWidth={120}
              firstItem={this.state.activeRoomsIndex}
              inactiveSlideOpacity={0.6}
              inactiveSlideScale={1}
              onSnapToItem={(slideIndex) => { this.setState({ activeRoomsIndex: slideIndex }); }}
              contentContainerCustomStyle={{ justifyContent: 'center', alignItems: 'center' }}
            />
          </View>
          <Button
            title='BOOK NOW'
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
  checksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkInOutContainer: {
    flex: 1,
    height: 90,
    borderWidth: 2,
    borderColor: WHITE,
    borderRadius: 5,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: WHITE,
    bottom: 36,
    elevation: 5,
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
