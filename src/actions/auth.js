import { AsyncStorage } from 'react-native';
import { Facebook, Google } from 'expo';
import axios from 'axios';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL,
  STORE_USER,
  ADD_ERROR
} from './types';
import { REGISTER, LOGIN } from '../endpoints';

export const signInSocial = social => async dispatch => {
  switch (social) {
    case 'facebook':
      const facebookToken = await AsyncStorage.getItem('facebook_token');

      if (facebookToken) {
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: facebookToken });
      } else {
        doFacebookLogin(dispatch);
      }
      break;
    case 'google':
      const googleToken = await AsyncStorage.getItem('google_token');

      if (googleToken) {
        dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: googleToken });
      } else {
        doGoogleLogin(dispatch);
      }
      break;
    default:
      break;
  }
};

const doFacebookLogin = async dispatch => {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync('1804735469587121', {
    permissions: ['public_profile', 'email']
  });

  if (type === 'success') {
    const response = await fetch(
      `https://graph.facebook.com/me/?fields=first_name,last_name,email,picture.width(300).height(300)&access_token=${token}`
    );
    const profile = await response.json();

    const userObject = {
      email: profile.email,
      password: '',
      firstName: profile.first_name,
      lastName: profile.last_name,
      picture: profile.picture.data.url
    };
    dispatch({ type: STORE_USER, payload: userObject });

    await AsyncStorage.setItem('facebook_token', token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else if (type === 'cancel') {
    dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }
};

const doGoogleLogin = async dispatch => {
  const { type, accessToken, user } = await Google.logInAsync({
    androidClientId: '802264788300-dv1ag5t0pth80h925gpe6rkgim2ndfg2.apps.googleusercontent.com',
    iosClientId: '802264788300-5jvpdr9od7q347chd92aldvk8pvbldm2.apps.googleusercontent.com',
    scopes: ['profile', 'email']
  });

  if (type === 'success') {
    const userObject = {
      email: user.email,
      password: '',
      firstName: user.givenName,
      lastName: user.familyName,
      picture: user.photoUrl
    };
    dispatch({ type: STORE_USER, payload: userObject });

    await AsyncStorage.setItem('google_token', accessToken);
    dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: accessToken });
  } else if (type === 'cancel') {
    dispatch({ type: GOOGLE_LOGIN_FAIL });
  }
};

export const registerAccount = user => dispatch => {
  axios
    .post(REGISTER, user)
    .then(response => {
      const { token } = response.data;
      if (token) {
        login({ email: user.email, password: user.password });
      } else {
        dispatch({ type: ADD_ERROR, payload: 'Could not create an account' });
      }
    })
    .catch(error => {
      if (String(error).includes('422')) {
        dispatch({ type: ADD_ERROR, payload: 'Email taken' });
      } else {
        dispatch({ type: ADD_ERROR, payload: 'Could not create an account' });
      }
    });
};

export const login = credentials => dispatch => {
  axios
    .post(LOGIN, credentials)
    .then(response => {
      const { email, firstName, lastName } = response.data.user;
      const { token } = response.data;
      const userObject = {
        email,
        firstName,
        lastName
      };

      dispatch({ type: STORE_USER, payload: userObject });
      AsyncStorage.setItem('token', token);
      dispatch({ type: LOGIN_SUCCESS, payload: token });
    })
    .catch(error => {
      if (String(error).includes('401')) {
        dispatch({ type: ADD_ERROR, payload: 'Account not found' });
        dispatch({ type: LOGIN_FAIL });
      } else {
        dispatch({ type: ADD_ERROR, payload: 'Could not login' });
        dispatch({ type: LOGIN_FAIL });
      }
    });
};
