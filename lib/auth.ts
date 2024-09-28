import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/app/db';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: { label: "Name", type: "text" },
                email: { label: "Email", type: "email" },
                phone: { label: "Phone", type: "tel" }
            },
            async authorize(credentials) {
                if (!credentials?.name || !credentials.phone) {
                    throw new Error('Name and phone are required');
                }

                try {
                    // Check if user already exists
                    let user = await prisma.user.findUnique({
                        where: { phone: credentials.phone }
                    });

                    if (!user) {
                        // Create new user if they don't exist
                        user = await prisma.user.create({
                            data: {
                                name: credentials.name,
                                phone: credentials.phone,
                                email: credentials.email || null,
                                // createdAt will be automatically set
                            },
                        });
                    } else {
                        // Optionally update existing user information
                        user = await prisma.user.update({
                            where: { id: user.id },
                            data: {
                                name: credentials.name,
                                email: credentials.email || user.email,
                            },
                        });
                    }

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        createdAt: user.createdAt
                    };
                } catch (error) {
                    console.error('Error in authorize function:', error);
                    throw new Error('Authentication failed');
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.phone = user.phone;
                token.createdAt = user.createdAt;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.phone = token.phone as string;
                session.user.createdAt = token.createdAt as Date;
            }
            return session;
        }
    },
    pages: {
        signIn: '/',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };