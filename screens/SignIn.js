import React, { Component } from 'react'; 
import {
  StyleSheet,
  Text, 
  View, 
  Image, 
  SafeAreaView, 
  Dimensions, 
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard, 
  Animated 
} from 'react-native';
import { Button, FormLabel, FormInput, SocialIcon, Icon } from 'react-native-elements';
import Hr from 'react-native-hr-plus';

import Logo from '../assets/logo.png';
import Background from '../assets/background.jpg';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class SignIn extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    scaleValue: 1,
    translateValue: 0
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));

    this.position = new Animated.ValueXY(0, 0);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow() {
    Animated.timing(this.position, {
      toValue: { x: 0, y: -SCREEN_HEIGHT / 5 }
    }).start();

    scale = this.position.y.interpolate({
      inputRange: [-SCREEN_HEIGHT / 5, 0, SCREEN_HEIGHT / 5],
      outputRange: [0.5, 1, 0.5]
    });

    translate = this.position.y.interpolate({
      inputRange: [-SCREEN_HEIGHT / 5, 0, SCREEN_HEIGHT / 5],
      outputRange: [SCREEN_WIDTH / 3, 0, SCREEN_WIDTH / 3]
    });

    this.setState({ scaleValue: scale, translateValue: translate });
  }

  keyboardDidHide() {
    Animated.timing(this.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  render() {
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.overlay}>
            <Image source={Background} style={styles.overlayImage} />
          </View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
            <Animated.View style={this.position.getLayout()}>
              <Animated.View 
                style={[
                  styles.logoContainer, { 
                    transform: [{ 
                      scale: this.state.scaleValue
                    }, { 
                      translateY: this.state.translateValue 
                      }] 
                    }
                  ]}
                >
                <Animated.Image source={Logo} style={styles.logo} />
              </Animated.View>
              <View style={styles.dataContainer}>
                <FormLabel labelStyle={styles.label}>EMAIL</FormLabel>
                <FormInput inputStyle={styles.input} />
                <FormLabel labelStyle={styles.label}>PASSWORD</FormLabel>
                <FormInput inputStyle={styles.input} />
                <Button
                  backgroundColor='#1D7CF4'
                  title='LOGIN'
                  rounded
                  fontWeight='700'
                  containerViewStyle={styles.button}
                />
                <Hr color="#bbb" style={{ width: SCREEN_WIDTH - 70}}>
                  <Text style={styles.text}>
                    OR
                  </Text>
                </Hr>
                <View style={styles.socialContainer}>
                  <SocialIcon
                    title='FACEBOOK'
                    button
                    type='facebook'
                    raised={false}
                    style={{ width: SCREEN_WIDTH / 2 - 40, height: 45 }}
                  />
                  <SocialIcon
                    title='GOOGLE'
                    button
                    raised={false}
                    type='google-plus'
                    style={{ width: SCREEN_WIDTH / 2 - 40, height: 45, backgroundColor: "#dd4b39" }}
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
    backgroundColor: '#e5e5e5',
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
    alignItems: 'center',
    marginBottom: 15
  },
  dataContainer: {
    flex: 2,
    alignItems: 'center'
  },
  socialContainer: {
    flexDirection: 'row'
  },
  text: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#bbb',
    fontSize: 12
  },
  input: {
    width: SCREEN_WIDTH - 70
  },
  label: {
    color: '#1D7CF4'
  },
  button: {
    width: SCREEN_WIDTH - 70,
    marginTop: 25,
    marginBottom: 5
  },
  overlay: {
    position: 'absolute'
  },
  overlayImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    opacity: 0.1
  }
});
