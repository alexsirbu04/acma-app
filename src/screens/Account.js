import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, BackHandler, Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';

import { persistor } from '../store';
import { clearTokens, clearUser } from '../actions';
import { SCREEN_WIDTH, TextBox, Button } from '../components/common';
import { DARK_BLUE, LIGHT_BLUE, WHITE, MAIN_BLUE } from '../../assets/colors';

class Account extends Component {
  constructor(props) {
    super(props);
    this.didFocusSubscription = props.navigation.addListener('didFocus', () =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  componentDidMount() {
    this.willBlurSubscription = this.props.navigation.addListener('willBlur', () =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  componentWillUnmount() {
    this.didFocusSubscription.remove();
    this.willBlurSubscription.remove();
  }

  onBackButtonPressAndroid = () => {
    return true;
  };

  onLogoutPress() {
    this.props.clearTokens();
    this.props.clearUser();
    const keys = ['token', 'facebook_token', 'google_token', 'persist:root'];
    // eslint-disable-next-line
    AsyncStorage.multiRemove(keys, error => {
      if (error) {
        return (
          <TextBox type="regular" color={WHITE} size={20}>
            Error trying to log you out!
          </TextBox>
        );
      }
      persistor.purge();
      this.props.navigation.navigate('Welcome');
    });
  }

  renderAvatar(picture, firstName, lastName) {
    if (picture !== '') {
      return (
        <Avatar width={125} height={125} rounded source={{ uri: picture }} activeOpacity={0.7} />
      );
    }

    const initials = String(firstName).charAt(0) + String(lastName).charAt(0);
    return <Avatar width={125} height={125} title={initials} rounded activeOpacity={0.7} />;
  }

  renderAccountData() {
    const { firstName, lastName, picture } = this.props.user;
    if (String(firstName).length > 0 && String(lastName).length > 0) {
      return (
        <View style={styles.accountDataContainer}>
          {this.renderAvatar(picture, firstName, lastName)}
          <TextBox type="semi-bold" color={WHITE} size={22} style={{ marginTop: 15 }}>
            {firstName} {lastName}
          </TextBox>
        </View>
      );
    }

    return (
      <TextBox type="regular" color={WHITE} size={20}>
        Hello!
      </TextBox>
    );
  }

  render() {
    return (
      <SafeAreaView forceInset={{ bottom: 'always' }} style={styles.container}>
        <LinearGradient colors={[DARK_BLUE, LIGHT_BLUE]} start={[1, 1]} style={styles.gradient} />
        {this.renderAccountData()}
        <Button
          title="LOGOUT"
          textColor={MAIN_BLUE}
          buttonStyle={styles.button}
          onPress={this.onLogoutPress.bind(this)}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  gradient: {
    position: 'absolute',
    height: '120%',
    width: '100%'
  },
  button: {
    backgroundColor: WHITE,
    marginTop: 20,
    height: 50,
    width: SCREEN_WIDTH - 100,
    borderWidth: 1,
    borderColor: WHITE,
    overflow: 'hidden',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  accountDataContainer: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 25 : 50
  }
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { clearTokens, clearUser })(Account);
