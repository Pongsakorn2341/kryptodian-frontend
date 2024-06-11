"use server";

import { handleError } from "@/lib/helper";
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

export const deletePortfolio = async (id: string) => {
  const session = await getServerSession(authOptions);
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${session?.access_token}`);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/portfolio/${id}`,
    {
      headers: headers,
      method: "DELETE",
    }
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result?.cause ?? `Something went wrong`);
  }
  return result;
};

type AddCoinProps = {
  network: string;
  address: string;
  portfolioId: string;
};

export const addCoin = async ({
  network,
  address,
  portfolioId,
}: AddCoinProps) => {
  try {
    const session = await getServerSession(authOptions);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${session?.access_token}`);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/token`,
      {
        headers: headers,
        method: "POST",
        body: JSON.stringify({
          network_id: network,
          address,
          portfolio_id: portfolioId,
        }),
      }
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.cause ?? `Something went wrong`);
    }
    return result;
  } catch (e) {
    handleError(e, true);
  }
};
