import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from 'next-auth';

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    pages: {
        signIn: '/auth/login'
    },
    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                token.accessToken = (user as any).accessToken;
                token.role = (user as any).role;
                token.id = (user as any).id;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            session.user.role = token.role as string;
            session.user.email = token.email as string;
            session.user.name = token.name as string;
            session.user.id = token.id;
            return session;
        },
        async signIn({ user, account, profile, email, credentials }) {
            if (account?.provider == 'credentials') {
                return true
            }
            return false
        },
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials: any) {
                const authResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + "/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentials),
                })
                if (!authResponse.ok) {
                    return null
                }

                const user = await authResponse.json()
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    accessToken: user.token,
                };
            },
        }),

    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 Days
    },
    trustHost: true,
})
