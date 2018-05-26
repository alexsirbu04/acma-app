import { STORE_HOTELS } from '../actions/types';

const INITIAL_STATE = {
  hotels: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_HOTELS:
      return { ...state, hotels: action.payload };
    case 'clear_hotels':
      return INITIAL_STATE;
    default:
      return state;
  }
};
