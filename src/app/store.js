import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'

import counterReducer from '../features/counter/counterSlice';
import accountReducer from '../features/accounts/accountSlice';
import tagsReducer from '../features/accounts/tagSlice';
import profilesReducer from '../features/accounts/profileSlice';

import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const store = configureStore({
    reducer: {
      counter: counterReducer,
      account: accountReducer,
      tags: tagsReducer,
      profiles: profilesReducer,
    },
    middleware: [...getDefaultMiddleware({thunk: false}), sagaMiddleware]
  });
  sagaMiddleware.run(rootSaga);
  return store;
} 