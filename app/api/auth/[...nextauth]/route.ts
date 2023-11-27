import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { AuthOptions, DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "Credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        await dbConnect();

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          return null;
        }

        const valid = await bcrypt.compare(credentials.password, user.password);

        if (!valid) {
          return null;
        }
        return { id: user._id, email: user.email, name: user.name };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await User.findOne({ email: token.email });
      return { id: dbUser._id, name: dbUser.name, email: dbUser.email };
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  // pages: {
  //   signIn: "/auth/login",
  // },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies AuthOptions;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
