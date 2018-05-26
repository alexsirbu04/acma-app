import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { FormLabel, FormInput, SocialIcon } from 'react-native-elements';
import { connect } from 'react-redux';

import Logo from '../../assets/images/logo.png';
import Background from '../../assets/images/background.jpg';

import { signInSocial, login } from '../actions/auth';
import { addError } from '../actions';
import { SCREEN_HEIGHT, SCREEN_WIDTH, Button, Hr, Loading } from '../components/common';
import Error from '../components/Error';
import { GREY, WHITE, MAIN_BLUE } from '../../assets/colors';

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

    this.position = new Animated.ValueXY(0, 0);
  }

  state = {
    scaleValue: 1,
    translateValue: 0,
    email: '',
    password: '',
    loading: false
  };

  componentDidMount() {
    this.onAuthComplete(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.token || nextProps.user.token) && nextProps.account) {
      this.onAuthComplete(nextProps);
    }
    if (nextProps.error !== '') {
      this.setState({ loading: false });
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onAuthComplete(props) {
    if ((props.token || props.user.token) && props.account) {
      this.setState({ loading: false });
      this.props.navigation.navigate('Dashboard');
    }
  }

  onPressLogin() {
    const { email, password } = this.state;
    if (email.length == 0 || password.length == 0) {
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
      toValue: { x: 0, y: -SCREEN_HEIGHT / 5 }
    }).start();

    const translate = this.position.y.interpolate({
      inputRange: [-SCREEN_HEIGHT / 5, 0, SCREEN_HEIGHT / 5],
      outputRange: [SCREEN_WIDTH / 4, 0, SCREEN_WIDTH / 4]
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
      socialContainer,
      input,
      label,
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
    justifyContent: 'flex-end',
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
  input: {
    width: SCREEN_WIDTH - 70,
    color: GREY,
    fontFamily: 'regular',
    textAlign: 'center'
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

const mapStateToProps = state => {
  return {
    token: state.social.token,
    account: state.social.account,
    user: state.user
  };
};

export default connect(mapStateToProps, { signInSocial, login, addError })(SignIn);
