import {
  STORE_RESERVATIONS,
  STORE_USER_RESERVATIONS,
  ADD_RESERVATION,
  UPDATE_RESERVATION_STATUS,
  DELETE_RESERVATION,
  CLEAR_RESERVATIONS
} from '../actions/types';

const INITIAL_STATE = {
  arrivals: [],
  departures: [],
  staying: [],
  userReservations: []
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
      return {
        ...state,
        arrivals: action.payload.arrivals,
        departures: action.payload.departures,
        staying: action.payload.staying
      };
    case STORE_USER_RESERVATIONS:
      return {
        ...state,
        userReservations: action.payload
      };
    case ADD_RESERVATION:
      const newReservation = Object.assign({}, defaultReservation, action.payload);
      return Object.assign({}, state, {
        userReservations: [...state.userReservations, newReservation]
      });
    case UPDATE_RESERVATION_STATUS:
      const { category } = action.payload;
      return {
        ...state,
        [category]: state[category].map(reservation => {
          if (reservation.id === action.payload.id) {
            return Object.assign({}, reservation, { status: action.payload.status });
          }

          return reservation;
        })
      };
    case DELETE_RESERVATION:
      const { array } = action.payload;
      return {
        ...state,
        [array]: [
          ...state[array].slice(0, action.payload.index),
          ...state[array].slice(action.payload.index + 1)
        ]
      };
    case CLEAR_RESERVATIONS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
