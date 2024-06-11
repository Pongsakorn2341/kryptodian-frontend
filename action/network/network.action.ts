"use server";

import { INetwork } from "@/types/network/network";
import { getAccessToken } from "../session/handle-fetch";

export const getNetworks = async () => {
  const accessToken = await getAccessToken();
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/token/network`,
    {
      headers: headers,
      method: "GET",
    }
  );
  const result: INetwork[] = await response.json();
  const res = result?.filter(
    (item) => item?.attributes?.coingecko_asset_platform_id
  );
  console.log(res);
  return res;
};
