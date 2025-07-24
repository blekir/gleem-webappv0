import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  species: "human",
  gender: "male",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setSpecies: (state, action) => {
      return {
        ...state,
        species: action.payload,
      };
    },
    setGender: (state, action) => {
      return {
        ...state,
        gender: action.payload,
      };
    },
  },
});

export const { setMode, setGender, setSpecies } = globalSlice.actions;

export default globalSlice.reducer;
