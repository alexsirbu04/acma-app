import React, { Component } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  Image, 
  Dimensions, 
  Modal 
} from 'react-native';
import { Constants } from 'expo';
import { Icon } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import ImageViewer from 'react-native-image-zoom-viewer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { CachedImage, Button } from '../index';
import { GREY, LIGHT_GREY, WHITE, MAIN_BLUE, GOLD } from '../../assets/colors';

import ResortIcon from '../../assets/resort.png';
import HotelIcon from '../../assets/hotel.png';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class HotelDetail extends Component {
  state = {
    isModalOpened: false,
    currentImageIndex: 0
  }

  renderIcon(type) {
    if (type === 'Beach Resort') {
      return (
        <Image
          style={styles.accTypeIconStyle}
          source={ResortIcon}
        />
      );
    } else if (type === 'Hotel') {
      return (
        <Image
          style={styles.accTypeIconStyle}
          source={HotelIcon}
        />
      );
    }
  }

  openModal(index) {
    this.setState({ isModalOpened: true, currentImageIndex: index })
  }

  closeModal() {
    this.setState({ isModalOpened: false, currentImageIndex: 0 })
  }

  render() {
    const {
      containerStyle,
      contentContainerStyle,
      contactContainerStyle,
      nameContainerStyle,
      nameStyle,
      addressStyle,
      headingContainerStyle,
      iconContainerStyle,
      iconStyle,
      contactDataStyle,
      accTypeIconContainerStyle,
      buttonContainerStyle,
      buttonStyle,
      imagesContainerStyle,
      bigImageContainerStyle,
      imageStyle,
      smallImageContainerStyle,
      modalCloseIconStyle
    } = styles;
    const {
      _id,
      name,
      type,
      street,
      city,
      country,
      telephone,
      email,
      stars,
      firstImage,
      secondImage,
      thirdImage
    } = this.props.hotel;
    const { navigate } = this.props.navigation;

    const images = [
      {
        url: firstImage
      },
      {
        url: secondImage
      },
      {
        url: thirdImage
      }
    ];

    return (
      <View style={containerStyle}>
        <Modal 
          visible={this.state.isModalOpened} 
          transparent={true}
          onRequestClose={this.closeModal.bind(this)}
        >
          <TouchableWithoutFeedback onPress={this.closeModal.bind(this)}>
            <Icon name='close' color='#fff' size={30} containerStyle={modalCloseIconStyle} />
          </TouchableWithoutFeedback>
          <ImageViewer 
            imageUrls={images} 
            index={this.state.currentImageIndex}
            onSwipeDown={this.closeModal.bind(this)}
            backgroundColor='rgba(0, 0, 0, 0.9)'
          />
        </Modal>
        <View style={imagesContainerStyle}>
          <TouchableWithoutFeedback onPress={() => {this.openModal(0)}}>
            <View style={bigImageContainerStyle}>
                <CachedImage
                  style={[imageStyle, { borderTopLeftRadius: 5 }]}
                  source={{ uri: firstImage }}
                />
            </View>
          </TouchableWithoutFeedback>
          <View style={{ flex: 2 }}>
            <TouchableWithoutFeedback onPress={() => {this.openModal(1)}}>
              <View style={[smallImageContainerStyle, { 
                borderBottomWidth: 1,
                borderColor: WHITE
                }]}
              >
                <CachedImage
                  style={imageStyle}
                  source={{ uri: secondImage }}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {this.openModal(2)}}>
            <View style={[smallImageContainerStyle, { borderTopWidth: 1, borderColor: WHITE }]}>
                <CachedImage
                  style={imageStyle}
                  source={{ uri: thirdImage }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={contentContainerStyle}>
          <View style={accTypeIconContainerStyle}>
            {this.renderIcon(type)}
          </View>
          <View style={headingContainerStyle}>
            <View style={nameContainerStyle}>
              <Text style={nameStyle}>{name}</Text>
              <StarRating
                disabled
                maxStars={stars}
                rating={stars}
                starSize={15}
                fullStarColor={GOLD}
                containerStyle={{ paddingLeft: 8, paddingTop: 2 }}
              />
            </View>
            <Text style={addressStyle}>
              {street.streetNumber} {street.streetName}, {street.postalCode}, {city}, {country}
            </Text>
          </View>
        </View>
        <View style={contactContainerStyle}>
          <View style={{ flexDirection: 'row' }}>
            <View style={iconContainerStyle}>
              <Icon name='phone' color={GREY} style={iconStyle}/>
            </View>
            <View style={{ flex: 4 }}>
              <Text style={contactDataStyle}>{telephone}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={iconContainerStyle}>
              <Icon name='email' color={GREY} style={iconStyle}/>
            </View>
            <View style={{ flex: 4 }}>
              <Text style={contactDataStyle}>{email}</Text>
            </View>
          </View>
        </View>
        <Button
          title='VIEW ROOMS'
          onPress={() => navigate('Rooms', { id: { _id } })}
          containerStyle={buttonContainerStyle}
          buttonStyle={buttonStyle}
        />
      </View>
    );
  }
}

HotelDetail.propTypes = {
  navigation: PropTypes.object.isRequired,
  hotel: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: WHITE,
    marginBottom: 10,
    borderRadius: 5,
    width: SCREEN_WIDTH - 20
  },
  contentContainerStyle: {
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: LIGHT_GREY
  },
  contactContainerStyle: {
    flex: 1,
    paddingBottom: 10,
    paddingTop: 10
  },
  nameContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nameStyle: {
    fontSize: 22,
    color: GREY,
    fontWeight: '400'
  },
  addressStyle: {
    fontSize: 12,
    color: GREY
  },
  headingContainerStyle: {
    flex: 4,
    paddingTop: 10
  },
  iconContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    height: 10,
    width: 10,
    tintColor: GREY
  },
  accTypeIconContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accTypeIconStyle: {
    height: 45,
    width: 45,
    tintColor: GREY
  },
  contactDataStyle: {
    fontSize: 16,
    color: GREY
  },
  buttonContainerStyle: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    overflow: 'hidden'
  },
  buttonStyle: {
    fontWeight: '700',
    color: WHITE
  },
  imagesContainerStyle: {
    flexDirection: 'row',
    height: SCREEN_HEIGHT / 4,
  },
  bigImageContainerStyle: {
    flex: 3,
    borderRightWidth: 1,
    borderColor: WHITE,
    borderTopLeftRadius: 5,
    overflow: 'hidden'
  },
  smallImageContainerStyle: {
    flex: 1,
    borderLeftWidth: 1,
    borderColor: WHITE,
    borderTopRightRadius: 5,
    overflow: 'hidden'
  },
  imageStyle: {
    height: '100%',
    width: '100%'
  },
  modalCloseIconStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)', 
    alignItems: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 15
  }
});
