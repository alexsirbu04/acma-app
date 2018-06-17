import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo';

import { SCREEN_WIDTH, CachedImage, Button, TextBox } from '../common';
import { WHITE, GREY, MAIN_BLUE } from '../../../assets/colors';

import Safe from '../../../assets/images/safe.png';

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

  renderAmenities() {
    const { icon, amenity } = styles;
    return this.availableServices.map(service => {
      if (service === 'wifi') {
        return (
          <View key={service} style={amenity}>
            <Icon name="wifi" color={GREY} type="feather" />
            <TextBox type="semi-bold" size={14} color={GREY}>
              WIFI
            </TextBox>
          </View>
        );
      } else if (service === 'bathtub') {
        return (
          <View key={service} style={amenity}>
            <Icon name="bath" size={24} color={GREY} type="font-awesome" />
            <TextBox type="semi-bold" size={14} color={GREY}>
              TUB
            </TextBox>
          </View>
        );
      } else if (service === 'ac') {
        return (
          <View key={service} style={amenity}>
            <Icon name="fan" color={GREY} type="material-community" />
            <TextBox type="semi-bold" size={14} color={GREY}>
              AC
            </TextBox>
          </View>
        );
      } else if (service === 'bar') {
        return (
          <View key={service} style={amenity}>
            <Icon name="fridge" color={GREY} type="material-community" />
            <TextBox type="semi-bold" size={14} color={GREY}>
              FRIDGE
            </TextBox>
          </View>
        );
      } else if (service === 'tv') {
        return (
          <View key={service} style={amenity}>
            <Icon name="tv" color={GREY} />
            <TextBox type="semi-bold" size={14} color={GREY}>
              TV
            </TextBox>
          </View>
        );
      } else if (service === 'safe') {
        return (
          <View key={service} style={amenity}>
            <Image source={Safe} style={icon} />
            <TextBox type="semi-bold" size={14} color={GREY}>
              SAFE
            </TextBox>
          </View>
        );
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
      amenitiesContainer,
      button,
      imageOverlayContainer,
      gradient
    } = styles;
    const { _id, roomTypeName, roomTypeDescription, roomImage, price } = this.props.room;
    const { navigate } = this.props.navigation;
    const { hotelName } = this.props;
    return (
      <View style={container}>
        <View style={imageContainer}>
          <CachedImage source={{ uri: roomImage }} style={image} />
          <LinearGradient
            colors={['rgba(26, 47, 127, 0.8)', 'transparent']}
            start={[0.5, 1]}
            end={[0.5, 0]}
            locations={[0.3, 1]}
            style={gradient}
          />
          <View style={imageOverlayContainer}>
            <TextBox type="semi-bold" size={20} color={WHITE}>
              {roomTypeName.toUpperCase()}
            </TextBox>
            <TextBox type="regular" size={18} color={WHITE}>
              €{price} per night
            </TextBox>
          </View>
        </View>
        <View style={amenitiesContainer}>{this.renderAmenities()}</View>
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
    height: 300,
    width: SCREEN_WIDTH
  },
  icon: {
    height: 27,
    width: 27,
    tintColor: GREY
  },
  amenitiesContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15
  },
  amenity: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
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
    bottom: 20,
    left: 20
  },
  gradient: {
    position: 'absolute',
    height: '70%',
    width: '100%',
    bottom: 0
  }
});
