import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  BackHandler
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { FormLabel, FormInput, SocialIcon } from 'react-native-elements';
import { connect } from 'react-redux';

import Logo from '../../assets/images/logo.png';
import Background from '../../assets/images/background.jpg';

import { facebookLogin } from '../actions/auth';
import { SCREEN_HEIGHT, SCREEN_WIDTH, Button, Hr } from '../components/common';
import { GREY, WHITE, MAIN_BLUE } from '../../assets/colors';

class SignIn extends Component {
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
    translateValue: 0
  };

  componentDidMount() {
    this.onSocialAuthComplete(this.props);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillReceiveProps(nextProps) {
    this.onSocialAuthComplete(nextProps);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  onSocialAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('Dashboard');
    }
  }

  onLoginPress() {
    this.props.navigation.navigate('Dashboard');
  }

  handleBackButton() {
    return true;
  }

  keyboardDidShow() {
    Animated.timing(this.position, {
      toValue: { x: 0, y: -SCREEN_HEIGHT / 5 }
    }).start();

    const translate = this.position.y.interpolate({
      inputRange: [-SCREEN_HEIGHT / 5, 0, SCREEN_HEIGHT / 5],
      outputRange: [SCREEN_WIDTH / 3, 0, SCREEN_WIDTH / 3]
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
        <View style={overlay}>
          <Image source={Background} style={overlayImage} />
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
          <Animated.View style={this.position.getLayout()}>
            <Animated.View
              style={[
                logoContainer,
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
            >
              <Image source={Logo} style={logo} />
            </Animated.View>
            <View style={dataContainer}>
              <FormLabel labelStyle={label}>EMAIL</FormLabel>
              <FormInput
                inputStyle={input}
                underlineColorAndroid={GREY}
                containerStyle={{ borderBottomColor: GREY }}
              />
              <FormLabel labelStyle={label}>PASSWORD</FormLabel>
              <FormInput
                inputStyle={input}
                underlineColorAndroid={GREY}
                secureTextEntry
                containerStyle={{ borderBottomColor: GREY }}
              />
              <Button
                title="LOGIN"
                textColor={WHITE}
                buttonStyle={button}
                onPress={this.onLoginPress.bind(this)}
              />
              <Hr text="OR" containerStyle={{ width: SCREEN_WIDTH - 70 }} />
              <View style={socialContainer}>
                <SocialIcon
                  title="FACEBOOK"
                  button
                  type="facebook"
                  raised={false}
                  style={{ width: SCREEN_WIDTH / 2 - 40 }}
                  onPress={() => {
                    this.props.facebookLogin();
                  }}
                />
                <SocialIcon
                  title="GOOGLE"
                  button
                  raised={false}
                  type="google-plus"
                  style={{ width: SCREEN_WIDTH / 2 - 40, backgroundColor: '#dd4b39' }}
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
  text: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: GREY,
    fontSize: 12
  },
  input: {
    width: SCREEN_WIDTH - 70,
    color: GREY
  },
  label: {
    color: MAIN_BLUE
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
    token: state.social.token
  };
};

const mapDispatchToProps = dispatch => ({
  facebookLogin: () => {
    dispatch(facebookLogin());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
