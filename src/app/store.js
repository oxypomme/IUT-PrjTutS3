import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'

import accountReducer from '../features/accounts/accountSlice';
import tagsReducer from '../features/accounts/tagSlice';
import profilesReducer from '../features/accounts/profileSlice';
import storageReducer from '../features/firestorage/storageSlice';

import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const store = configureStore({
    reducer: {
      account: accountReducer,
      tags: tagsReducer,
      profiles: profilesReducer,
      storage: storageReducer,
    },
    middleware: [...getDefaultMiddleware({thunk: false}), sagaMiddleware]
  });
  sagaMiddleware.run(rootSaga);
  return store;
} 