import { BASE_URL } from "@/common/const";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { WebSocket } from "ws";

// const httpLink = new HttpLink({
//   uri: '/api/graphql',
// });

// const wsLink = new GraphQLWsLink(
//   createClient({
//     url: '/api/graphql/sub',
// 		webSocketImpl: WebSocket
//   })
// );



export default new ApolloClient({
  uri: BASE_URL + "/api/graphql",
	// link: splitLink,
  cache: new InMemoryCache(),
});
