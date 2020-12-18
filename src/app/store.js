import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'

import counterReducer from '../features/counter/counterSlice';
import accountReducer from '../features/accounts/accountSlice';
import tagsReducer from '../features/accounts/tagSlice';

import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const store = configureStore({
    reducer: {
      counter: counterReducer,
      account: accountReducer,
      tags: tagsReducer,
    },
    middleware: [...getDefaultMiddleware({thunk: false}), sagaMiddleware]
  });
  sagaMiddleware.run(rootSaga);
  return store;
} 