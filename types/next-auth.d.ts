import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    subscriptionActive?: boolean;
  }

  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      subscriptionActive: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    subscriptionActive?: boolean;
  }
}
