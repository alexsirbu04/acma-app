import {
  STORE_USER,
  CLEAR_TOKENS,
  CLEAR_USER,
  ADD_ERROR,
  CLEAR_ERROR,
  STORE_RESERVATIONS,
  ADD_RESERVATION,
  DELETE_RESERVATION,
  CLEAR_RESERVATIONS
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
// SOCIAL ACTIONS
// //////////////////////////////////////

export const clearTokens = () => {
  return {
    type: CLEAR_TOKENS
  };
};

// //////////////////////////////////////
// RESERVATION ACTIONS
// //////////////////////////////////////

export const storeReservations = reservations => {
  return {
    type: STORE_RESERVATIONS,
    payload: reservations
  };
};

export const addReservation = reservation => {
  return {
    type: ADD_RESERVATION,
    payload: reservation
  };
};

export const clearReservations = () => {
  return {
    type: CLEAR_RESERVATIONS
  };
};

export const deleteReservation = index => {
  return {
    type: DELETE_RESERVATION,
    payload: index
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
