import { popupReducer } from "@/components/common/Popup/slice";
import { configureStore } from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import { searchReducer } from "@/app/(main)/components/Search/slice";

export const store = configureStore({ reducer: {popupReducer, searchReducer} });

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector