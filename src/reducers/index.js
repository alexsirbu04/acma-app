import { combineReducers } from 'redux';

import UserReducer from './UserReducer';
import HotelsReducer from './HotelsReducer';

export default combineReducers({
  user: UserReducer,
  hotelsReducer: HotelsReducer
});
