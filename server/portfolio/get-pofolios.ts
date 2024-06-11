"use server";

import { authOptions } from "@/lib/next-auth/next-auth-option";
import { IPortfolio } from "@/types/portfolio/portfolio";
import { getServerSession } from "next-auth";

export const getPortfolios = async (): Promise<IPortfolio[]> => {
  const session = await getServerSession(authOptions);
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${session?.access_token}`);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/portfolio`,
    {
      headers: headers,
    }
  );
  const result = await response.json();
  return result;
};

export const getPortfolioData = async (id: string): Promise<IPortfolio> => {
  const session = await getServerSession(authOptions);
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${session?.access_token}`);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/portfolio/${id}`,
    {
      headers: headers,
    }
  );
  const result = await response.json();
  return result;
};
