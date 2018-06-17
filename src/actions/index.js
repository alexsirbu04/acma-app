import {
  STORE_USER,
  LOGOUT,
  ADD_ERROR,
  CLEAR_ERROR,
  STORE_RESERVATIONS,
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

export const logout = () => {
  return {
    type: LOGOUT
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

export const deleteReservation = (array, index) => {
  return {
    type: DELETE_RESERVATION,
    payload: {
      array,
      index
    }
  };
};

export const clearReservations = () => {
  return {
    type: CLEAR_RESERVATIONS
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
