import type { DefaultSession } from "next-auth";
import type { User as PrismaUser } from "@prisma/client";

declare module "tailwindcss-animate";

declare module "next-auth" {
  interface User extends PrismaUser {}
  interface Profile {
    global_name: string;
    username: string;
  }

  interface Session extends DefaultSession {
    user: PrismaUser;
  }
}
