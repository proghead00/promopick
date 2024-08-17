import { LOGIN_URL } from "@/lib/apiEndpoints";
import axios from "axios";
import { AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export type CustomSession = {
  user?: CustomUser;
  expires: ISODateString;
};

export type CustomUser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  token?: string | null;
};

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const { data } = await axios.post(LOGIN_URL, credentials);
        const user = data?.data;

        if (user) return user;
        else return null;
      },
    }),
  ],
  callbacks: {
    async session({
      session,
      token,
      user,
    }: {
      session: CustomSession;
      token: JWT;
      user: CustomUser;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },

    async jwt({ token, user }: { token: JWT; user: CustomUser | null }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};
