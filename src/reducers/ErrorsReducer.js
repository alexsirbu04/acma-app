import { ADD_ERROR, CLEAR_ERROR } from '../actions/types';

const INITIAL_STATE = {
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_ERROR:
      return INITIAL_STATE;
    default:
      return state;
  }
};
