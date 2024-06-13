"use server";

import { handleError, removeUndefinedValues } from "@/lib/helper";
import { ITransaction, ITransactionAction } from "@/types/transaction";
import { getAccessToken } from "../session/handle-fetch";

type IGetTransactionAction = {
  portfolioId?: string;
  coinId?: string;
};

export const getTransactions = async ({
  portfolioId,
  coinId,
}: IGetTransactionAction): Promise<ITransaction[]> => {
  const accessToken = await getAccessToken();
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);
  const params = new URLSearchParams(
    removeUndefinedValues({
      portfolio_id: portfolioId,
      coin_id: coinId,
    })
  );
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction?${params}`,
    {
      headers: headers,
    }
  );
  const result = await response.json();
  if (!response.ok) {
    const _err = handleError(result, false);
    console.log("🚀 ~ _err:", _err);
    throw new Error(_err.message);
  }
  return result as ITransaction[];
};

type IAddTransaction = {
  portfolio_id: string;
  action_date: Date;
  coin_id: string;
  action: ITransactionAction;
  price: number;
  amount: number;
};

export const addTransaction = async (
  payload: IAddTransaction
): Promise<ITransaction> => {
  const accessToken = await getAccessToken();
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction`,
    {
      headers: headers,
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
  const result = await response.json();
  if (!response.ok) {
    const _err = handleError(result, false);
    throw new Error(_err.message);
  }
  return result as ITransaction;
};
