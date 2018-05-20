import { combineReducers } from 'redux';

import UserReducer from './UserReducer';
import TokenReducer from './TokenReducer';
import HotelsReducer from './HotelsReducer';
import ErrorsReducer from './ErrorsReducer';

export default combineReducers({
  user: UserReducer,
  token: TokenReducer,
  hotelsArray: HotelsReducer,
  errors: ErrorsReducer
});
