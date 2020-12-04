import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'

import counterReducer from '../features/counter/counterSlice';
import accountsReducer from '../features/accounts/accountsSlice';

import mySaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const store = configureStore({
    reducer: {
      counter: counterReducer,
      accounts: accountsReducer,
    },
    middleware: [...getDefaultMiddleware({thunk: false}), sagaMiddleware]
  });
  sagaMiddleware.run(mySaga);
  return store;
} 