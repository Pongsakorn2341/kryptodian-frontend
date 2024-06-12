import { signIn } from "@/action/auth.action";
import { DefaultSession, NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { handleError } from "../helper";
import { ILoginProps } from "./../../action/auth.action";

declare module "next-auth" {
  interface Session {
    access_token: string;
    expires_at: string;
    user: User & DefaultSession["user"];
  }
  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    created_at: string;
    instance_id: string;
    instance_url: string;
    role: string;

    access_token: string;
    expires_at: string;
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
        is_remember_me: {
          label: "Is remember me",
          type: "boolean",
          placeholder: "false",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          throw new Error(`Require email & password.`);
        }
        try {
          const payload = {
            email: credentials.email,
            password: credentials.password,
            is_remember_me: !!credentials.is_remember_me,
          } as ILoginProps;
          const result: Session = await signIn(payload);
          console.log("🚀 ~ authorize ~ result:", result);
          if (!result?.access_token) {
            throw new Error(`Invalid Credential`);
          }
          return {
            ...result.user,
            access_token: result.access_token,
            expires_at: result.expires_at,
          };
        } catch (e) {
          const _err = handleError(e, false);
          throw new Error(_err.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  debug: true,
  events: {
    signOut: () => {},
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Perform additional actions on sign-in if needed
      return true;
    },
    async redirect(redirectData) {
      return redirectData.url;
    },
    async session({ session, user, token, trigger }) {
      if (token.user) {
        session.user = token?.user as User & DefaultSession["user"];
      }
      if ((token.user as User).expires_at) {
        session.expires_at = (token?.user as User)?.expires_at as string;
      }
      if ((token.user as User).access_token) {
        session.access_token = (token?.user as User)?.access_token as string;
      }
      if (trigger === "update" && token?.user) {
        (session.user as any).image = (token?.user as any)?.image as User &
          DefaultSession["user"];
      }
      return session;
    },
    async jwt({ token, user, account, profile, trigger }) {
      if (user) {
        token.user = user;
      }
      if (trigger === "update" && user) {
        token.user = user;
      }
      return token;
    },
  },
};
