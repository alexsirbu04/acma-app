import {
  STORE_RESERVATIONS,
  ADD_RESERVATION,
  UPDATE_RESERVATION_STATUS,
  CANCEL_RESERVATION,
  CLEAR_RESERVATIONS
} from '../actions/types';

const INITIAL_STATE = {
  reservations: []
};

const defaultReservation = {
  id: 'id',
  userId: 'userId',
  userImage: 'url',
  firstName: 'John',
  lastName: 'Doe',
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
  roomImage: 'url',
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
  status: 'upcoming'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_RESERVATIONS:
      return { ...state, reservations: action.payload };
    case ADD_RESERVATION:
      const newReservation = Object.assign({}, defaultReservation, action.payload);
      return Object.assign({}, state, {
        reservations: [...state.reservations, newReservation]
      });
    case UPDATE_RESERVATION_STATUS:
      return {
        ...state,
        reservations: state.reservations.map(reservation => {
          if (reservation.id === action.payload.id) {
            return Object.assign({}, reservation, { status: action.payload.status });
          }

          return reservation;
        })
      };
    case CANCEL_RESERVATION:
      return {
        ...state,
        reservations: [
          ...state.reservations.slice(0, action.payload),
          ...state.reservations.slice(action.payload + 1)
        ]
      };
    case CLEAR_RESERVATIONS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
