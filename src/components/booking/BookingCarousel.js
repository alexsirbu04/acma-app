import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';

import { GREY, LIGHT_GREY, WHITE, MAIN_BLUE } from '../../../assets/colors';
import { SCREEN_WIDTH, TextBox } from '../common';

export default class BookingCarousel extends Component {
  renderItem({ item, index }, active, type) {
    const { itemContainer, occupancyItemContainer } = styles;

    if (index === active) {
      switch (type) {
        case 'days':
          return (
            <View style={itemContainer}>
              <TextBox
                type="regular"
                color={MAIN_BLUE}
                size={16}
                style={{ borderColor: MAIN_BLUE, paddingBottom: 2 }}
              >
                {item.dayOfWeek}
              </TextBox>
              <TextBox
                type="regular"
                color={MAIN_BLUE}
                size={16}
                style={{ borderColor: MAIN_BLUE }}
              >
                {item.dayOfMonth}
              </TextBox>
            </View>
          );
        case 'months':
          return (
            <View style={itemContainer}>
              <TextBox type="regular" color={MAIN_BLUE} size={16}>
                {item.toUpperCase()}
              </TextBox>
            </View>
          );
        case 'occupancy':
          return (
            <View style={[occupancyItemContainer, { borderColor: MAIN_BLUE }]}>
              <TextBox type="regular" color={MAIN_BLUE} size={16}>
                {item}
              </TextBox>
            </View>
          );
        default:
          return null;
      }
    }

    switch (type) {
      case 'days':
        return (
          <View style={itemContainer}>
            <TextBox type="regular" color={GREY} size={14} style={{ paddingBottom: 2 }}>
              {item.dayOfWeek}
            </TextBox>
            <TextBox type="regular" color={GREY} size={14}>
              {item.dayOfMonth}
            </TextBox>
          </View>
        );
      case 'months':
        return (
          <View style={itemContainer}>
            <TextBox type="regular" color={GREY} size={14}>
              {item.toUpperCase()}
            </TextBox>
          </View>
        );
      case 'occupancy':
        return (
          <View style={occupancyItemContainer}>
            <TextBox type="regular" color={GREY} size={14}>
              {item}
            </TextBox>
          </View>
        );
      default:
        return null;
    }
  }

  render() {
    const { reference, onSnapToItem, active, data, type } = this.props;
    const { carouselContainer } = styles;

    return (
      <View style={carouselContainer}>
        <Carousel
          ref={reference}
          data={data}
          renderItem={({ item, index }) => this.renderItem({ item, index }, active, type)}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={type === 'occupancy' ? 120 : 60}
          firstItem={active}
          inactiveSlideOpacity={0.6}
          inactiveSlideScale={1}
          enableMomentum
          decelerationRate={0.9}
          onSnapToItem={onSnapToItem}
          contentContainerCustomStyle={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
      </View>
    );
  }
}

BookingCarousel.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  active: PropTypes.number,
  onSnapToItem: PropTypes.func
};

const styles = StyleSheet.create({
  carouselContainer: {
    height: 60,
    borderTopWidth: 1,
    borderColor: LIGHT_GREY,
    backgroundColor: WHITE,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 4,
    shadowOpacity: 0.5
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  },
  occupancyItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: GREY
  }
});
