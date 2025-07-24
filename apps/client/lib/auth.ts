import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { DefaultSession, NextAuthOptions } from "next-auth";
import prisma from "@repo/db/client"

declare module "next-auth" {
  interface User {
    id?: string;
    phoneNumber?: string;
    isVerified?: boolean;
    balance?: number;
  }
  interface Session {
    user: DefaultSession["user"] & {
      id?: string;
      phoneNumber?: string;
      isVerified?: boolean;
      balance?: number;
    };
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    phoneNumber?: string;
    isVerified?: boolean;
    balance?: number;
  }
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phoneNumber: {
          label: "Phone",
          type: "text",
          placeholder: "+91-98765*****",
        },
      },
      async authorize(credentials) {
        const isUserExists = await prisma.user.findFirst({
          where: {
            phoneNumber: credentials?.phoneNumber,
          },
          include: {
            OTP: {
              select: {
                isVerified: true,
              },
            },
          },
        });
        // console.log("isUserExists...", isUserExists);
        
        // if user is not verified by twillio
        const isUserVerified = isUserExists?.OTP[0].isVerified;
        // console.log("isUserVerified", isUserVerified);
        
        if(isUserExists){
          return {
            id: isUserExists?.id,
            phoneNumber: isUserExists?.phoneNumber,
            balance: isUserExists?.balance,
            role: isUserExists.role,
            isVerified:isUserVerified
          };
        }

        const user = await prisma.user.create({
          data: {
            phoneNumber: credentials?.phoneNumber as string,
            role: "USER",
            balance: 0.0,
          },
        });
        await prisma.oTP.update({
          where: { otpID: credentials?.phoneNumber },
          data: {
            userId: user.id,
          },
        });
        if (user) {
          return {
            ...user,
            isVerified: true,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, credentials }) {
      // console.log("Singin....", user);
      
      if (!user.isVerified) {
        return false;
      }

      const isUserExists = await prisma.user.findUnique({
        where: {
          phoneNumber: credentials?.phoneNumber as string,
        },
      });
      if (isUserExists) {
        return true;
      }

      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        token.phoneNumber = user.phoneNumber;
        token.isVerified = user.isVerified;
        token.id = user.id;
        token.balance = user.balance;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.phoneNumber = token.phoneNumber;
        session.user.isVerified = token.isVerified;
        session.user.id = token.id;
        session.user.balance = token.balance;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
} satisfies NextAuthOptions;
