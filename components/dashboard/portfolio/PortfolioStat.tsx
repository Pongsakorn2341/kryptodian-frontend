"use client";

import { Card, CardContent } from "@/components/ui/card";
const PortfolioStat = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full my-4">
      <Card className="w-full bg-primary_dark border-white/10 p-4">
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
      </Card>
      <Card className="w-full bg-primary_dark border-white/10 p-4">
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
      </Card>
    </div>
  );
};

export default PortfolioStat;
