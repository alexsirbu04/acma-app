import React, { Component } from 'react';
import { StyleSheet, PanResponder, Animated, Easing, TouchableOpacity } from 'react-native';

import { SCREEN_WIDTH } from './';
import { WHITE } from '../../../assets/colors';

const SWIPE_THRESHOLD = 0.1 * SCREEN_WIDTH;
const SWIPE_POSITION = 0.25 * SCREEN_WIDTH;

export class Swipeable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      swipedOpen: false
    };

    const position = new Animated.Value(0);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        if (props.swipe) {
          if (gesture.dx < 0 && !this.state.swipedOpen) {
            position.setValue(gesture.dx);
          }
        }
      },
      onPanResponderRelease: (event, gesture) => {
        if (props.swipe) {
          if (gesture.dx < 0 && !this.state.swipedOpen) {
            if (gesture.dx < -SWIPE_THRESHOLD) {
              this.slide();
            } else {
              this.recenter();
            }
          }
        }
      },
      onPanResponderTerminationRequest: () => true
    });

    this.position = position;
  }

  onPressContent() {
    if (this.state.swipedOpen) {
      this.recenter();
    }
  }

  recenter() {
    Animated.timing(this.position, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.bezier(0, 0, 0.8, 1))
    }).start();

    if (this.state.swipedOpen) {
      this.setState({ swipedOpen: false });
    }
  }

  slide() {
    if (!this.state.swipedOpen) {
      Animated.timing(this.position, {
        toValue: -SWIPE_POSITION,
        duration: 300,
        easing: Easing.out(Easing.bezier(0, 0, 0.8, 1))
      }).start();

      this.setState({ swipedOpen: true });
    }
  }

  renderChildren() {
    if (this.state.swipedOpen) {
      return (
        <TouchableOpacity activeOpacity={1} onPress={this.onPressContent.bind(this)}>
          {this.props.children}
        </TouchableOpacity>
      );
    }

    return this.props.children;
  }

  render() {
    const width = this.position.interpolate({
      inputRange: [-500, 0],
      outputRange: [500, 0]
    });
    const size = this.position.interpolate({
      inputRange: [-500, -100, 0],
      outputRange: [18, 18, 0]
    });

    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

    return (
      <Animated.View
        style={{ transform: [{ translateX: this.position }] }}
        {...this.panResponder.panHandlers}
      >
        <Animated.View style={styles.container}>
          {this.renderChildren()}
          <AnimatedTouchableOpacity
            style={[styles.button, { width, height: this.props.height }]}
            onPress={() => {
              this.recenter();
              this.props.onCancel();
            }}
          >
            <Animated.Text style={[styles.text, { fontSize: size }]}>CANCEL</Animated.Text>
          </AnimatedTouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  text: {
    fontFamily: 'semi-bold',
    color: WHITE
  }
});
