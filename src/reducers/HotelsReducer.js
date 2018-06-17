import { STORE_HOTELS, LOGOUT } from '../actions/types';

const INITIAL_STATE = {
  hotels: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_HOTELS:
      return { ...state, hotels: action.payload };
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
