import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SuccessShape {
  date?: string;
  message: string;
  rawData: string;
  showSuccess?: boolean;
}

const initialState: SuccessShape = {
  date: "",
  message: "",
  rawData: "",
  showSuccess: true,
};

export const successSlice = createSlice({
  name: "success",
  initialState,
  reducers: {
    setSuccess: (state, action: PayloadAction<SuccessShape>) => {
      const d = new Date();
      action.payload.date = d.toLocaleString();
      action.payload.showSuccess = true;
      state.message = action.payload.message;
      state.rawData = action.payload.rawData;      
    },
    hideSuccess: (state) => {
      state.showSuccess = false;
    }

  },
});

// Action creators are generated for each case reducer function
export const { setSuccess, hideSuccess } = successSlice.actions;

export default successSlice.reducer;
