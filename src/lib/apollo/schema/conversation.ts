import { gql } from "@apollo/client";
import { ApolloContextType } from "../server";

const typeDefs = gql`
  type Conversation {
    id: String
  }
  type CreateConversationResp {
    conversationId: String
  }

  type Query {
    getConversations: [Conversation]
  }
  type Mutation {
    createConversation(users: [String]!): CreateConversationResp
  }
`;

const resolvers = {
  Query: {
    getConversations: async (
      _,
      args,
      { prisma, session }: ApolloContextType
    ) => {
      try {
        const conversations = await prisma.conversationParticipant.findMany({
          where: { userId: session?.user.id },
        });
        return conversations.map((el) => ({ id: el.id }));
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    createConversation: async (
      _,
      { users }: { users: string[] },
      { prisma, session }: ApolloContextType
    ) => {
      console.log("createConversation");
      try {
        if (!users.length) throw new Error("User list must not be empty");
        if (!session || !session.user?.email) throw new Error("Not authorize");

        const ownerId = session.user.id;
        const usersWithOwner = [...users, ownerId];
				
        const conversation = await prisma.conversation.create({
          data: {
            participants: {
              createMany: {
                data: usersWithOwner.map((userId) => ({ userId: userId })),
              },
            },
            ownerId,
          },
        });
        return { conversationId: conversation.id };
      } catch (err: any) {
        console.log(err.message);
      }
    },
  },
};

export default { typeDefs, resolvers };
