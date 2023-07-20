import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ErrorShape {
  date?: string;
  message: string;
  rawData: string;
}
export interface ErrorState {
  showError: boolean;
  errorMessages: ErrorShape[];
}

const initialState: ErrorState = {
  showError: false,
  errorMessages: [],
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ErrorShape>) => {
      const d = new Date();
      action.payload.date = d.toLocaleString();

      state.showError = true;
      state.errorMessages.push(action.payload);
    },

    removeError: (state, action: PayloadAction<number>) => {

        //Filter out the error message at the index
        state.errorMessages = state.errorMessages.filter((_, index) => index !== action.payload);

      if (state.errorMessages.length === 0) {
        state.showError = false;
      }
    },

    clearAllErrors: (state) => {
        state.errorMessages = [];
        state.showError = false;
        }

  },
});

// Action creators are generated for each case reducer function
export const { setError, removeError, clearAllErrors } = errorSlice.actions;

export default errorSlice.reducer;
