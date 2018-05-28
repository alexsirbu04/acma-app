import {
  STORE_RESERVATIONS,
  ADD_RESERVATION,
  CANCEL_RESERVATION,
  RESERVATION_CANCELLED,
  CLEAR_RESERVATIONS
} from '../actions/types';

const INITIAL_STATE = {
  reservations: [],
  cancelled: false
};

const defaultReservation = {
  id: 'id',
  userId: 'userId',
  firstName: 'John',
  lastName: 'Doe',
  email: 'email@domain.com',
  hotel: 'Hotel',
  hotelImage: 'url',
  street: {
    streetName: 'Street',
    streetNumber: 0,
    postalCode: 'Postal code'
  },
  city: 'City',
  country: 'Country',
  room: 'Room',
  price: 0,
  nightsBooked: 0,
  persons: 0,
  roomsBooked: 0,
  checkIn: {
    dayOfWeek: 'Monday',
    dayOfMonth: 1,
    month: 'Jan',
    year: 2017
  },
  checkOut: {
    dayOfWeek: 'Tuesday',
    dayOfMonth: 2,
    month: 'Jan',
    year: 2017
  },
  cancelled: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_RESERVATIONS:
      return { ...state, reservations: action.payload };
    case ADD_RESERVATION:
      const reservation = Object.assign({}, defaultReservation, action.payload);
      return Object.assign({}, state, {
        reservations: [...state.reservations, reservation]
      });
    case CANCEL_RESERVATION:
      return {
        ...state,
        reservations: [
          ...state.reservations.slice(0, action.payload),
          ...state.reservations.slice(action.payload + 1)
        ]
      };
    case RESERVATION_CANCELLED:
      return { ...state, cancelled: action.payload };
    case CLEAR_RESERVATIONS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
