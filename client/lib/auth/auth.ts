import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/auth/login'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = (user as any).accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            console.log("SESSION => ", session)
            console.log("TOKEN => ", token)
            session.accessToken = token.token
            //session.user.id = token.userId as string;
            //session.user.email = token.email as string;
            //session.user.name = token.name;
            //session.accessToken = token.accessToken as string;
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
                return user
            },
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
        }),

    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 Days
    },

}
