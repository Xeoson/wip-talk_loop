import { ApolloServer } from "@apollo/server";
import merge from "lodash.merge";
import { prisma } from "../prisma";
import user from "./schema/user";

const typeDefs = [user.typeDefs];
const resolvers = [user.resolvers];

export const createApolloContext = async ({ req, res }: any) => {
  return { prisma };
};
export type ApolloContextType = Awaited<ReturnType<typeof createApolloContext>>;

export const server = new ApolloServer<ApolloContextType>({
  typeDefs,
  resolvers: merge({}, ...resolvers),
});
