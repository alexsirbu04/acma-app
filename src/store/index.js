import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage
};
const persistedReducers = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducers, {}, compose(applyMiddleware(thunk)));
export const persistor = persistStore(store);
