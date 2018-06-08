import { STORE_TOTAL_AVAILABLE_ROOMS } from '../actions/types';

const INITIAL_STATE = {
  months: [],
  totalRooms: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_TOTAL_AVAILABLE_ROOMS:
      return { ...state, months: action.payload.months, totalRooms: action.payload.totalRooms };
    default:
      return state;
  }
};
