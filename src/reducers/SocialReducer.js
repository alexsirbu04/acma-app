import {
  SOCIAL_ACCOUNT,
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL,
  CLEAR_TOKENS,
  LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
  token: null,
  account: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SOCIAL_ACCOUNT:
      return { ...state, account: action.payload };
    case FACEBOOK_LOGIN_SUCCESS:
      return { ...state, token: action.payload };
    case FACEBOOK_LOGIN_FAIL:
      return INITIAL_STATE;
    case GOOGLE_LOGIN_SUCCESS:
      return { ...state, token: action.payload };
    case GOOGLE_LOGIN_FAIL:
      return INITIAL_STATE;
    case CLEAR_TOKENS:
      return INITIAL_STATE;
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
