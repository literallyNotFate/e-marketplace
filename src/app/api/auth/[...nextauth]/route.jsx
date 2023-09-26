import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "../../../../../lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from 'bcrypt'

export const authOptions = {
    adapter: PrismaAdapter(client),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'Email', type: 'text', placeholder: 'john@example.com'},
                password: {label: 'Password', type: 'password'},
                username: {label: 'Username', type: 'text', placeholder:'John Doe'},
            },
            async authorize(credentials) {
                const user = await client.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if(!user || !user?.password) {
                    throw new Error('Login failed')
                }

                const match = await bcrypt.compare(credentials.password, user.password)
                if(!match) {
                    throw new Error('Incorrect password')
                }

                return user
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token
                token.id = user?.id
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id;
            return session;
        },
    },
    session: {
        strategy: 'jwt'
    },
    debug: process.env.NODE_ENV === 'development'
}


const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}