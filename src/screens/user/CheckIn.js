import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { LinearGradient } from 'expo';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { SCREEN_WIDTH, Header, Input } from '../../components/common';
import {
  DARK_BLUE,
  LIGHT_BLUE,
  LIGHT_GREY,
  WHITE,
  TRANSPARENT,
  GOLD
} from '../../../assets/colors';

export default class CheckIn extends Component {
  constructor(props) {
    super(props);

    const persons = props.navigation.getParam('persons');
    let iterator = 0;
    const data = [];
    while (iterator < persons) {
      data.push(iterator);
      iterator++;
    }
    this.state = {
      data,
      active: 0,
      name: '',
      email: ''
    };
  }

  renderItem({ item, index }) {
    const { itemContainer } = styles;

    return (
      <View style={itemContainer}>
        <Input
          value={this.state.name}
          onChangeText={name => this.setState({ name })}
          placeholder="John Doe"
          underlineColorAndroid={TRANSPARENT}
          width={SCREEN_WIDTH - 60}
          placeholderTextColor={LIGHT_GREY}
          mainColor={WHITE}
          focusColor={GOLD}
          textColor={WHITE}
          label="NAME"
        />
        <Input
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          placeholder="0712 345 678"
          underlineColorAndroid={TRANSPARENT}
          width={SCREEN_WIDTH - 60}
          placeholderTextColor={LIGHT_GREY}
          mainColor={WHITE}
          focusColor={GOLD}
          textColor={WHITE}
          label="PHONE"
        />
      </View>
    );
  }

  render() {
    const { container, gradient, carouselContainer } = styles;
    return (
      <SafeAreaView forceInset={{ bottom: 'always', top: 'never' }} style={container}>
        <LinearGradient colors={[DARK_BLUE, LIGHT_BLUE]} start={[1, 1]} style={gradient} />
        <Header
          title="Please fill the fields below"
          backArrow
          onBackPress={() => this.props.navigation.goBack()}
        />
        <View style={carouselContainer}>
          <Carousel
            reference={c => {
              this.carousel = c;
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
          />
          <Pagination
            dotsLength={this.state.data.length}
            activeDotIndex={this.state.active}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: WHITE
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
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
  carouselContainer: {
    flex: 1
  },
  itemContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: WHITE,
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 10,
    marginHorizontal: 20
  }
});
