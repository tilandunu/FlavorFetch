// src/redux/user/userSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
export interface UserState {
  currentUser: any | null; // Replace 'any' with the actual type of the user, if available
  loading: boolean;
  error: boolean | string; // Assuming error can be a string or a boolean
}

// Define the initial state using the UserState type
const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<any>) => { // Replace 'any' with the actual type of the user
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
    },
  },
});

// Export actions and reducer
export const {
  signInFailure,
  signInStart,
  signInSuccess,
  signoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;

