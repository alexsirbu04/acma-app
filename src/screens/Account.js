import React, { Component } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';

import { persistor } from '../store';
import { clearTokens, clearUser } from '../actions';
import { SCREEN_WIDTH, Header, TextBox, Button } from '../components/common';
import { DARK_BLUE, LIGHT_BLUE, WHITE, MAIN_BLUE } from '../../assets/colors';

class Account extends Component {
  onLogoutPress() {
    this.props.clearTokens();
    this.props.clearUser();
    persistor.purge();
    const keys = ['facebook_token', 'persist:root'];
    // eslint-disable-next-line
    AsyncStorage.multiRemove(keys, error => {
      if (error) {
        return (
          <TextBox type="regular" color={WHITE} size={20}>
            Error trying to log you out!
          </TextBox>
        );
      }
      this.props.navigation.navigate('Welcome');
    });
  }

  renderAccountData() {
    if (this.props.user) {
      return (
        <TextBox type="regular" color={WHITE} size={20}>
          Hello {this.props.user.first_name} {this.props.user.last_name}!
        </TextBox>
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
      <SafeAreaView forceInset={{ bottom: 'always', top: 'never' }} style={styles.container}>
        <LinearGradient colors={[DARK_BLUE, LIGHT_BLUE]} start={[1, 1]} style={styles.gradient} />
        <Header title="Account" />
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
    width: SCREEN_WIDTH - 70,
    borderWidth: 1,
    borderColor: WHITE,
    overflow: 'hidden',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { clearTokens, clearUser })(Account);
