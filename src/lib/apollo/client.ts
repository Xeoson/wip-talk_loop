import { BASE_URL } from "@/common/const";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
  uri: BASE_URL + "/api/graphql",
  cache: new InMemoryCache(),
});
