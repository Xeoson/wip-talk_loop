import { chatsReducer } from "@/app/(main)/components/Chats/slice";
import { searchReducer } from "@/app/(main)/components/Search/slice";
import { ArrayKeys } from "@/common/types";
import { popupReducer } from "@/components/common/Popup/slice";
import { PayloadAction, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: { popupReducer, searchReducer, chatsReducer },
});

export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
