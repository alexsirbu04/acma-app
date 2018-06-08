import { combineReducers } from 'redux';

import UserReducer from './UserReducer';
import SocialReducer from './SocialReducer';
import HotelsReducer from './HotelsReducer';
import ErrorsReducer from './ErrorsReducer';
import ReservationReducer from './ReservationReducer';
import StatisticsReducer from './StatisticsReducer';

export default combineReducers({
  user: UserReducer,
  social: SocialReducer,
  hotelsArray: HotelsReducer,
  errors: ErrorsReducer,
  reservations: ReservationReducer,
  statistics: StatisticsReducer
});
