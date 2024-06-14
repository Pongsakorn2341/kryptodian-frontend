"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ITransaction } from "@/types/transaction";
import { useMemo } from "react";
type PortfolioStatProps = {
  transactions: ITransaction[];
  totalCoin: number;
};
const PortfolioStat = ({ transactions, totalCoin = 0 }: PortfolioStatProps) => {
  const totalBalance = useMemo(() => {
    return transactions.reduce((acc, curr) => {
      const total = curr.amount * curr.price;
      if (curr.action == "BUY") {
        return acc + total;
      } else {
        return acc - total;
      }
    }, 0);
  }, [transactions]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full my-4">
      <Card className="w-full bg-primary_dark border-white/10 p-4">
        <CardContent className="p-0">
          <p className="text-white text-2xl font-bold">
            ${totalBalance.toLocaleString("en")}
          </p>
          <p className="text-zinc-400">Current Balance</p>
        </CardContent>
      </Card>
      <Card className="w-full  bg-primary_dark border-white/10 p-4">
        <CardContent className="p-0">
          <p className="text-white text-2xl font-bold">{totalCoin}</p>
          <p className="text-zinc-400">Total Coin</p>
        </CardContent>
      </Card>
      {/* <Card className="w-full bg-primary_dark border-white/10 p-4">
        <CardContent className="p-0">
          <p className="text-white font-bold">$123</p>
          <p className="text-zinc-400">Current Balance</p>
        </CardContent>
      </Card>
      <Card className="w-full  bg-primary_dark border-white/10 p-4">
        <CardContent className="p-0">
          <p className="text-white font-bold">$123</p>
          <p className="text-zinc-400">Current Balance</p>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default PortfolioStat;
