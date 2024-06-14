"use server";

import { authOptions } from "@/lib/next-auth/next-auth-option";
import { getServerSession } from "next-auth";

export const getAccessToken = async (): Promise<string | undefined> => {
  const session = await getServerSession(authOptions);
  return session?.access_token;
};
