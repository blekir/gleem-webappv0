import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  isAdmin: false,
  user_id: null,
  authenticated: false,
};

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload);
      const { email, isAdmin, user_id, authenticated } = action.payload;
      return {
        ...state,
        email: email,
        isAdmin: isAdmin,
        user_id: user_id,
        authenticated: authenticated,
      };
    },
    logout: (state, action) => {
      return {
        ...state,
        email: null,
        isAdmin: false,
        user_id: null,
        authenticated: null,
      };
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const currentUser = (state) => state.auth.email;
export const isAdmin = (state) => state.auth.isAdmin;
export const authenticated = (state) => state.auth.authenticated;

export default authSlice.reducer;
