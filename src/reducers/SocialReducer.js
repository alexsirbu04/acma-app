import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from '../actions/types';

const INITIAL_STATE = {
  token: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { ...state, token: action.payload };
    case FACEBOOK_LOGIN_FAIL:
      return { ...state, token: null };
    default:
      return state;
  }
};
