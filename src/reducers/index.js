import { combineReducers } from 'redux';

import UserReducer from './UserReducer';
import SocialReducer from './SocialReducer';
import HotelsReducer from './HotelsReducer';

export default combineReducers({
  user: UserReducer,
  social: SocialReducer,
  hotelsArray: HotelsReducer
});
