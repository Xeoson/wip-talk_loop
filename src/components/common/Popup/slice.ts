import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  message?: string;
}

const initialState: IInitialState = {};

export const { actions: popupActions, reducer: popupReducer } = createSlice({
  name: "popupSlice",
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<string | undefined>) {
      return { ...state, message: action.payload };
    },
  },
});
