import {
  STORE_HOTELS,
  STORE_USER,
  CLEAR_TOKENS,
  CLEAR_USER,
  ADD_ERROR,
  CLEAR_ERROR
} from './types';

// //////////////////////////////////////
// USER ACTIONS
// //////////////////////////////////////

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

// //////////////////////////////////////
// HOTELS ACTIONS
// //////////////////////////////////////

export const storeHotels = hotels => {
  return {
    type: STORE_HOTELS,
    payload: hotels
  };
};

// //////////////////////////////////////
// SOCIAL ACTIONS
// //////////////////////////////////////

export const clearTokens = () => {
  return {
    type: CLEAR_TOKENS
  };
};

// //////////////////////////////////////
// ERROR ACTIONS
// //////////////////////////////////////

export const addError = text => {
  return {
    type: ADD_ERROR,
    payload: text
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  };
};
