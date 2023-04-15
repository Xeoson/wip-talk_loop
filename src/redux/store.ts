import { popupReducer } from "@/components/common/Popup/slice";
import { configureStore } from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useSelector} from 'react-redux'

export const store = configureStore({ reducer: {popupReducer} });

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector