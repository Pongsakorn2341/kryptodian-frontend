"use server";

import { authOptions } from "@/lib/next-auth/next-auth-option";
import { IPortfolio } from "@/types/portfolio/portfolio";
import { getServerSession } from "next-auth";
import { getAccessToken } from "../session/handle-fetch";
import { checkAuthorized } from "../auth.action";

export const getPortfolios = async (): Promise<IPortfolio[] | undefined> => {
  const accessToken = await getAccessToken();
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);
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

export const addPortfolio = async (name: string) => {
  const accessToken = await getAccessToken();
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/portfolio`,
    {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        name: name,
      }),
    }
  );
  const result = await response.json();
  return result;
};
