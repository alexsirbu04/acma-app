import { AsyncStorage, Alert } from 'react-native';
import { Facebook } from 'expo';
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types';

export const facebookLogin = () => async dispatch => {
  const facebookToken = await AsyncStorage.getItem('facebook_token');

  if (facebookToken) {
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: facebookToken });
  } else {
    doFacebookLogin(dispatch);
  }
};

// eslint-disable-next-line
const doFacebookLogin = async dispatch => {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync('1804735469587121', {
    permissions: ['public_profile', 'email']
  });

  if (type === 'success') {
    const response = await fetch(
      `https://graph.facebook.com/me?fields=first_name,last_name,email&access_token=${token}`
    );
    const profile = await response.json();

    Alert.alert('Logged in!', 'Hi ' + profile.first_name + '! \nYour email is: ' + profile.email, [
      { text: 'Ok', onPress: () => {} }
    ]);
  } else if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  await AsyncStorage.setItem('facebook_token', token);

  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
