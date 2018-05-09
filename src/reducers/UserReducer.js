const INITIAL_STATE = {
  user: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'store_user':
      return { ...state, user: action.user };
    default:
      return state;
  }
};
