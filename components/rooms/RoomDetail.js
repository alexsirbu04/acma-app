import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import ViewMoreText from 'react-native-view-more-text';
import PropTypes from 'prop-types';

import { CachedImage } from '../CachedImage';

import SingleBedIcon from '../../assets/single-bed.png';
import DoubleBedIcon from '../../assets/double-bed.png';
import Safe from '../../assets/safe.png';
import DiningTable from '../../assets/dining-table.png';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const top = SCREEN_WIDTH / 3;
if (Platform.OS === 'ios' && (SCREEN_HEIGHT === 812 || SCREEN_WIDTH === 812)) {
  top = SCREEN_WIDTH / 2;
}

export default class RoomDetail extends Component {
  constructor(props) {
    super(props);
    const { wifi, bathtub, ac, bar, tv, safe, diningTable } = this.props.room.services;
    this.availableServices = [];
    if (wifi === true)
      this.availableServices.push('wifi');
    if (bathtub === true)
      this.availableServices.push('bathtub');
    if (ac === true)
      this.availableServices.push('ac');
    if (bar === true)
      this.availableServices.push('bar');
    if (tv === true)
      this.availableServices.push('tv');
    if (safe === true)
      this.availableServices.push('safe');
    if (diningTable === true)
      this.availableServices.push('diningTable');
  }

  renderBedIcon(bedType) {
    const { iconStyle } = styles;
    if (bedType === 'Single') {
      return (
        <Image
          source={SingleBedIcon}
          style={iconStyle}
        />
      );
    } else if (bedType === 'Double') {
      return (
        <Image
          source={DoubleBedIcon}
          style={iconStyle}
        />
      );
    }
  }

  renderServices() {
    const { iconStyle } = styles;
    return this.availableServices.map(service => {
      if (service === 'wifi')
        return(
          <Icon name='wifi' key={service} color='#555' type='feather' iconStyle={{ paddingRight: 5 }} />
        );
      else if (service === 'bathtub')
        return(
          <Icon name='bath' key={service} color='#555' type='font-awesome' iconStyle={{ paddingRight: 5 }} />
        );
      else if (service === 'ac')
        return(
          <Icon name='air-conditioner' key={service} color='#555' type='material-community' iconStyle={{ paddingRight: 5 }} />
        );
      else if (service === 'bar')
        return(
          <Icon name='fridge' key={service} color='#555' type='material-community' iconStyle={{ paddingRight: 5 }} />
        );
      else if (service === 'tv')
        return(
          <Icon name='tv' key={service} color='#555'iconStyle={{ paddingRight: 5 }} />
        );
      else if (service === 'safe')
        return(
          <Image source={Safe} key={service} style={iconStyle} />
        );
      else if (service === 'diningTable')
        return(
          <Image source={DiningTable} key={service} style={iconStyle} />
        );
    });
  }

  renderViewMore(onPress){
    return(
      <Text style={{ fontWeight: '600', color: '#1d7cf4', marginLeft: 15 }} onPress={onPress}>View more</Text>
    )
  }

  renderViewLess(onPress){
    return(
      <Text style={{ fontWeight: '600', color: '#1d7cf4', marginLeft: 15 }} onPress={onPress}>View less</Text>
    )
  }

  render() {
    const {
      containerStyle,
      imageStyle,
      headingContainerStyle,
      headingStyle,
      servicesContainer,
      roomNameStyle,
      roomPriceStyle,
      buttonContainerStyle,
      imageOverlayContainer
    } = styles;
    const { 
      roomTypeName,
      roomTypeDescription,
      roomImage,
      bedType,
      price,
      services
    } = this.props.room;
    return(
      <View style={containerStyle}>
        <CachedImage
          uri={roomImage}
          style={imageStyle} 
        />
        <View style={imageOverlayContainer}>
          <Text style={roomNameStyle}>{roomTypeName} </Text>
          <Text style={roomPriceStyle}>€{price} per night</Text>
        </View>
        <View style={headingContainerStyle}>
          <Text style={headingStyle}>Services included</Text>
          <View style={servicesContainer}>
            {this.renderBedIcon(bedType)}
            {this.renderServices()}
          </View>
        </View>
        <View>
          <Text style={headingStyle}>Description</Text>
          <ViewMoreText
            numberOfLines={3}
            renderViewMore={this.renderViewMore}
            renderViewLess={this.renderViewLess}
            textStyle={{ 
              padding: 10,
              paddingLeft: 15,
              color: '#555' 
            }}
          >
            <Text>
              {roomTypeDescription}
            </Text>
          </ViewMoreText>
        </View>
        <Button
          backgroundColor='#1d7cf4'
          title='BOOK NOW'
          rounded
          fontWeight='700'
          // onPress={() => navigate('Booking', { id: { _id } })}
          buttonStyle={{ width: SCREEN_WIDTH - 60 }}
          containerViewStyle={buttonContainerStyle}
        />
      </View>
    );
  }
}

RoomDetail.propTypes = {
  room: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  containerStyle: {
    borderBottomWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#fff',
    marginBottom: 10
  },
  imageStyle: {
    height: SCREEN_HEIGHT / 3,
    width: SCREEN_WIDTH
  },
  iconStyle: {
    height: 28,
    width: 28,
    tintColor: '#555',
    marginRight: 5
  },
  headingContainerStyle: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10
  },
  headingStyle: {
    color: '#1d7cf4',
    fontWeight: '600',
    fontSize: 23,
    paddingLeft: 15
  },
  servicesContainer: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingLeft: 15
  },
  roomNameStyle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    paddingTop: 5,
  },
  roomPriceStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    paddingTop: 2.5
  },
  buttonContainerStyle: {
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 10
  },
  imageOverlayContainer: {
    position: 'absolute',
    top: top,
    bottom: 0,
    left: 15,
    right: 0
  }
});