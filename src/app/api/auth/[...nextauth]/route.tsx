import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialProvider({
      id: "signin",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ email, password }: any, req) {
        if (!email || !password) throw new Error("Invalid credentials");

        const existUser = await prisma.user.findUnique({ where: { email } });
        if (!existUser) {
          throw new Error("User not exist");
        } else if (!existUser.passwordHash) {
          throw new Error("Please, log in other way");
        } else {
          const isPasswordCorrect = await bcrypt.compare(
            password,
            existUser.passwordHash
          );
          if (!isPasswordCorrect) {
            throw new Error("Invalid password");
          }
          return existUser;
        }
      },
    }),
    CredentialProvider({
      id: "signup",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ email, password }: any, req) {
        if (!email || !password) throw new Error("Invalid credentials");
        const existUser = await prisma.user.findUnique({
          where: { email },
        });
        if (existUser && existUser.passwordHash) {
          throw new Error("User already exist");
        } else {
          const newUser = await prisma.user.create({
            data: {
              email,
              passwordHash: bcrypt.hashSync(password, 12),
            },
          });
          return newUser;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
