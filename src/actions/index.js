import {
  STORE_HOTELS,
  STORE_USER,
  CLEAR_TOKENS,
  FACEBOOK_LOGIN_SUCCESS,
  CLEAR_USER
} from './types';

export const storeUser = user => {
  return {
    type: STORE_USER,
    payload: user
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER
  };
};

export const storeHotels = hotels => {
  return {
    type: STORE_HOTELS,
    payload: hotels
  };
};

export const clearTokens = () => {
  return {
    type: CLEAR_TOKENS
  };
};

export const facebookLoginSuccess = token => {
  return {
    type: FACEBOOK_LOGIN_SUCCESS,
    payload: token
  };
};
