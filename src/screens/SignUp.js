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
import { FormLabel, FormInput } from 'react-native-elements';
import { connect } from 'react-redux';

import Logo from '../../assets/images/logo.png';
import Background from '../../assets/images/background.jpg';

import { storeUser, addError } from '../actions';
import { registerAccount } from '../actions/auth';
import { SCREEN_HEIGHT, SCREEN_WIDTH, Button } from '../components/common';
import Error from '../components/Error';
import { GREY, WHITE, MAIN_BLUE } from '../../assets/colors';

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

    this.position = new Animated.ValueXY(0, 0);
  }

  state = {
    scaleValue: 1,
    translateValue: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onPressButton() {
    const { firstName, lastName, email, password, confirmPassword } = this.state;
    if (
      firstName.length == 0 ||
      lastName.length == 0 ||
      email.length == 0 ||
      password.length == 0 ||
      confirmPassword.length == 0
    ) {
      this.props.addError('Fields cannot be empty');
    } else {
      if (password !== confirmPassword) {
        this.props.addError("Passwords don't match");
      } else {
        const user = {
          email,
          password,
          firstName,
          lastName
        };
        this.props.storeUser(user);
        this.props.registerAccount(user);
      }
    }
  }

  keyboardDidShow() {
    Animated.timing(this.position, {
      toValue: { x: 0, y: -SCREEN_HEIGHT / 5 }
    }).start();

    const translate = this.position.y.interpolate({
      inputRange: [-SCREEN_HEIGHT / 5, 0, SCREEN_HEIGHT / 5],
      outputRange: [SCREEN_WIDTH / 5, 0, SCREEN_WIDTH / 5]
    });

    const scale = this.position.y.interpolate({
      inputRange: [-SCREEN_HEIGHT / 5, 0, SCREEN_HEIGHT / 5],
      outputRange: [0.5, 1, 0.5]
    });

    this.setState({ scaleValue: scale, translateValue: translate });
  }

  keyboardDidHide() {
    Animated.timing(this.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  render() {
    const {
      container,
      logo,
      logoContainer,
      dataContainer,
      nameInputsContainer,
      input,
      nameInput,
      label,
      button,
      overlay,
      overlayImage
    } = styles;

    return (
      <SafeAreaView forceInset={{ bottom: 'never', top: 'always' }} style={container}>
        <Error />
        <View style={overlay}>
          <Image source={Background} style={overlayImage} />
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
          <Animated.View style={this.position.getLayout()}>
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
              <View style={nameInputsContainer}>
                <View
                  style={{
                    alignItems: 'flex-end',
                    width: '50%'
                  }}
                >
                  <FormLabel labelStyle={[label, { left: 15 }]}>FIRST NAME</FormLabel>
                  <FormInput
                    value={this.state.firstName}
                    onChangeText={firstName => this.setState({ firstName })}
                    placeholder="John"
                    inputStyle={[nameInput, { textAlign: 'right' }]}
                    underlineColorAndroid={GREY}
                    containerStyle={{
                      borderBottomColor: GREY,
                      width: (SCREEN_WIDTH - 80) / 2,
                      left: 15
                    }}
                  />
                </View>
                <View style={{ width: '50%' }}>
                  <FormLabel labelStyle={[label, { right: 15 }]}>LAST NAME</FormLabel>
                  <FormInput
                    value={this.state.lastName}
                    onChangeText={lastName => this.setState({ lastName })}
                    placeholder="Doe"
                    inputStyle={nameInput}
                    underlineColorAndroid={GREY}
                    containerStyle={{
                      borderBottomColor: GREY,
                      width: (SCREEN_WIDTH - 80) / 2,
                      right: 15
                    }}
                  />
                </View>
              </View>
              <FormLabel labelStyle={label}>EMAIL</FormLabel>
              <FormInput
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                placeholder="example@domain.com"
                keyboardType="email-address"
                inputStyle={input}
                underlineColorAndroid={GREY}
                containerStyle={{ borderBottomColor: GREY }}
              />
              <FormLabel labelStyle={label}>PASSWORD</FormLabel>
              <FormInput
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                placeholder="********"
                inputStyle={input}
                underlineColorAndroid={GREY}
                secureTextEntry
                containerStyle={{ borderBottomColor: GREY }}
              />
              <FormLabel labelStyle={label}>CONFIRM PASSWORD</FormLabel>
              <FormInput
                value={this.state.confirmPassword}
                onChangeText={confirmPassword => this.setState({ confirmPassword })}
                placeholder="********"
                inputStyle={input}
                underlineColorAndroid={GREY}
                secureTextEntry
                containerStyle={{ borderBottomColor: GREY }}
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    bottom: 10
  },
  dataContainer: {
    flex: 4,
    alignItems: 'center'
  },
  nameInputsContainer: {
    flexDirection: 'row',
    width: SCREEN_WIDTH - 70,
    marginLeft: 35,
    marginRight: 35
  },
  input: {
    width: SCREEN_WIDTH - 70,
    color: GREY,
    fontFamily: 'regular',
    textAlign: 'center'
  },
  nameInput: {
    width: (SCREEN_WIDTH - 80) / 2,
    color: GREY,
    fontFamily: 'regular'
  },
  label: {
    color: MAIN_BLUE,
    fontFamily: 'semi-bold'
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

export default connect(null, { storeUser, registerAccount, addError })(SignUp);
