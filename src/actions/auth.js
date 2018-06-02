import { AsyncStorage } from 'react-native';
import { Facebook, Google } from 'expo';
import axios from 'axios';

import {
  SOCIAL_ACCOUNT,
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL,
  STORE_USER,
  ADD_ERROR
} from './types';
import { REGISTER, LOGIN, SOCIAL_LOGIN } from '../endpoints';

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
  try {
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
        password: token.substring(0, 10),
        firstName: profile.first_name,
        lastName: profile.last_name,
        picture: profile.picture.data.url,
        role: 'user',
        hotel: ''
      };
      dispatch({ type: STORE_USER, payload: userObject });
      await loginSocial(userObject, dispatch);

      await AsyncStorage.setItem('facebook_token', token);
      dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else if (type === 'cancel') {
      dispatch({ type: FACEBOOK_LOGIN_FAIL });
      dispatch({ type: ADD_ERROR, payload: 'Cancelled' });
    }
  } catch (err) {
    dispatch({ type: FACEBOOK_LOGIN_FAIL });
    dispatch({ type: ADD_ERROR, payload: 'Cancelled' });
  }
};

const doGoogleLogin = async dispatch => {
  try {
    const { type, accessToken, user } = await Google.logInAsync({
      androidClientId: '802264788300-dv1ag5t0pth80h925gpe6rkgim2ndfg2.apps.googleusercontent.com',
      iosClientId: '802264788300-5jvpdr9od7q347chd92aldvk8pvbldm2.apps.googleusercontent.com',
      scopes: ['profile', 'email']
    });

    if (type === 'success') {
      const userObject = {
        email: user.email,
        password: accessToken.substring(0, 10),
        firstName: user.givenName,
        lastName: user.familyName,
        picture: user.photoUrl,
        role: 'user',
        hotel: ''
      };
      dispatch({ type: STORE_USER, payload: userObject });
      await loginSocial(userObject, dispatch);

      await AsyncStorage.setItem('google_token', accessToken);
      dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: accessToken });
    } else if (type === 'cancel') {
      dispatch({ type: GOOGLE_LOGIN_FAIL });
      dispatch({ type: ADD_ERROR, payload: 'Cancelled' });
    }
  } catch (err) {
    dispatch({ type: GOOGLE_LOGIN_FAIL });
    dispatch({ type: ADD_ERROR, payload: 'Cancelled' });
  }
};

const registerSocial = async (user, dispatch) => {
  axios
    .post(REGISTER, user)
    .then(async response => {
      const { token } = response.data;
      if (token) {
        await loginSocial({ email: user.email, password: user.password }, dispatch);
      } else {
        dispatch({ type: ADD_ERROR, payload: 'Could not create an account' });
        dispatch({ type: SOCIAL_ACCOUNT, payload: false });
      }
    })
    .catch(error => {
      if (String(error).includes('422')) {
        dispatch({ type: ADD_ERROR, payload: 'Email taken' });
      } else {
        dispatch({ type: ADD_ERROR, payload: 'Could not create an account' });
        dispatch({ type: SOCIAL_ACCOUNT, payload: false });
      }
    });
};

const loginSocial = async (user, dispatch) => {
  axios
    .post(SOCIAL_LOGIN, { email: user.email, password: user.password })
    .then(async response => {
      const { _id, email, firstName, lastName, picture, role, hotel } = response.data.user;
      const { token } = response.data;
      const userObject = {
        id: _id,
        email,
        firstName,
        lastName,
        picture,
        role,
        hotel,
        token
      };

      await AsyncStorage.setItem('token', token);
      dispatch({ type: STORE_USER, payload: userObject });
      dispatch({ type: SOCIAL_ACCOUNT, payload: true });
    })
    .catch(async error => {
      if (String(error).includes('401')) {
        await registerSocial(user, dispatch);
      } else {
        dispatch({ type: ADD_ERROR, payload: 'Could not login' });
        dispatch({ type: SOCIAL_ACCOUNT, payload: false });
      }
    });
};

export const registerAccount = user => dispatch => {
  axios
    .post(REGISTER, user)
    .then(response => {
      const { token } = response.data;
      if (token) {
        loginHelper({ email: user.email, password: user.password }, dispatch);
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

const loginHelper = async (user, dispatch) => {
  axios
    .post(LOGIN, { email: user.email, password: user.password })
    .then(async response => {
      const { _id, email, firstName, lastName, picture, role, hotel } = response.data.user;
      const { token } = response.data;
      const userObject = {
        id: _id,
        email,
        firstName,
        lastName,
        picture,
        role,
        hotel,
        token
      };

      await AsyncStorage.setItem('token', token);
      dispatch({ type: STORE_USER, payload: userObject });
      dispatch({ type: SOCIAL_ACCOUNT, payload: true });
    })
    .catch(() => {
      dispatch({ type: ADD_ERROR, payload: 'Could not login' });
      dispatch({ type: SOCIAL_ACCOUNT, payload: false });
    });
};

export const login = credentials => async dispatch => {
  axios
    .post(LOGIN, credentials)
    .then(async response => {
      const { _id, email, firstName, lastName, picture, role, hotel } = response.data.user;
      const { token } = response.data;
      const userObject = {
        id: _id,
        email,
        firstName,
        lastName,
        picture,
        role,
        hotel,
        token
      };

      await AsyncStorage.setItem('token', token);
      dispatch({ type: STORE_USER, payload: userObject });
    })
    .catch(error => {
      if (String(error).includes('401')) {
        dispatch({ type: ADD_ERROR, payload: 'Account not found' });
      } else {
        dispatch({ type: ADD_ERROR, payload: 'Could not login' });
      }
    });
};
