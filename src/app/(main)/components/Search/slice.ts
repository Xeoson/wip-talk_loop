import { ArrayKeys } from "@/common/types";
import { Payload } from "@prisma/client/runtime";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUser {
	id: string,
	name: string
}

interface IInitialState {
  selectedUsers: IUser[];
  isOpened: boolean;
  searchQuery: string;
}

const initialState: IInitialState = {
  selectedUsers: [],
	isOpened: false,
	searchQuery: ''
};


export const { actions: searchActions, reducer: searchReducer } = createSlice({
  name: "searchReducer",
  initialState,
  reducers: {
    setFields(state, action: PayloadAction<Partial<IInitialState>>) {
      return { ...state, ...action.payload };
    },
    addUser(state, action: PayloadAction<IUser>) {
      state.selectedUsers.push(action.payload);
    },
    delUser(state, action: PayloadAction<string>) {
      state.selectedUsers = state.selectedUsers.filter(
        (el) => el.id !== action.payload
      );
    },
  },
});
