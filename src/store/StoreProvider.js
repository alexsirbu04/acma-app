import { Font, Asset } from 'expo';
import axios from 'axios';

import images from '../../assets/images';
import { store } from './';
import {
  STORE_HOTELS,
  STORE_RESERVATIONS,
  STORE_USER_RESERVATIONS,
  UPDATE_RESERVATION_STATUS,
  DELETE_RESERVATION,
  ADD_ERROR,
  STORE_TOTAL_AVAILABLE_ROOMS
} from '../actions/types';
import { ONHOLD, ONGOING, FINISHED } from '../constants';
import { HOTELS, RESERVATIONS, ADD_CLIENTS, STATISTICS } from '../endpoints';

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
      const response = await axios.get(HOTELS).catch(() => {
        store.dispatch({
          type: ADD_ERROR,
          payload: 'Something went wrong'
        });
      });
      store.dispatch({
        type: STORE_HOTELS,
        payload: response.data.hotels
      });
    }

    return Promise.all([fontAssets, imageAssets]);
  }

  static async loadUserReservations() {
    const state = store.getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: state.user.token
      }
    };

    if (state.user.role === 'user' && state.user.id !== '') {
      const response = await axios
        .get(`${RESERVATIONS}/user/${state.user.id}`, config)
        .catch(() => {
          store.dispatch({
            type: ADD_ERROR,
            payload: 'Something went wrong'
          });
        });
      if (response.data.reservations.length > 0) {
        store.dispatch({
          type: STORE_USER_RESERVATIONS,
          payload: response.data.reservations
        });
      }
    }
  }

  static async loadReceptionReservations() {
    const state = store.getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: state.user.token
      }
    };

    if (state.user.role === 'receptionist' && state.user.id !== '') {
      const hotel = encodeURIComponent(state.user.hotel);
      const response = await axios.get(`${RESERVATIONS}/reception/${hotel}`, config).catch(() => {
        store.dispatch({
          type: ADD_ERROR,
          payload: 'Something went wrong'
        });
      });
      if (response.status === 200) {
        store.dispatch({
          type: STORE_RESERVATIONS,
          payload: {
            arrivals: response.data.arrivals,
            departures: response.data.departures,
            staying: response.data.staying
          }
        });
      }
    }
  }

  static async deleteReservation(index) {
    const state = store.getState();

    if (state.user.role === 'user' && state.user.id !== '') {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.user.token
        }
      };
      const response = await axios
        .delete(`${RESERVATIONS}/cancel/${state.reservations.userReservations[index].id}`, config)
        .catch(() => {
          store.dispatch({
            type: ADD_ERROR,
            payload: 'Could not cancel your reservation'
          });
        });
      if (response.data.deleted) {
        store.dispatch({
          type: DELETE_RESERVATION,
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

  static async updateReservationStatus(id, status) {
    const state = store.getState();
    let category = '';
    if (status === ONHOLD || status === ONGOING) {
      category = 'arrivals';
    } else if (status === FINISHED) {
      category = 'staying';
    }

    if (
      (state.user.role === 'receptionist' || state.user.role === 'user') &&
      state.user.id !== ''
    ) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.user.token
        }
      };

      const response = await axios.put(`${RESERVATIONS}/${id}`, { status }, config).catch(() =>
        store.dispatch({
          type: ADD_ERROR,
          payload: 'Could not start the check in process'
        })
      );
      if (response.data.updated) {
        store.dispatch({
          type: UPDATE_RESERVATION_STATUS,
          payload: { id, status, category }
        });
      }
    }
  }

  static async addClients(clients) {
    const state = store.getState();

    if (state.user.role === 'user' && state.user.id !== '') {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.user.token
        }
      };

      await axios.post(ADD_CLIENTS, { clients }, config).catch(() =>
        store.dispatch({
          type: ADD_ERROR,
          payload: 'Could not finish the check in process'
        })
      );
    }
  }

  static async loadStatistics() {
    const state = store.getState();

    if (state.user.role === 'manager' && state.user.id !== '') {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.user.token
        }
      };

      const response = await axios
        .get(`${STATISTICS}/total_available_rooms/${state.user.hotel}`, config)
        .catch(() => {
          store.dispatch({
            type: ADD_ERROR,
            payload: 'Something went wrong'
          });
        });

      if (response.status === 200) {
        store.dispatch({
          type: STORE_TOTAL_AVAILABLE_ROOMS,
          payload: {
            totalRooms: response.data.totalRooms,
            months: response.data.months
          }
        });
      }
    }
  }
}
