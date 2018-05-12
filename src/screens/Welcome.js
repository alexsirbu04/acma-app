import React, { Component } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, AsyncStorage, StatusBar } from 'react-native';
import { StackActions, NavigationAction } from 'react-navigation';
import { LinearGradient } from 'expo';
import axios from 'axios';
import { connect } from 'react-redux';
import _ from 'lodash';

import { SCREEN_WIDTH, SCREEN_HEIGHT, TextBox, Button } from '../components/common';
import { storeHotels } from '../actions';

import { DARK_BLUE, LIGHT_BLUE, WHITE, MAIN_BLUE } from '../../assets/colors';
import Logo from '../../assets/images/logoSecond.png';
import Background from '../../assets/images/background.jpg';

class Welcome extends Component {
  state = {
    loaded: false,
    token: null,
    ready: false
  };

  async componentDidMount() {
    const hotels = [];
    const response = await axios.get('https://secure-stream-51486.herokuapp.com/hotels');
    for (const hotel of response.data.hotels) {
      hotels.push(hotel);
    }
    this.props.storeHotels(hotels);
    this.setState({ loaded: true });

    const facebookToken = await AsyncStorage.getItem('facebook_token');
    if (facebookToken && this.state.loaded) {
      this.props.navigation.navigate('Home');
      this.setState({ token: facebookToken });
    } else if (!facebookToken && this.state.loaded) {
      this.setState({ token: false });
    }
  }

  onLoginPress() {
    this.props.navigation.navigate('SignIn');
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  render() {
    const {
      container,
      logo,
      logoContainer,
      textContainer,
      buttonsContainer,
      loginButton,
      signUpButton,
      overlay,
      overlayImage
    } = styles;

    // if (_.isNull(this.state.token)) {
      if (!this.state.ready) {
      return (
        // <View style={container}>
        //   <StatusBar barStyle="light-content" />
        //   <LinearGradient colors={[DARK_BLUE, LIGHT_BLUE]} start={[1, 1]} style={overlay} />
        //   <View style={overlay}>
        //     <Image source={Background} style={overlayImage} />
        //   </View>
        //   <View style={logoContainer}>
        //     <Image source={Logo} style={logo} />
        //     <View style={textContainer}>
        //       <TextBox type="regular" color={WHITE} size={24}>
        //         app
        //       </TextBox>
        //       <TextBox type="bold" color={WHITE} size={24}>
        //         commodation
        //       </TextBox>
        //     </View>
        //   </View>
        //   <ActivityIndicator size="large" color={WHITE} animating={!this.state.loaded} />
        //   <View style={{ flex: 1 }} />
        // </View>
      );
    }

    return (
      <View style={container}>
        <StatusBar barStyle="light-content" />
        <LinearGradient colors={[DARK_BLUE, LIGHT_BLUE]} start={[1, 1]} style={overlay} />
        <View style={overlay}>
          <Image source={Background} style={overlayImage} />
        </View>
        <View style={logoContainer}>
          <Image source={Logo} style={logo} />
          <View style={textContainer}>
            <TextBox type="regular" color={WHITE} size={24}>
              app
            </TextBox>
            <TextBox type="bold" color={WHITE} size={24}>
              commodation
            </TextBox>
          </View>
        </View>
        <View style={buttonsContainer}>
          <Button
            title="SIGN UP"
            textColor={WHITE}
            buttonStyle={signUpButton}
            onPress={() => console.log('SignUpButton')}
          />
          <Button
            title="LOGIN"
            textColor={MAIN_BLUE}
            buttonStyle={loginButton}
            onPress={this.onLoginPress.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: SCREEN_WIDTH / 4,
    height: SCREEN_WIDTH / 4
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 15
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: 20
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
    height: 45,
    width: SCREEN_WIDTH - 70,
    marginTop: 25,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: WHITE
  },
  signUpButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    height: 50,
    width: SCREEN_WIDTH - 70,
    marginTop: 25,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: WHITE
  },
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  overlayImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    opacity: 0.2
  }
});

export default connect(null, { storeHotels })(Welcome);
