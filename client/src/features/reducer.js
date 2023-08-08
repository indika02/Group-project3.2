import { combineReducers } from 'redux';
import { SET_USER_PROFILE_DATA } from './actions';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  userProfiledata: JSON.parse(localStorage.getItem('userProfiledata')) || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return { ...state, user: action.payload };

    case 'LOGOUT_USER':
      return { ...state, user: null };
    default:
      return state;
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE_DATA:
      return {
        ...state,
        userProfiledata: action.payload,
      };
    // other cases
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  userProfile: userReducer,
  // other reducers
});

export default rootReducer;
