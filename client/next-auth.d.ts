import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";
import { JWT } from "next-auth/jwt";


declare module "next-auth" {
    interface Session extends DefaultSession {
        accessToken: string;
        user: {
            id: string;
            email: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        userId: string;
        token: string;
    }
}