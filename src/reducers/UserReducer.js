import { STORE_USER, CLEAR_USER, LOGOUT } from '../actions/types';

const INITIAL_STATE = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  picture: '',
  role: '',
  hotel: '',
  token: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_USER:
      return Object.assign({}, state, action.payload);
    case CLEAR_USER:
      return INITIAL_STATE;
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
