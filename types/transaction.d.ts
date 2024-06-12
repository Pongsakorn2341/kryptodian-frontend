export type ITransactionAction = "BUY" | "SELL";

export type ITransaction = {
  id: string;
  coin_id: string;
  portfolio_id: string;

  amount: number;
  currency_id: string;
  price: number;
  total: number;

  action_at: string;
  action: ITransactionAction;

  created_by: string;
  created_at: string;
  updated_at: string;
};
