import React, { Component } from 'react';
import { 
  View, 
  SafeAreaView, 
  Text, 
  StyleSheet, 
  Image,
  Dimensions,
  ActivityIndicator,
  StatusBar    
} from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { connect } from 'react-redux';

import { storeHotels } from '../actions';

import Logo from '../assets/logoSecond.png';
import Background from '../assets/background.jpg';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Welcome extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    loaded: false
  }

  componentWillMount() {
    const hotels = [];
    axios.get('https://secure-stream-51486.herokuapp.com/hotels')
      .then(response => {
        for (const hotel of response.data.hotels) {
          hotels.push(hotel);
        }
        this.props.storeHotels(hotels);
        this.setState({ loaded: true });
      });
  }

  onPressLogin() {
    this.props.navigation.navigate('SignIn');
  }

  render() {
    return(
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle='light-content'
        />
        <View style={styles.overlay}>
          <Image source={Background} style={styles.overlayImage} />
        </View>
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              app
            </Text>
            <Text style={[styles.text, { fontWeight: 'bold'}]}>
              commodation
            </Text>
          </View>
        </View>
        <ActivityIndicator size='large' color='#fff' animating={!this.state.loaded} />
        <View style={styles.buttonsContainer}>
          <Button
            backgroundColor='rgba(255, 255, 255, 0)'
            title='SIGN UP'
            rounded
            fontWeight='700'
            containerViewStyle={styles.signUpButton}
          />
          <Button
            backgroundColor='#eee'
            color='#1D7CF4'
            title='LOGIN'
            rounded
            fontWeight='700'
            containerViewStyle={styles.loginButton}
            onPress={this.onPressLogin.bind(this)}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D7CF4',
    justifyContent: 'center',
    alignItems: 'center',
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
  text: {
    color: '#eee',
    fontSize: 24
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginButton: {
    width: SCREEN_WIDTH - 70,
    marginTop: 25,
    marginBottom: 5
  },
  signUpButton: {
    width: SCREEN_WIDTH - 70,
    marginTop: 25,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#eee'
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

export default connect(null, { storeHotels })(Welcome);
