import { authOptions } from "@/lib/next-auth/next-auth-option";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
