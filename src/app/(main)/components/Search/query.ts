import { gql } from "@apollo/client";
import { Prisma } from "@prisma/client";

type UserType = Pick<Prisma.UserGetPayload<null>, "id" | "name" | "image"> & {name: string}

export const SEARCH_USERS = gql`
  query ($query: String!) {
    searchUsersByName(query: $query) {
      id
      name
			image
    }
  }
`;
export type SearchUsersResponse = {
  searchUsersByName: UserType[];
};


export const CREATE_CHAT = gql`
  mutation Mutation($users: [String]!) {
    createConversation(users: $users) {
      conversationId
    }
  }
`;
export type CreateChatResponse = {
	createConversation: {
		conversationId: string
	}
}