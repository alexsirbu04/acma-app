import { Font, Asset } from 'expo';
import axios from 'axios';

import images from '../../assets/images';
import { store } from './';
import { STORE_HOTELS, STORE_RESERVATIONS, CANCEL_RESERVATION, ADD_ERROR } from '../actions/types';
import { HOTELS, RESERVATIONS, DELETE_RESERVATION } from '../endpoints';

export default class StoreProvider {
  static async loadAssets() {
    const fontAssets = Font.loadAsync({
      bold: require('../../assets/fonts/OpenSans-Bold.ttf'),
      'semi-bold': require('../../assets/fonts/OpenSans-SemiBold.ttf'),
      regular: require('../../assets/fonts/OpenSans-Regular.ttf')
    });

    const imageAssets = () => {
      return images.map(image => {
        return Asset.fromModule(image).downloadAsync();
      });
    };

    const state = store.getState();
    if (!state.hotelsArray.hotels || state.hotelsArray.hotels.length < 1) {
      const response = await axios.get(HOTELS);
      store.dispatch({
        type: STORE_HOTELS,
        payload: response.data.hotels
      });
    }

    return Promise.all([fontAssets, imageAssets]);
  }

  static async loadReservations() {
    const state = store.getState();
    if (state.user.role === 'user') {
      if (state.user.userId !== '') {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: state.user.token
          }
        };
        const response = await axios.get(`${RESERVATIONS}/${state.user.id}`, config);
        if (response.data.reservations.length > 0) {
          store.dispatch({
            type: STORE_RESERVATIONS,
            payload: response.data.reservations
          });
        }
      }
    }
  }

  static async cancelReservation(index) {
    const state = store.getState();
    if (state.user.role === 'user') {
      if (state.user.userId !== '') {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: state.user.token
          }
        };
        const response = await axios.delete(
          `${DELETE_RESERVATION}/${state.reservationsArray.reservations[index].id}`,
          config
        );
        if (response.data.deleted) {
          store.dispatch({
            type: CANCEL_RESERVATION,
            payload: index
          });
        } else {
          store.dispatch({
            type: ADD_ERROR,
            payload: 'Could not cancel your reservation'
          });
        }
      }
    }
  }
}
