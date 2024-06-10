"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import usePortfolio from "@/hooks/usePortfolio.hook";
import { IPortfolio } from "@/types/portfolio/portfolio";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import Portfolio from "./Portfolio";

const CoinTable = () => {
  const params = useParams<{ portId: string }>();
  const { data: portData, isLoading } = usePortfolio<IPortfolio>({
    portId: params.portId,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-primary_dark rounded-md">
      <Portfolio />
      <Table className="text-white">
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-gray-400">#</TableHead>
            <TableHead className="text-gray-400">Coin</TableHead>
            <TableHead className="text-right text-gray-400">Price</TableHead>
            <TableHead className="text-right text-gray-400">24h</TableHead>
            <TableHead className="text-right text-gray-400">
              Market Cap
            </TableHead>
            <TableHead className="w-12 text-gray-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(portData?.Coins ?? []).map((coinData, idx) => {
            const coinId = coinData?.coinData?.attributes?.coingecko_coin_id;
            const priceChange = coinData?.priceChange?.[coinId];
            const totalChange = priceChange?.btc_24h_change;
            return (
              <TableRow key={coinData.id}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <img src={coinData?.coinData?.attributes?.image_url} />
                    <span>{coinData.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {priceChange.btc.toFixed(20).replace(/\.?0+$/, "")} BTC
                </TableCell>
                {totalChange >= 0 ? (
                  <TableCell className="text-right text-green-500">
                    &#8593; {totalChange.toFixed(2)}
                  </TableCell>
                ) : (
                  <TableCell className="text-right text-red-500">
                    &#8595; {totalChange.toFixed(2)}
                  </TableCell>
                )}

                <TableCell className="text-right">
                  $
                  {parseFloat(
                    coinData?.coinData?.attributes?.market_cap_usd
                  ).toLocaleString("en")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="rounded-full text-white"
                    >
                      <FaPlus className="text-white" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="rounded-full text-white"
                    >
                      <FaEllipsisV className="text-white" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CoinTable;
