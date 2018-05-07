import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import moment from 'moment';
import { LinearGradient } from 'expo';
import Carousel from 'react-native-snap-carousel';

import { Header, CachedImage, Button } from '../components';
import { DARK_BLUE, LIGHT_BLUE, LIGHT_GREY, GREY, WHITE, MAIN_BLUE } from '../assets/colors';
import { CAROUSEL_PERSONS, CAROUSEL_ROOMS } from '../components/rooms/CarouselArrays';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

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

    for (const hotel of this.props.hotels)
      if (hotel.name === hotelName)
        this.selectedHotel = hotel;

    for (const room of this.selectedHotel.rooms.roomTypes) {
      if (room._id === roomId)
        this.selectedRoom = room;
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

  // Method to get an array of dates between 2 dates
  getDates(start, stop) {
    let dateArray = [];
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
    let displayDates = [];
    for (const date of dates) {
      if (date.month === currentMonth || date.month === previousMonth || date.month === nextMonth) {
        displayDates.push(date);
      }
    }

    // Get the index of today to display as the active date
    let activeDayIndex = 0;
    for (const date of displayDates) {
      if (date.dayOfMonth === currentDateObject.dayOfMonth && date.month === currentMonth)
        activeDayIndex = displayDates.indexOf(date);
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

  renderDaysItem({item, index}) {
    const { 
      datesCarouselItemContainerStyle, 
      carouselItemStyle,
      activeCarouselItemSTyle
    } = styles;

    if (index === this.state.activeDayIndex) {
      return (
        <View style={datesCarouselItemContainerStyle}>
          <Text style={[activeCarouselItemSTyle, { paddingBottom: 2 }]}>{item.dayOfWeek}</Text>
          <Text style={activeCarouselItemSTyle}>{item.dayOfMonth}</Text>
        </View>
      );
    }

    return(
      <View style={datesCarouselItemContainerStyle}>
        <Text style={[carouselItemStyle, { paddingBottom: 2 }]}>{item.dayOfWeek}</Text>
        <Text style={carouselItemStyle}>{item.dayOfMonth}</Text>
      </View>
    );
  }

  renderMonthsItem({item, index}) {
    const { 
      datesCarouselItemContainerStyle, 
      carouselItemStyle,
      activeCarouselItemSTyle
    } = styles;

    if (index === this.state.activeMonthIndex) {
      return (
        <View style={datesCarouselItemContainerStyle}>
          <Text style={activeCarouselItemSTyle}>{item.toUpperCase()}</Text>
        </View>
      );
    }

    return(
      <View style={datesCarouselItemContainerStyle}>
        <Text style={carouselItemStyle}>{item.toUpperCase()}</Text>
      </View>
    );
  }

  renderPersonsItem({item, index}) {
    const { 
      occupancyCarouselItemContainerStyle, 
      carouselItemStyle,
      activeCarouselItemSTyle
    } = styles;

    if (index === this.state.activePersonsIndex) {
      return (
        <View style={[occupancyCarouselItemContainerStyle, { borderColor: MAIN_BLUE }]}>
          <Text style={activeCarouselItemSTyle}>{item}</Text>
        </View>
      );
    }

    return(
      <View style={occupancyCarouselItemContainerStyle}>
        <Text style={carouselItemStyle}>{item}</Text>
      </View>
    );
  }

  renderRoomsItem({item, index}) {
    const { 
      occupancyCarouselItemContainerStyle, 
      carouselItemStyle,
      activeCarouselItemSTyle
    } = styles;

    if (index === this.state.activeRoomsIndex) {
      return (
        <View style={[occupancyCarouselItemContainerStyle, { borderColor: MAIN_BLUE }]}>
          <Text style={activeCarouselItemSTyle}>{item}</Text>
        </View>
      );
    }

    return(
      <View style={occupancyCarouselItemContainerStyle}>
        <Text style={carouselItemStyle}>{item}</Text>
      </View>
    );
  }

  onChangeDays(index) {
    // Get the day (number) that is active
    const activeDate = this.state.displayDates[index];
    const activeDay = activeDate.dayOfMonth;
    this.setState({ activeDayIndex: index, activeDay });
  }

  onChangeMonths(index) {
    console.log('Slide index: ', index);
    // Get the previous, current and next month
    const currentMonth = this.state.months[index];
    const previousMonth = this.state.months[index - 1];
    const nextMonth = this.state.months[index + 1];

    // Get the dates of the previous, current and next month to display on the carousel
    let displayDates = [];
    for (const date of this.state.dates) {
      if (date.month === currentMonth || date.month === previousMonth || date.month === nextMonth) {
        displayDates.push(date);
      }
    }

    // Get the index of today to display as the active date
    let activeDayIndex = 0;
    for (const date of displayDates) {
      if (date.dayOfMonth === this.state.activeDay && date.month === currentMonth)
        activeDayIndex = displayDates.indexOf(date);
    }
    this.carousel.snapToItem(activeDayIndex);

    this.setState({ 
      displayDates,
      activeDayIndex,
      activeMonthIndex: index 
    });
  }

  editChecks(check) {
    if (check === 'in') {
      this.setState({ editCheckIn: !this.state.editCheckIn });
      if (this.state.editCheckOut)
        this.setState({ editCheckOut: false });
    } else if (check === 'out') {
      this.setState({ editCheckOut: !this.state.editCheckOut });
      if (this.state.editCheckIn) {
        this.setState({ editCheckIn: false });
      }
    }
  }

  setDate() {
    if (this.state.editCheckIn) {
      let checkInObject = this.state.displayDates[this.state.activeDayIndex];
      checkInObject.month = this.state.months[this.state.activeMonthIndex];
      this.setState({ 
        checkIn: checkInObject, 
        editCheckIn: false
      });
    } else if (this.state.editCheckOut) {
      let checkOutObject = this.state.displayDates[this.state.activeDayIndex];
      checkOutObject.month = this.state.months[this.state.activeMonthIndex];
      this.setState({ 
        checkOut: checkOutObject,
        editCheckOut: false
      });
    }
  }

  render() {
    const {
      containerStyle,
      imageContainerStyle,
      imageStyle,
      gradientStyle,
      checksContainerStyle,
      checkInOutContainerStyle,
      checkTextContainerStyle,
      checkTextStyle,
      datesContainerStyle,
      iconCenter,
      setButtonContainerStyle,
      setButtonStyle,
      carouselContainerStyle,
      editChecksStyle,
      buttonContainerStyle,
      buttonStyle
    } = styles;
    const { 
      roomTypeName,
      roomImage 
    } = this.selectedRoom;

    return(
      <SafeAreaView forceInset={{ bottom: 'always', top: 'never' }} style={containerStyle}>
        <Header headerText={roomTypeName} backArrow={true} onBackPress={() => this.props.navigation.goBack()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={imageContainerStyle}>
            <CachedImage
              source={{ uri: roomImage }}
              style={imageStyle} 
            />
            <LinearGradient
              colors={[LIGHT_BLUE, 'transparent']}
              start={[0.5, 1]}
              end={[0.5, 0]}
              style={styles.gradientStyle}
            />
          </View>
          <View style={checksContainerStyle}>
            <TouchableWithoutFeedback onPress={() => this.editChecks('in')}>
              <View style={[checkInOutContainerStyle, this.state.editCheckIn ? editChecksStyle : null]}>
                <View style={checkTextContainerStyle}>
                  <Text style={checkTextStyle}>CHECK IN</Text>
                </View>
                <View style={datesContainerStyle}>
                  <Text style={{ color: MAIN_BLUE, fontSize: 20, fontWeight: '500' }}>
                    {
                      this.state.editCheckIn 
                        ? 
                      this.state.displayDates[this.state.activeDayIndex].dayOfMonth 
                        : 
                      this.state.checkIn.dayOfMonth
                    }
                  </Text>
                  <Text style={{ color: MAIN_BLUE, fontSize: 10, fontWeight: '500' }}>
                    {
                      this.state.editCheckIn
                        ?
                      this.state.months[this.state.activeMonthIndex].toUpperCase()
                        :
                      this.state.checkIn.month.toUpperCase()
                    }
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <Button
              title='SET'
              onPress={() => this.setDate()}
              containerStyle={setButtonContainerStyle}
              buttonStyle={setButtonStyle}
            />
            <TouchableWithoutFeedback onPress={() => this.editChecks('out')}>
              <View style={[checkInOutContainerStyle, this.state.editCheckOut ? editChecksStyle : null]}>
                <View style={checkTextContainerStyle}>
                  <Text style={checkTextStyle}>CHECK OUT</Text>
                </View>
                <View style={datesContainerStyle}>
                  <Text style={{ color: MAIN_BLUE, fontSize: 20, fontWeight: '500' }}>
                    {
                      this.state.editCheckOut 
                        ? 
                      this.state.displayDates[this.state.activeDayIndex].dayOfMonth 
                        : 
                      this.state.checkOut.dayOfMonth
                    }
                  </Text>
                  <Text style={{ color: MAIN_BLUE, fontSize: 10, fontWeight: '500' }}>
                    {
                      this.state.editCheckOut 
                        ? 
                      this.state.months[this.state.activeMonthIndex].toUpperCase()
                        : 
                      this.state.checkOut.month.toUpperCase()
                    }
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={carouselContainerStyle}>
            <Carousel
                ref={(c) => { this.carousel = c; }}
                data={this.state.displayDates}
                renderItem={this.renderDaysItem}
                sliderWidth={SCREEN_WIDTH}
                itemWidth={60}
                firstItem={this.state.activeDayIndex}
                inactiveSlideOpacity={0.6}
                inactiveSlideScale={1}
                onSnapToItem={(slideIndex) => { this.onChangeDays(slideIndex) }}
                contentContainerCustomStyle={{ justifyContent: 'center', alignItems: 'center' }}
              />
          </View>
          <View style={carouselContainerStyle}>
            <Carousel
                data={this.state.months}
                renderItem={this.renderMonthsItem}
                sliderWidth={SCREEN_WIDTH}
                itemWidth={60}
                firstItem={this.state.activeMonthIndex}
                inactiveSlideOpacity={0.6}
                inactiveSlideScale={1}
                onSnapToItem={(slideIndex) => { this.onChangeMonths(slideIndex) }}
                contentContainerCustomStyle={{ justifyContent: 'center', alignItems: 'center' }}
              />
          </View>
          <View style={carouselContainerStyle}>
            <Carousel
                data={this.state.persons}
                renderItem={this.renderPersonsItem}
                sliderWidth={SCREEN_WIDTH}
                itemWidth={120}
                firstItem={this.state.activePersonsIndex}
                inactiveSlideOpacity={0.6}
                inactiveSlideScale={1}
                onSnapToItem={(slideIndex) => { this.setState({ activePersonsIndex: slideIndex }) }}
                contentContainerCustomStyle={{ justifyContent: 'center', alignItems: 'center' }}
              />
          </View>
          <View style={carouselContainerStyle}>
            <Carousel
                data={this.state.rooms}
                renderItem={this.renderRoomsItem}
                sliderWidth={SCREEN_WIDTH}
                itemWidth={120}
                firstItem={this.state.activeRoomsIndex}
                inactiveSlideOpacity={0.6}
                inactiveSlideScale={1}
                onSnapToItem={(slideIndex) => { this.setState({ activeRoomsIndex: slideIndex }) }}
                contentContainerCustomStyle={{ justifyContent: 'center', alignItems: 'center' }}
              />
          </View>
          <Button
            title='BOOK NOW'
            onPress={() => console.log('Pressed!')}
            containerStyle={buttonContainerStyle}
            buttonStyle={buttonStyle}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: 'center'
  },
  imageContainerStyle: {
    height: SCREEN_HEIGHT / 3,
    width: SCREEN_WIDTH
  },
  imageStyle: {
    height: '100%',
    width: '100%'
  },
  gradientStyle: {
    position: 'absolute',
    top: '30%',
    height: '70%',
    width: '100%'
  },
  checksContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkInOutContainerStyle: {
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
  editChecksStyle: {
    borderWidth: 2,
    borderColor: MAIN_BLUE
  },
  checkTextContainerStyle: {
    height: 35,
    borderBottomWidth: 1,
    borderColor: LIGHT_GREY,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkTextStyle: {
    fontSize: 10,
    color: GREY
  },
  datesContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  setButtonContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    height: 40,
    bottom: 45
  },
  setButtonStyle: {
    fontWeight: '700',
    color: WHITE,
    fontSize: 16
  },
  carouselContainerStyle: {
    height: 60,
    borderBottomWidth: 1,
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
  datesCarouselItemContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  },
  occupancyCarouselItemContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: GREY,
    height: 35
  },
  carouselItemStyle: {
    fontSize: 14,
    color: GREY
  },
  activeCarouselItemSTyle: {
    fontSize: 16,
    color: MAIN_BLUE,
    borderColor: MAIN_BLUE
  },
  buttonContainerStyle: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: {
    fontWeight: '700',
    color: WHITE
  },
});

const mapStateToProps = state => {
  return {
    hotels: state.hotelsReducer.hotels
  };
};

export default connect(mapStateToProps)(Booking);