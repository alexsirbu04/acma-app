import { combineReducers } from 'redux';

import UserReducer from './UserReducer';
import SocialReducer from './SocialReducer';
import HotelsReducer from './HotelsReducer';
import ErrorsReducer from './ErrorsReducer';
import ReservationReducer from './ReservationReducer';

export default combineReducers({
  user: UserReducer,
  social: SocialReducer,
  hotelsArray: HotelsReducer,
  errors: ErrorsReducer,
  reservationsArray: ReservationReducer
});
