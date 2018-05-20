import { Font, Asset } from 'expo';
import axios from 'axios';
import { STORE_HOTELS } from '../actions/types';
import { HOTELS } from '../endpoints';

import images from '../../assets/images';

export default class StoreProvider {
  static async loadAssetsAsync(store) {
    const state = store.getState();
    if (!state.hotelsArray.hotels || state.hotelsArray.hotels.length < 1) {
      const response = await axios.get(HOTELS);
      store.dispatch({
        type: STORE_HOTELS,
        payload: response.data.hotels
      });
    }

    await Font.loadAsync({
      bold: require('../../assets/fonts/OpenSans-Bold.ttf'),
      'semi-bold': require('../../assets/fonts/OpenSans-SemiBold.ttf'),
      regular: require('../../assets/fonts/OpenSans-Regular.ttf')
    });

    await images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
  }
}
