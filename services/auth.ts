import api from "@/services/api";
import { User } from "@/types/api.types";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*******",
        },
      },
      async authorize(credentials) {
        try {
          if (credentials) {
            const response = await api.login({
              username: credentials.username,
              password: credentials.password,
            });
            const user = response.data;

            if (user) {
              return { id: user.id, name: user.name, email: user.email };
            } else {
              return null;
            }
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as User).accessToken;
        token.refreshToken = (user as User).refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (
        token &&
        session &&
        "accessToken" in session &&
        "refreshToken" in session
      ) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: Boolean(process.env.NEXTAUTH_DEBUG) || false,
};
