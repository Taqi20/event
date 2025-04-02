import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from "@/lib/prisma";


export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;
                token.user = user;
            }

            console.log("🔹 JWT Token:", token);
            return token;
        },

        async session({ session, token }) {
            session.accessToken = token.accessToken as string | undefined;
            session.user = token.user && typeof (token.user as any).email === "string"
                ? { email: (token.user as any).email }
                : { email: "" };

            return session;
        },
    },
});