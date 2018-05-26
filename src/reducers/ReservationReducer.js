import { STORE_RESERVATIONS } from '../actions/types';

const INITIAL_STATE = {
  reservations: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_RESERVATIONS:
      return { ...state, reservations: action.payload };
    default:
      return state;
  }
};
