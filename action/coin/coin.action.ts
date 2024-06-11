"use server";

import { getAccessToken } from "../session/handle-fetch";

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
  const accessToken = await getAccessToken();
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/token`, {
    headers: headers,
    method: "POST",
    body: JSON.stringify({
      network_id: network,
      address,
      portfolio_id: portfolioId,
    }),
  });
  const result = await response.json();
  return result;
};
