import { gql } from "@apollo/client";
import { ApolloContextType } from "../server";

const typeDefs = gql`
	type User {
		id: String,
		name: String,
		image: String
	}

	type Query {
		userExist(email: String): Boolean,
		searchUsersByName(query: String): [User]
	}
`;

const resolvers = {
  Query: {
    userExist: async (_, { email }, { prisma }: ApolloContextType) => {
      const user = await prisma.user.findUnique({ where: { email } });
      return !!user;
    },
    searchUsersByName: async (_, { query }, { prisma }: ApolloContextType) => {
      const users = await prisma.user.findMany({
        where: { name: { contains: query, mode: "insensitive" } },
        select: { name: true, id: true, image: true },
      });
      return users;
    },
  },
};

export default { typeDefs, resolvers };
