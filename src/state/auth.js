import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    balance: 0,
    custom_feedback: 0,
    email: "",
    id: "",
    isTrial: false,
    modals: {
      freecredits: 0,
      onboarding: 0,
    },
    notifications: {
      order: true,
      refill: true,
      system: true,
    },
    preferences: {
      gender: "male",
      interests: [],
      species: "human",
    },
    subscribed: false,
    transacted: false,
    authenticated: false,
  },
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload);
      // const { email, id, authenticated, balance} = action.payload;
      return {
        ...state,
        user: action.payload,
      };
    },
    updateUserData: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        user: { ...action.payload, authenticated: state.user.authenticated },
      };
    },
    logout: (state, action) => {
      return {
        ...state,
        user: initialState,
      };
    },
    deductCredits: (state, action) => {
      return {
        ...state,
        user: { ...state.user, balance: action.payload },
      };
    },
  },
});

export const { setCredentials, logout, deductCredits, updateUserData } =
  authSlice.actions;
export const currentUser = (state) => state.auth.email;
export const authenticated = (state) => state.auth.authenticated;

export default authSlice.reducer;
