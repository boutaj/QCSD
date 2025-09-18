import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { prisma } from "./lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: { 
        userId: { label: "User ID", type: "text" },
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "text" },
        role: { label: "Role", type: "text" }
      },
      authorize: async (creds) => {

        const id = creds?.userId as string;
        const username = creds?.username as string;
        const email = creds?.email as string;
        const role = creds?.role as string;

        return { id, username, email, role } as User;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.username = (user as any).username;
        token.email = (user as any).email ?? token.email;
        token.role = (user as any).role ?? token.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
          id: (token.id as string) ?? "",
          name: (token.username as string | undefined),
          email: (token.email as string | null) ?? null,
          role:  (token.role as string | null) ?? null,
      } as any;
      return session;
    },
  },
});
