import { Prisma } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


type ChatType = Pick<Prisma.ConversationGetPayload<null>, "id">;

interface IInitialState {
  chats: ChatType[];
}

const initialState: IInitialState = {
  chats: [],
};


export const { actions: chatsActions, reducer: chatsReducer } = createSlice({
  name: "chatsSlice",
  initialState,
  reducers: {
		pushChat(state, {payload}: PayloadAction<ChatType>) {
			state.chats = [payload, ...state.chats]
		},
		delChat(state, {payload}: PayloadAction<string>) {
			state.chats = state.chats.filter((el) => el.id !== payload)
		}
	}
});
