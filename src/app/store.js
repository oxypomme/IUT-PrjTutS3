import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'

import counterReducer from '../features/counter/counterSlice';

import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const store = configureStore({
    reducer: {
      counter: counterReducer,
    },
    middleware: [...getDefaultMiddleware({thunk: false}), sagaMiddleware]
  });
  sagaMiddleware.run(rootSaga);
  return store;
} 