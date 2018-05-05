export const storeUser = (user) => {
  return {
    type: 'store_user',
    payload: user
  };
};

export const storeHotels = (hotels) => {
  return {
    type: 'store_hotels',
    payload: hotels
  };
};
