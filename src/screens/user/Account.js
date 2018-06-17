import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, BackHandler, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';

import ReservationsList from '../../components/reservations/ReservationsList';
import StoreProvider from '../../store/StoreProvider';
import { logout } from '../../actions';
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  TextBox,
  Button,
  Loading,
  TouchableIcon
} from '../../components/common';
import { DARK_BLUE, LIGHT_BLUE, WHITE, MAIN_BLUE } from '../../../assets/colors';

class Account extends Component {
  constructor(props) {
    super(props);
    this.didFocusSubscription = props.navigation.addListener('didFocus', () =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );

    this.onRefreshAsync = this.onRefreshAsync.bind(this);
  }

  state = {
    loading: false
  };

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

  async onLogoutPress() {
    this.setState({ loading: true });
    this.props.logout();
    await AsyncStorage.clear().catch(() => {
      Alert.alert('Error', 'Could not log you out. Please try again!', [{ text: 'OK' }], {
        cancelable: false
      });
    });
    this.setState({ loading: false });
    this.props.navigation.navigate('Welcome');
  }

  async onRefreshAsync() {
    this.setState({ loading: true });
    await StoreProvider.loadUserReservations();
    this.setState({ loading: false });
  }

  renderAvatar(picture, firstName, lastName) {
    const imageDimensions = SCREEN_HEIGHT / 7;
    if (picture !== '') {
      return (
        <Avatar
          width={imageDimensions}
          height={imageDimensions}
          rounded
          source={{ uri: picture }}
        />
      );
    }

    const initials = String(firstName).charAt(0) + String(lastName).charAt(0);
    return <Avatar width={imageDimensions} height={imageDimensions} title={initials} rounded />;
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

    return null;
  }

  renderReservations() {
    const { reservations, user } = this.props;
    if (reservations.length > 0 && user.role === 'user') {
      return <ReservationsList navigation={this.props.navigation} scroll={false} />;
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.loading ? <Loading /> : null}
        <LinearGradient colors={[DARK_BLUE, LIGHT_BLUE]} start={[1, 1]} style={styles.gradient} />
        {this.props.user.role === 'user' ? (
          <TouchableIcon
            name="refresh"
            size={26}
            color={WHITE}
            onPress={this.onRefreshAsync}
            containerStyle={styles.iconContainer}
          />
        ) : null}
        {this.renderAccountData()}
        {this.renderReservations()}
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
  accountDataContainer: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 25 : 50
  },
  button: {
    backgroundColor: WHITE,
    marginTop: 20,
    marginBottom: 10,
    height: 50,
    width: SCREEN_WIDTH - 100,
    overflow: 'hidden',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    position: 'absolute',
    right: 20,
    top: Platform.OS === 'ios' ? 50 : 40
  }
});

const mapStateToProps = state => {
  return {
    user: state.user,
    reservations: state.reservations.userReservations
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(Account);
