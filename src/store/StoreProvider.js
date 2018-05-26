import { Font, Asset } from 'expo';
import axios from 'axios';

import images from '../../assets/images';
import { store } from './';
import { STORE_HOTELS, STORE_RESERVATIONS } from '../actions/types';
import { HOTELS, RESERVATIONS } from '../endpoints';

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

    return Promise.all([fontAssets, imageAssets]);
  }
}
