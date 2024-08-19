import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";
import { JWT } from "next-auth/jwt";


declare module "next-auth" {
    interface Session extends DefaultSession {
        accessToken: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
            accessToken: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        token: string;
        role: string;
    }
}