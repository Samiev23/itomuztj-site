import { cache } from "react";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const { handlers, auth: authUncached, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.subscriptionActive = user.subscriptionActive ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const id = typeof token.id === "string" ? token.id : "";
        session.user.id = id;
        session.user.subscriptionActive = Boolean(token.subscriptionActive);
      }
      return session;
    },
  },
});

/** Deduplicate session work when `auth()` runs from layout + routes in one request. */
export const auth = cache(authUncached);

export { handlers, signIn, signOut };
