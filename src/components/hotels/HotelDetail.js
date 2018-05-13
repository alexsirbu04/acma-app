import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Image, Modal } from 'react-native';
import { Constants } from 'expo';
import { Icon } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import ImageViewer from 'react-native-image-zoom-viewer';
import PropTypes from 'prop-types';

import { SCREEN_WIDTH, SCREEN_HEIGHT, CachedImage, Button, TextBox } from '../common';
import { GREY, LIGHT_GREY, WHITE, GOLD } from '../../../assets/colors';

import ResortIcon from '../../../assets/images/resort.png';
import HotelIcon from '../../../assets/images/hotel.png';

export default class HotelDetail extends Component {
  state = {
    isModalOpened: false,
    currentImageIndex: 0
  };

  openModal(index) {
    this.setState({ isModalOpened: true, currentImageIndex: index });
  }

  closeModal() {
    this.setState({ isModalOpened: false, currentImageIndex: 0 });
  }

  renderIcon(type) {
    if (type === 'Beach Resort') {
      return <Image style={styles.typeIconStyle} source={ResortIcon} />;
    } else if (type === 'Hotel') {
      return <Image style={styles.typeIconStyle} source={HotelIcon} />;
    }
    return null;
  }

  render() {
    const {
      container,
      contentContainer,
      contactContainer,
      nameContainer,
      headingContainer,
      iconContainer,
      iconStyle,
      typeIconContainer,
      button,
      imagesContainer,
      bigImagecontainer,
      imageStyle,
      smallImageContainer,
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
      <View style={container}>
        <Modal
          visible={this.state.isModalOpened}
          transparent
          onRequestClose={this.closeModal.bind(this)}
        >
          <View style={modalCloseIconStyle}>
            <TouchableWithoutFeedback onPress={this.closeModal.bind(this)}>
              <Icon name="close" color={WHITE} size={30} />
            </TouchableWithoutFeedback>
          </View>
          <ImageViewer
            imageUrls={images}
            index={this.state.currentImageIndex}
            onSwipeDown={this.closeModal.bind(this)}
            backgroundColor="rgba(0, 0, 0, 0.9)"
            style={{ height: 50 }}
          />
        </Modal>
        <View style={imagesContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.openModal(0);
            }}
          >
            <View style={bigImagecontainer}>
              <CachedImage
                style={[imageStyle, { borderTopLeftRadius: 5 }]}
                source={{ uri: firstImage }}
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={{ flex: 2 }}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.openModal(1);
              }}
            >
              <View style={[smallImageContainer, { borderBottomWidth: 1, borderColor: WHITE }]}>
                <CachedImage style={imageStyle} source={{ uri: secondImage }} />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                this.openModal(2);
              }}
            >
              <View style={[smallImageContainer, { borderTopWidth: 1, borderColor: WHITE }]}>
                <CachedImage style={imageStyle} source={{ uri: thirdImage }} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={contentContainer}>
          <View style={typeIconContainer}>{this.renderIcon(type)}</View>
          <View style={headingContainer}>
            <View style={nameContainer}>
              <TextBox type="semi-bold" size={18} color={GREY}>
                {name.toUpperCase()}
              </TextBox>
              <StarRating
                disabled
                maxStars={stars}
                rating={stars}
                starSize={15}
                fullStarColor={GOLD}
                containerStyle={{ paddingLeft: 10, paddingTop: 2 }}
              />
            </View>
            <TextBox type="regular" size={12} color={GREY}>
              {street.streetNumber} {street.streetName}, {street.postalCode}, {city}, {country}
            </TextBox>
          </View>
        </View>
        <View style={contactContainer}>
          <View style={{ flexDirection: 'row' }}>
            <View style={iconContainer}>
              <Icon name="phone" color={GREY} style={iconStyle} />
            </View>
            <View style={{ flex: 4 }}>
              <TextBox type="regular" size={16} color={GREY}>
                {telephone}
              </TextBox>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={iconContainer}>
              <Icon name="email" color={GREY} style={iconStyle} />
            </View>
            <View style={{ flex: 4 }}>
              <TextBox type="regular" size={16} color={GREY}>
                {email}
              </TextBox>
            </View>
          </View>
        </View>
        <Button
          title="VIEW ROOMS"
          gradient
          textColor={WHITE}
          onPress={() => navigate('Rooms', { id: { _id } })}
          buttonStyle={button}
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
  container: {
    backgroundColor: WHITE,
    marginBottom: 10,
    borderRadius: 5,
    width: SCREEN_WIDTH - 20
  },
  contentContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: LIGHT_GREY
  },
  contactContainer: {
    flex: 1,
    paddingBottom: 10,
    paddingTop: 10
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headingContainer: {
    flex: 4,
    paddingTop: 10
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconStyle: {
    height: 10,
    width: 10,
    tintColor: GREY
  },
  typeIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  typeIconStyle: {
    height: 45,
    width: 45,
    marginTop: 10,
    tintColor: GREY
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    overflow: 'hidden'
  },
  imagesContainer: {
    flexDirection: 'row',
    height: SCREEN_HEIGHT / 4
  },
  bigImagecontainer: {
    flex: 3,
    borderRightWidth: 1,
    borderColor: WHITE,
    borderTopLeftRadius: 5,
    overflow: 'hidden'
  },
  smallImageContainer: {
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
