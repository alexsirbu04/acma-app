import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { SocialIcon } from 'react-native-elements';
import { connect } from 'react-redux';

import Logo from '../../assets/images/logo-light.png';
import Background from '../../assets/images/background.jpg';

import StoreProvider from '../store/StoreProvider';
import { signInSocial, login } from '../actions/auth';
import { addError } from '../actions';
import { SCREEN_HEIGHT, SCREEN_WIDTH, Button, Hr, Loading, Input } from '../components/common';
import Error from '../components/Error';
import { WHITE, MAIN_BLUE, TRANSPARENT } from '../../assets/colors';

export class SignIn extends Component {
  constructor(props) {
    super(props);

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow.bind(this)
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide.bind(this)
    );

    this.position = new Animated.Value(0);
  }

  state = {
    scaleValue: 1,
    translateValue: 0,
    email: '',
    password: '',
    loading: false,
    navigated: false
  };

  static getDerivedStateFromProps(props, state) {
    const { user, hotels, reservations, statistics, navigation } = props;

    if (hotels.length > 0 && user.role === 'user' && !state.navigated) {
      navigation.navigate('User');
      return {
        loading: false,
        navigated: true
      };
    }

    if (
      (reservations.arrivals.length > 0 ||
        reservations.departures.length > 0 ||
        reservations.staying.length > 0) &&
      user.role === 'receptionist' &&
      state.navigated === false
    ) {
      navigation.navigate('Reception');
      return {
        loading: false,
        navigated: true
      };
    }

    if (
      statistics.months.length > 0 &&
      statistics.countries.length > 0 &&
      user.role === 'manager' &&
      state.navigated === false
    ) {
      navigation.navigate('Manager');
      return {
        loading: false,
        navigated: true
      };
    }

    if (props.error !== '') {
      return {
        loading: false
      };
    }

    return null;
  }

  componentDidUpdate() {
    const { token, user } = this.props;

    if ((token || user.token) && user.role === 'user') {
      StoreProvider.loadHotels();
      StoreProvider.loadUserReservations();
    }

    if ((token || user.token) && user.role === 'receptionist') {
      StoreProvider.loadReceptionReservations();
    }

    if ((token || user.token) && user.role === 'manager') {
      StoreProvider.loadStatistics();
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onPressLogin() {
    const { email, password } = this.state;
    if (email.length === 0 || password.length === 0) {
      this.props.addError('Fields cannot be empty');
    } else {
      const credentials = {
        email,
        password
      };
      this.props.login(credentials);
      this.setState({ loading: true });
    }
  }

  keyboardDidShow() {
    Animated.timing(this.position, {
      toValue: -SCREEN_HEIGHT / 7
    }).start();

    const translate = this.position.interpolate({
      inputRange: [-SCREEN_HEIGHT / 7, 0, SCREEN_HEIGHT / 7],
      outputRange: [100, 0, 100]
    });

    const scale = this.position.interpolate({
      inputRange: [-SCREEN_HEIGHT / 7, 0, SCREEN_HEIGHT / 7],
      outputRange: [0.5, 1, 0.5]
    });

    this.setState({ scaleValue: scale, translateValue: translate });
  }

  keyboardDidHide() {
    Animated.timing(this.position, {
      toValue: 0
    }).start();
  }

  validateEmail() {
    // eslint-disable-next-line
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      this.state.email
    );
  }

  render() {
    const {
      container,
      logo,
      logoContainer,
      dataContainer,
      socialContainer,
      button,
      overlay,
      overlayImage
    } = styles;

    return (
      <SafeAreaView forceInset={{ bottom: 'always', top: 'always' }} style={container}>
        {this.state.loading ? <Loading /> : null}
        <Error />
        <View style={overlay}>
          <Image source={Background} style={overlayImage} />
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
          <Animated.View style={{ transform: [{ translateY: this.position }] }}>
            <View style={logoContainer}>
              <Animated.Image
                source={Logo}
                style={[
                  logo,
                  {
                    transform: [
                      {
                        scale: this.state.scaleValue
                      },
                      {
                        translateY: this.state.translateValue
                      }
                    ]
                  }
                ]}
              />
            </View>
            <View style={dataContainer}>
              <Input
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                placeholder="example@domain.com"
                keyboardType="email-address"
                underlineColorAndroid={TRANSPARENT}
                width={SCREEN_WIDTH - 60}
                icon="email"
                valid={this.validateEmail()}
              />
              <Input
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                placeholder="********"
                underlineColorAndroid={TRANSPARENT}
                secureTextEntry
                width={SCREEN_WIDTH - 60}
                icon="lock"
                iconType="font-awesome"
                valid={this.state.password !== ''}
              />
              <Button
                title="LOGIN"
                textColor={WHITE}
                buttonStyle={button}
                onPress={() => this.onPressLogin()}
              />
              <Hr
                text="OR CONNECT WITH"
                color="#aaa"
                containerStyle={{ width: SCREEN_WIDTH - 70 }}
              />
              <View style={socialContainer}>
                <SocialIcon
                  title="FACEBOOK"
                  button
                  type="facebook"
                  raised={false}
                  style={{ width: SCREEN_WIDTH / 2 - 40 }}
                  onPress={() => {
                    this.props.signInSocial('facebook');
                    this.setState({ loading: true });
                  }}
                />
                <SocialIcon
                  title="GOOGLE"
                  button
                  raised={false}
                  type="google-plus"
                  style={{ width: SCREEN_WIDTH / 2 - 40, backgroundColor: '#dd4b39' }}
                  onPress={() => {
                    this.props.signInSocial('google');
                    this.setState({ loading: true });
                  }}
                />
              </View>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
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
    width: SCREEN_WIDTH / 3,
    height: SCREEN_WIDTH / 3
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dataContainer: {
    flex: 2,
    alignItems: 'center',
    top: 15
  },
  socialContainer: {
    flexDirection: 'row'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MAIN_BLUE,
    height: 50,
    width: SCREEN_WIDTH - 70,
    marginTop: 25,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: MAIN_BLUE
  },
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0
  },
  overlayImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    opacity: 0.2
  }
});

const mapStateToProps = state => {
  return {
    token: state.social.token,
    account: state.social.account,
    user: state.user,
    error: state.errors.error,
    hotels: state.hotelsArray.hotels,
    reservations: state.reservations,
    statistics: state.statistics
  };
};

export default connect(
  mapStateToProps,
  { signInSocial, login, addError }
)(SignIn);
