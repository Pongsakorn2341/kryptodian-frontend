"use server";

import { getAccessToken } from "./session/handle-fetch";

type IRegisterAccount = {
  name: string;
  email: string;
  password: string;
};
export const registerAccount = async (payload: IRegisterAccount) => {
  const accessToken = getAccessToken();
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
    {
      headers: headers,
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
  const result = await response.json();
  return result;
};
