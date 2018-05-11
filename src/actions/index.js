import { STORE_HOTELS } from './types';

export const storeUser = user => {
  return {
    type: 'store_user',
    payload: user
  };
};

export const storeHotels = hotels => {
  return {
    type: STORE_HOTELS,
    payload: hotels
  };
};
