import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo';

import { SCREEN_HEIGHT, SCREEN_WIDTH, CachedImage, Button, TextBox } from '../common';
import { LIGHT_BLUE, WHITE, GREY, MAIN_BLUE } from '../../../assets/colors';

import SingleBedIcon from '../../../assets/images/single-bed.png';
import DoubleBedIcon from '../../../assets/images/double-bed.png';
import Safe from '../../../assets/images/safe.png';

let top = SCREEN_WIDTH / 2.5 + 10;
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

  state = { expanded: false };

  renderBedIcon(bedType) {
    const { icon } = styles;
    if (bedType === 'Single') {
      return <Image source={SingleBedIcon} style={icon} />;
    } else if (bedType === 'Double') {
      return <Image source={DoubleBedIcon} style={icon} />;
    }
    return null;
  }

  renderServices() {
    const { icon } = styles;
    return this.availableServices.map(service => {
      if (service === 'wifi') {
        return (
          <Icon
            name="wifi"
            key={service}
            color={GREY}
            type="feather"
            iconStyle={{ paddingRight: 5 }}
          />
        );
      } else if (service === 'bathtub') {
        return (
          <Icon
            name="bath"
            key={service}
            color={GREY}
            type="font-awesome"
            iconStyle={{ paddingRight: 5 }}
          />
        );
      } else if (service === 'ac') {
        return (
          <Icon
            name="air-conditioner"
            key={service}
            color={GREY}
            type="material-community"
            iconStyle={{ paddingRight: 5 }}
          />
        );
      } else if (service === 'bar') {
        return (
          <Icon
            name="fridge"
            key={service}
            color={GREY}
            type="material-community"
            iconStyle={{ paddingRight: 5 }}
          />
        );
      } else if (service === 'tv') {
        return <Icon name="tv" key={service} color={GREY} iconStyle={{ paddingRight: 5 }} />;
      } else if (service === 'safe') {
        return <Image source={Safe} key={service} style={icon} />;
      }
      return null;
    });
  }

  renderDescription(description) {
    if (!this.state.expanded) {
      return (
        <View>
          <TextBox
            type="regular"
            size={14}
            color={GREY}
            numberOfLines={3}
            style={{
              padding: 10,
              paddingLeft: 15
            }}
          >
            {description}
          </TextBox>
          <TextBox
            type="regular"
            size={14}
            color={MAIN_BLUE}
            onPress={() => this.setState({ expanded: true })}
            style={{ marginLeft: 15 }}
          >
            Read more
          </TextBox>
        </View>
      );
    }

    return (
      <View>
        <TextBox
          type="regular"
          size={14}
          color={GREY}
          style={{
            padding: 10,
            paddingLeft: 15
          }}
        >
          {description}
        </TextBox>
        <TextBox
          type="regular"
          size={14}
          color={MAIN_BLUE}
          onPress={() => this.setState({ expanded: false })}
          style={{ marginLeft: 15 }}
        >
          Read less
        </TextBox>
      </View>
    );
  }

  render() {
    const {
      container,
      imageContainer,
      image,
      headingContainer,
      servicesContainer,
      button,
      imageOverlayContainer,
      gradient
    } = styles;
    const { _id, roomTypeName, roomTypeDescription, roomImage, bedType, price } = this.props.room;
    const { navigate } = this.props.navigation;
    const { hotelName } = this.props;
    return (
      <View style={container}>
        <View style={imageContainer}>
          <CachedImage source={{ uri: roomImage }} style={image} />
          <LinearGradient
            colors={[LIGHT_BLUE, 'transparent']}
            start={[0.5, 1]}
            end={[0.5, 0]}
            style={gradient}
          />
        </View>
        <View style={imageOverlayContainer}>
          <TextBox type="semi-bold" size={20} color={WHITE}>
            {roomTypeName.toUpperCase()}
          </TextBox>
          <TextBox type="regular" size={18} color={WHITE}>
            €{price} per night
          </TextBox>
        </View>
        <View style={headingContainer}>
          <TextBox type="semi-bold" size={20} color={MAIN_BLUE} style={{ paddingLeft: 15 }}>
            SERVICES INCLUDED
          </TextBox>
          <View style={servicesContainer}>
            {this.renderBedIcon(bedType)}
            {this.renderServices()}
          </View>
        </View>
        <View>
          <TextBox type="semi-bold" size={20} color={MAIN_BLUE} style={{ paddingLeft: 15 }}>
            DESCRIPTION
          </TextBox>
          {this.renderDescription(roomTypeDescription)}
        </View>
        <Button
          title="BOOK THIS ROOM"
          textColor={WHITE}
          gradient
          onPress={() => navigate('Booking', { name: { hotelName }, id: { _id } })}
          buttonStyle={button}
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
  button: {
    height: 50,
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
