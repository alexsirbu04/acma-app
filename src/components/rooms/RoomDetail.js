import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import ViewMoreText from 'react-native-view-more-text';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo';

import { SCREEN_HEIGHT, SCREEN_WIDTH, CachedImage, Button, TextBox } from '../common';
import { LIGHT_BLUE, WHITE, GREY, MAIN_BLUE } from '../../../assets/colors';

import SingleBedIcon from '../../../assets/images/single-bed.png';
import DoubleBedIcon from '../../../assets/images/double-bed.png';
import Safe from '../../../assets/images/safe.png';

let top = SCREEN_WIDTH / 3 + 10;
if (SCREEN_HEIGHT >= 750 || SCREEN_WIDTH >= 750) {
  top = SCREEN_WIDTH / 2 + 10;
}

export default class RoomDetail extends Component {
  constructor(props) {
    super(props);
    const { wifi, bathtub, ac, bar, tv, safe, diningTable } = this.props.room.services;
    this.availableServices = [];
    if (wifi === true) {
      this.availableServices.push('wifi');
    }
    if (bathtub === true) {
      this.availableServices.push('bathtub');
    }
    if (ac === true) {
      this.availableServices.push('ac');
    }
    if (bar === true) {
      this.availableServices.push('bar');
    }
    if (tv === true) {
      this.availableServices.push('tv');
    }
    if (safe === true) {
      this.availableServices.push('safe');
    }
    if (diningTable === true) {
      this.availableServices.push('diningTable');
    }
  }

  renderBedIcon(bedType) {
    const { icon } = styles;
    if (bedType === 'Single') {
      return (
        <Image
          source={SingleBedIcon}
          style={icon}
        />
      );
    } else if (bedType === 'Double') {
      return (
        <Image
          source={DoubleBedIcon}
          style={icon}
        />
      );
    }
  }

  renderServices() {
    const { icon } = styles;
    return this.availableServices.map(service => {
      if (service === 'wifi') {
        return (
          <Icon name='wifi' key={service} color='#555' type='feather' icon={{ paddingRight: 5 }} />
        );
      } else if (service === 'bathtub') {
        return (
          <Icon name='bath' key={service} color='#555' type='font-awesome' icon={{ paddingRight: 5 }} />
        );
      } else if (service === 'ac') {
        return (
          <Icon name='air-conditioner' key={service} color='#555' type='material-community' icon={{ paddingRight: 5 }} />
        );
      } else if (service === 'bar') {
        return (
          <Icon name='fridge' key={service} color='#555' type='material-community' icon={{ paddingRight: 5 }} />
        );
      } else if (service === 'tv') {
        return (
          <Icon name='tv' key={service} color='#555'icon={{ paddingRight: 5 }} />
        );
      } else if (service === 'safe') {
        return (
          <Image source={Safe} key={service} style={icon} />
        );
      }
    });
  }

  renderViewMore(onPress) {
    return (
      <TextBox
        type='regular'
        color={MAIN_BLUE}
        size={14}
        style={{ marginLeft: 15 }} onPress={onPress}
      >
        View more
      </TextBox>
    );
  }

  renderViewLess(onPress) {
    return (
      <TextBox
        type='regular'
        color={MAIN_BLUE}
        size={14}
        style={{ marginLeft: 15 }} onPress={onPress}
      >
        View less
      </TextBox>
    );
  }

  render() {
    const {
      container,
      imageContainer,
      image,
      headingContainer,
      servicesContainer,
      buttonStyle,
      imageOverlayContainer,
      gradient
    } = styles;
    const {
      _id,
      roomTypeName,
      roomTypeDescription,
      roomImage,
      bedType,
      price  
    } = this.props.room;
    const { navigate } = this.props.navigation;
    const { hotelName } = this.props;
    return (
      <View style={container}>
        <View style={imageContainer}>
          <CachedImage
            source={{ uri: roomImage }}
            style={image} 
          />
          <LinearGradient
            colors={[LIGHT_BLUE, 'transparent']}
            start={[0.5, 1]}
            end={[0.5, 0]}
            style={gradient}
          />
        </View>
        <View style={imageOverlayContainer}>
          <TextBox type='semi-bold' size={20} color={WHITE}>{roomTypeName}</TextBox>
          <TextBox type='semi-bold' size={18} color={WHITE}>€{price} per night</TextBox>
        </View>
        <View style={headingContainer}>
          <TextBox type='semi-bold' size={22} color={MAIN_BLUE} style={{ paddingLeft: 15 }}>Services included</TextBox>
          <View style={servicesContainer}>
            {this.renderBedIcon(bedType)}
            {this.renderServices()}
          </View>
        </View>
        <View>
        <TextBox type='semi-bold' size={22} color={MAIN_BLUE} style={{ paddingLeft: 15 }}>Description</TextBox>
          <ViewMoreText
            numberOfLines={3}
            renderViewMore={this.renderViewMore}
            renderViewLess={this.renderViewLess}
            textStyle={{ 
              padding: 10,
              paddingLeft: 15,
              color: GREY 
            }}
          >
            <TextBox type='regular' size={14} color={GREY}>
              {roomTypeDescription}
            </TextBox>
          </ViewMoreText>
        </View>
        <Button
          title='BOOK THIS ROOM'
          textColor={WHITE}
          gradient
          onPress={() => navigate('Booking', { name: { hotelName }, id: { _id } })}
          buttonStyle={buttonStyle}
        />
      </View>
    );
  }
}

RoomDetail.propTypes = {
  room: PropTypes.object.isRequired,
  hotelName: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    marginBottom: 10,
    borderRadius: 5,
    width: SCREEN_WIDTH - 20
  },
  imageContainer: {
    flex: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: 'hidden'
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: SCREEN_HEIGHT / 3,
    width: SCREEN_WIDTH
  },
  icon: {
    height: 28,
    width: 28,
    tintColor: GREY,
    marginRight: 5
  },
  headingContainer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10
  },
  servicesContainer: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingLeft: 15
  },
  buttonStyle: {
    height: 45,
    marginTop: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageOverlayContainer: {
    position: 'absolute',
    top,
    bottom: 0,
    left: 15,
    right: 0
  },
  gradient: {
    position: 'absolute',
    top: '30%',
    height: '70%',
    width: '100%'
  }
});
