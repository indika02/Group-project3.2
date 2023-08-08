// actions.js
export const loginUser = (user) => ({
    type: 'LOGIN_USER',
    payload: user,
  });
  
  export const logoutUser = () => ({
    type: 'LOGOUT_USER',
  });
  
  // In your actions.js or actions folder
export const SET_USER_PROFILE_DATA = 'SET_USER_PROFILE_DATA';

export const setUserProfileData = (data) => {
  return {
    type: SET_USER_PROFILE_DATA,
    payload: data,
  };
};
