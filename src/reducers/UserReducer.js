import { STORE_USER, CLEAR_USER } from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  first_name: '',
  last_name: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_USER:
      return Object.assign({}, state, action.payload);
    case CLEAR_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
