import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import accountsReducer from '../features/accounts/accountsSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    accounts: accountsReducer,
  },
});
