import { createApolloContext, server } from "@/lib/apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

export default startServerAndCreateNextHandler(server, {
  context: createApolloContext,
});
