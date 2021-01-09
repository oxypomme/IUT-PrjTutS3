import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'

import accountReducer, { loginAccount, logoutAccount } from '../features/accounts/accountSlice';
import tagsReducer from '../features/accounts/tagSlice';
import profilesReducer, {createProfile} from '../features/accounts/profileSlice';
import storageReducer from '../features/firestorage/storageSlice';
import matchesReducer from '../features/accounts/matches/matchesSlice';
import chatReducer from '../features/chat/chatSlice';

import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const store = configureStore({
    reducer: {
      account: accountReducer,
      tags: tagsReducer,
      profiles: profilesReducer,
      storage: storageReducer,
      matches: matchesReducer,
      chat: chatReducer,
    },
    middleware: [...getDefaultMiddleware({
      thunk: false,
      // Only the actions with callback should be ignored
      // for "not spamming the console pls" reasons
      serializableCheck: {
        ignoredAction: [
          loginAccount.type, 
          logoutAccount.type,
          createProfile.type,
        ],
      }
    }), sagaMiddleware]
  });
  sagaMiddleware.run(rootSaga);
  return store;
} 