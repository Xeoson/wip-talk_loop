import { PrismaClient } from "@prisma/client";

declare namespace globalThis {
  var client: PrismaClient | null;
}

export const prisma = globalThis.client || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.client = prisma;
}
