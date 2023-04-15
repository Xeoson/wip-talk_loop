import { ApolloContextType } from "../server";

const typeDefs = `#graphql

	type Query {
		userExist(email: String): Boolean
	}
`;

const resolvers = {
  Query: {
    userExist: async (_, { email }, { prisma }: ApolloContextType) => {
      const user = await prisma.user.findUnique({ where: { email } });
      return !!user;
    },
  },
};

export default { typeDefs, resolvers };
