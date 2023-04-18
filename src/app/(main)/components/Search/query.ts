import { gql } from "@apollo/client";

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
  searchUsersByName: { id: string; name: string, image?: string }[];
};