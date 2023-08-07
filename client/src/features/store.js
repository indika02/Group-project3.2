// store.js
import { createStore, combineReducers } from 'redux';
import authReducer from '../features/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers if needed
});

const store = createStore(rootReducer);

export default store;
