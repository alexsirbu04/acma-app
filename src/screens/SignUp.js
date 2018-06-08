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
import { connect } from 'react-redux';

import Logo from '../../assets/images/logo.png';
import Background from '../../assets/images/background.jpg';

import { storeUser, addError } from '../actions';
import { registerAccount } from '../actions/auth';
import { SCREEN_HEIGHT, SCREEN_WIDTH, Button, Loading, Input } from '../components/common';
import Error from '../components/Error';
import { WHITE, MAIN_BLUE, TRANSPARENT } from '../../assets/colors';

class SignUp extends Component {
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
    opacity: 1,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    loading: false
  };

  static getDerivedStateFromProps(props) {
    if (props.token) {
      props.navigation.navigate('User');
      return {
        loading: false
      };
    }
    if (props.error !== '') {
      return {
        loading: false
      };
    }

    return null;
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onPressButton() {
    const { name, email, password, confirmPassword } = this.state;
    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      this.props.addError('Fields cannot be empty');
    } else {
      if (password !== confirmPassword) {
        this.props.addError("Passwords don't match");
      } else {
        this.setState({ loading: true });
        const splitName = name.split(' ');
        const user = {
          email,
          password,
          firstName: splitName[0],
          lastName: splitName[1],
          picture: ''
        };

        this.props.storeUser(user);
        this.props.registerAccount(user);
        this.setState({ loading: true });
      }
    }
  }

  keyboardDidShow() {
    Animated.timing(this.position, {
      toValue: -SCREEN_HEIGHT / 6
    }).start();

    const opacity = this.position.interpolate({
      inputRange: [-SCREEN_HEIGHT / 6, -SCREEN_HEIGHT / 8, 0],
      outputRange: [0, 0.5, 1]
    });

    this.setState({ opacity });
  }

  keyboardDidHide() {
    Animated.timing(this.position, {
      toValue: 0
    }).start();
  }

  validateInput(type) {
    switch (type) {
      case 'name':
        return /^[a-z ,.'-]+$/i.test(this.state.name);
      case 'email':
        // eslint-disable-next-line
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this.state.email
        );
      case 'password':
        return this.state.password !== '';
      case 'confirmPassword':
        return (
          this.state.confirmPassword != '' && this.state.confirmPassword === this.state.password
        );
      default:
        break;
    }
  }

  render() {
    const { container, logo, logoContainer, dataContainer, button, overlay, overlayImage } = styles;

    return (
      <SafeAreaView forceInset={{ bottom: 'never', top: 'always' }} style={container}>
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
                    opacity: this.state.opacity
                  }
                ]}
              />
            </View>
            <View style={dataContainer}>
              <Input
                value={this.state.name}
                onChangeText={name => this.setState({ name })}
                placeholder="John Doe"
                underlineColorAndroid={TRANSPARENT}
                width={SCREEN_WIDTH - 60}
                icon="account-box"
                valid={this.validateInput('name')}
              />
              <Input
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                placeholder="example@domain.com"
                keyboardType="email-address"
                underlineColorAndroid={TRANSPARENT}
                width={SCREEN_WIDTH - 60}
                icon="email"
                valid={this.validateInput('email')}
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
                valid={this.validateInput('password')}
              />
              <Input
                value={this.state.confirmPassword}
                onChangeText={confirmPassword => this.setState({ confirmPassword })}
                placeholder="********"
                underlineColorAndroid={TRANSPARENT}
                secureTextEntry
                width={SCREEN_WIDTH - 60}
                icon="lock"
                iconType="font-awesome"
                valid={this.validateInput('confirmPassword')}
              />
              <Button
                title="CREATE ACCOUNT"
                textColor={WHITE}
                buttonStyle={button}
                onPress={() => this.onPressButton()}
              />
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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dataContainer: {
    flex: 5,
    alignItems: 'center'
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
  },
  screenOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#000',
    opacity: 0.3,
    zIndex: 3
  }
});

const mapStateToProps = state => {
  return {
    token: state.user.token,
    error: state.errors.error
  };
};

export default connect(
  mapStateToProps,
  { storeUser, registerAccount, addError }
)(SignUp);
