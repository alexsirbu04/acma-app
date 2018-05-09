const INITIAL_STATE = {
  hotels: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'store_hotels':
      return { ...state, hotels: action.payload };
    default:
      return state;
  }
};
