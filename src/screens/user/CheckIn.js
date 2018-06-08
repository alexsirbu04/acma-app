import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { LinearGradient } from 'expo';
import { Icon } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { connect } from 'react-redux';

import StoreProvider from '../../store/StoreProvider';
import Error from '../../components/Error';
import { SCREEN_WIDTH, Header, Input, TextBox, Button, Loading } from '../../components/common';
import {
  DARK_BLUE,
  LIGHT_BLUE,
  WHITE,
  TRANSPARENT,
  GOLD,
  LIGHT_GREY
} from '../../../assets/colors';
import { addError, deleteReservation } from '../../actions';
import { ONGOING } from '../../constants';

class CheckIn extends Component {
  constructor(props) {
    super(props);

    const persons = props.navigation.getParam('persons');
    this.reservationId = props.navigation.getParam('id');
    this.reservationIndex = props.navigation.getParam('index');

    let iterator = 0;
    const data = [];
    const guests = [];
    const guestObject = {
      name: '',
      phone: '',
      address: '',
      postalCode: '',
      city: '',
      country: ''
    };
    while (iterator < persons) {
      data.push(iterator);
      guests.push(guestObject);
      iterator++;
    }

    this.state = {
      data,
      active: 0,
      guests,
      containerHeight: 0,
      keyboardUp: false,
      loading: false
    };

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow.bind(this)
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide.bind(this)
    );
    this.onFinish = this.onFinish.bind(this);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onChangeText(prop, value, guestIndex) {
    const newState = this.state.guests.map((item, index) => {
      if (index !== guestIndex) {
        return item;
      }

      return Object.assign({}, item, { [prop]: value });
    });
    this.setState({ guests: newState });
  }

  async onFinish() {
    const { guests } = this.state;
    for (const guest of guests) {
      if (
        guest.name.length === 0 ||
        guest.phone.length === 0 ||
        guest.address.length === 0 ||
        guest.postalCode.length === 0 ||
        guest.city.length === 0 ||
        guest.country.length === 0
      ) {
        this.props.addError('Fields cannot be empty');
      }
    }

    if (this.props.error === '') {
      this.setState({ loading: true });
      await StoreProvider.addClients(guests);
      await StoreProvider.updateReservationStatus(this.reservationId, ONGOING);
      this.props.deleteReservation(this.reservationIndex);
      this.setState({ loading: false });
      Alert.alert(
        'Success',
        'Check in process has been completed',
        [{ text: 'OK', onPress: () => this.props.navigation.goBack() }],
        { cancelable: false }
      );
    }
  }

  keyboardDidShow() {
    this.setState({ containerHeight: 200, keyboardUp: true });
  }

  keyboardDidHide() {
    this.setState({ containerHeight: 0, keyboardUp: false });
  }

  validateInput(type, index) {
    switch (type) {
      case 'name':
        return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(this.state.guests[index].name);
      case 'phone':
        return /^(?:[0-9]+$)/.test(this.state.guests[index].phone);
      case 'address':
        return /^[a-zA-Z0-9\s,.'-]{3,}$/.test(this.state.guests[index].address);
      case 'postalCode':
        return /^[A-Z0-9 _]*[A-Z0-9][A-Z0-9 _]*$/.test(this.state.guests[index].postalCode);
      case 'city':
        return /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(this.state.guests[index].city);
      case 'country':
        return /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(this.state.guests[index].country);
      default:
        break;
    }
  }

  // eslint-disable-next-line
  renderItem({ item, index }) {
    const { itemContainer } = styles;

    return (
      <View style={itemContainer}>
        <TextBox
          type="regular"
          color={WHITE}
          size={18}
          style={{ textAlign: 'center', paddingBottom: 10 }}
        >
          Please fill the fields below
        </TextBox>
        <Input
          value={this.state.guests[index].name}
          onChangeText={name => this.onChangeText('name', name, index)}
          placeholder="Full name"
          underlineColorAndroid={TRANSPARENT}
          width={SCREEN_WIDTH - 60}
          placeholderTextColor={LIGHT_GREY}
          mainColor={WHITE}
          focusColor={GOLD}
          textColor={WHITE}
          icon="account-box"
          valid={this.validateInput('name', index)}
        />
        <Input
          value={this.state.guests[index].phone}
          onChangeText={phone => this.onChangeText('phone', phone, index)}
          placeholder="Phone number"
          keyboardType="numeric"
          underlineColorAndroid={TRANSPARENT}
          width={SCREEN_WIDTH - 60}
          placeholderTextColor={LIGHT_GREY}
          mainColor={WHITE}
          focusColor={GOLD}
          textColor={WHITE}
          icon="phone"
          valid={this.validateInput('phone', index)}
        />
        <Input
          value={this.state.guests[index].address}
          onChangeText={address => this.onChangeText('address', address, index)}
          placeholder="Street address"
          underlineColorAndroid={TRANSPARENT}
          width={SCREEN_WIDTH - 60}
          placeholderTextColor={LIGHT_GREY}
          mainColor={WHITE}
          focusColor={GOLD}
          textColor={WHITE}
          icon="location-on"
          valid={this.validateInput('address', index)}
        />
        <Input
          value={this.state.guests[index].postalCode}
          onChangeText={postalCode => this.onChangeText('postalCode', postalCode, index)}
          placeholder="Postal code"
          underlineColorAndroid={TRANSPARENT}
          width={SCREEN_WIDTH - 60}
          placeholderTextColor={LIGHT_GREY}
          mainColor={WHITE}
          focusColor={GOLD}
          textColor={WHITE}
          icon="local-post-office"
          valid={this.validateInput('postalCode', index)}
        />
        <Input
          value={this.state.guests[index].city}
          onChangeText={city => this.onChangeText('city', city, index)}
          placeholder="City"
          underlineColorAndroid={TRANSPARENT}
          width={SCREEN_WIDTH - 60}
          placeholderTextColor={LIGHT_GREY}
          mainColor={WHITE}
          focusColor={GOLD}
          textColor={WHITE}
          icon="building"
          iconType="font-awesome"
          iconSize={28}
          valid={this.validateInput('city', index)}
        />
        <Input
          value={this.state.guests[index].country}
          onChangeText={country => this.onChangeText('country', country, index)}
          placeholder="Country"
          underlineColorAndroid={TRANSPARENT}
          width={SCREEN_WIDTH - 60}
          placeholderTextColor={LIGHT_GREY}
          mainColor={WHITE}
          focusColor={GOLD}
          textColor={WHITE}
          icon="flag"
          iconType="font-awesome"
          iconSize={28}
          valid={this.validateInput('country', index)}
        />
        {/* <TextBox
          type="regular"
          color={WHITE}
          size={18}
          style={{ textAlign: 'center', paddingBottom: 10 }}
        >
          Or if you are a recurring client, enter your phone number
        </TextBox>
        <Input
          value={this.state.guests[index].onlyPhone}
          onChangeText={onlyPhone => this.onChangeText('onlyPhone', onlyPhone, index)}
          placeholder="Phone number"
          keyboardType="numeric"
          underlineColorAndroid={TRANSPARENT}
          width={SCREEN_WIDTH - 60}
          placeholderTextColor={LIGHT_GREY}
          mainColor={WHITE}
          focusColor={GOLD}
          textColor={WHITE}
          icon="phone"
          valid={this.state.guests[index].onlyPhone !== ''}
        /> */}
      </View>
    );
  }

  renderDots(activeIndex) {
    const { dot } = styles;
    const activeDot = {
      backgroundColor: GOLD,
      width: 13,
      height: 13
    };

    return this.state.data.map((value, index) => {
      return (
        <TouchableOpacity
          disabled
          key={value}
          style={[dot, activeIndex === index ? activeDot : dot]}
          onPress={() => {
            this.carousel._snapToItem(this.carousel._getPositionIndex(index));
          }}
        />
      );
    });
  }

  render() {
    const { container, gradient, button } = styles;

    return (
      <SafeAreaView forceInset={{ top: 'never' }} style={container}>
        {this.state.loading ? <Loading /> : null}
        <Error />
        <LinearGradient colors={[DARK_BLUE, LIGHT_BLUE]} start={[1, 1]} style={gradient} />
        <Header
          title="Check in process"
          backArrow
          onBackPress={() => this.props.navigation.goBack()}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: 'center' }}>
            <Carousel
              ref={ref => {
                this.carousel = ref;
              }}
              data={this.state.data}
              firstItem={this.state.active}
              onSnapToItem={slideIndex => {
                this.setState({ active: slideIndex });
              }}
              renderItem={({ item, index }) => this.renderItem({ item, index })}
              sliderWidth={SCREEN_WIDTH}
              itemWidth={SCREEN_WIDTH}
              decelerationRate="fast"
              scrollEnabled={false}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {this.state.active !== 0 ? (
                <Icon
                  name="chevron-left"
                  color={WHITE}
                  size={34}
                  underlayColor={TRANSPARENT}
                  containerStyle={{ flex: 1 }}
                  onPress={() => {
                    if (!this.state.keyboardUp) {
                      this.carousel._snapToItem(
                        this.carousel._getPositionIndex(this.state.active - 1)
                      );
                    }
                  }}
                />
              ) : (
                <View style={{ flex: 1 }} />
              )}
              <Pagination
                dotsLength={this.state.data.length}
                activeDotIndex={this.state.active}
                renderDots={activeIndex => this.renderDots(activeIndex)}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: WHITE
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                containerStyle={{ flex: 1 }}
              />
              {this.state.active !== this.state.data.length - 1 ? (
                <Icon
                  name="chevron-right"
                  color={WHITE}
                  size={34}
                  containerStyle={{ flex: 1 }}
                  underlayColor={TRANSPARENT}
                  onPress={() => {
                    if (!this.state.keyboardUp) {
                      this.carousel._snapToItem(
                        this.carousel._getPositionIndex(this.state.active + 1)
                      );
                    }
                  }}
                />
              ) : (
                <View style={{ flex: 1 }} />
              )}
            </View>
            <Button
              title="FINISH"
              textColor={WHITE}
              gradient
              onPress={this.onFinish}
              buttonStyle={button}
            />
            <View style={{ height: this.state.containerHeight }} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  gradient: {
    position: 'absolute',
    height: '120%',
    width: '100%'
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20
  },
  dot: {
    alignItems: 'center',
    marginHorizontal: 15,
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: WHITE
  },
  button: {
    height: 50,
    width: SCREEN_WIDTH - 60,
    marginBottom: 20,
    overflow: 'hidden',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    error: state.errors.error
  };
};

export default connect(
  mapStateToProps,
  { addError, deleteReservation }
)(CheckIn);
