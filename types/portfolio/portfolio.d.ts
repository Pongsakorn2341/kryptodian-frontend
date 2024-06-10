import { ICoin } from "../coins/coin";

export type IPortfolio = {
  id: string;
  name: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  Coins?: ICoin[];
};
