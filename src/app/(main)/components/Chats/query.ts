import { gql } from "@apollo/client";
import { type } from "os";


export const GET_CHATS = gql`
  query GetChats {
    getConversations {
      id
    }
  }
`;
export type GetConversationsResp = {
	getConversations: {id: string}[]
}