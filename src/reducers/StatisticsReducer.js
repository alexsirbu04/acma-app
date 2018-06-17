import { STORE_STATISTICS, CLEAR_STATISTICS, LOGOUT } from '../actions/types';

const INITIAL_STATE = {
  months: [],
  countries: [],
  totalRooms: 0,
  totalClients: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_STATISTICS:
      return {
        ...state,
        months: action.payload.months,
        countries: action.payload.countries,
        totalRooms: action.payload.totalRooms,
        totalClients: action.payload.totalCountries
      };
    case CLEAR_STATISTICS:
      return INITIAL_STATE;
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
