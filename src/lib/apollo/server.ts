import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "../prisma";
import conversation from "./schema/conversation";
import user from "./schema/user";

const typeDefs = [user.typeDefs, conversation.typeDefs];
const resolvers = [user.resolvers, conversation.resolvers];

export const createApolloContext = async (req, res) => {
  let session: Session | null = null;
  try {
    session = await getServerSession(req, res, authOptions);
  } catch (error) {
    console.error(error);
  }
  return { prisma, session };
};
export type ApolloContextType = Awaited<ReturnType<typeof createApolloContext>>;

export const schema = makeExecutableSchema({ typeDefs, resolvers });

export const server = new ApolloServer<ApolloContextType>({
  schema,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ includeCookies: true }),
  ],
});
