"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import usePortfolio from "@/hooks/usePortfolio.hook";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCog, FaEllipsisV, FaPlus, FaShareAlt } from "react-icons/fa";

const CoinTable = () => {
  const params = useParams<{ portId: string }>();
  const portData = usePortfolio({ portId: params.portId });
  if (!portData) {
    notFound();
  }

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-primary_dark rounded-md">
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="text-lg font-semibold text-white">⭐ TEST</h2>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="ghost" className="rounded-full text-white">
            <FaPlus className="text-white" />
            <span className="ml-2">Add coin</span>
          </Button>
          <Button size="sm" variant="ghost" className="rounded-full text-white">
            <FaCog className="text-white" />
            <span className="ml-2">Customise</span>
          </Button>
          <Button size="sm" variant="ghost" className="rounded-full text-white">
            <FaShareAlt className="text-white" />
            <span className="ml-2">Share</span>
          </Button>
          <Button size="sm" variant="ghost" className="rounded-full text-white">
            <FaEllipsisV className="text-white" />
          </Button>
        </div>
      </div>
      <Table className="text-white">
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-gray-400">#</TableHead>
            <TableHead className="text-gray-400">Coin</TableHead>
            <TableHead className="text-right text-gray-400">Price</TableHead>
            <TableHead className="text-right text-gray-400">1h</TableHead>
            <TableHead className="text-right text-gray-400">24h</TableHead>
            <TableHead className="text-right text-gray-400">7d</TableHead>
            <TableHead className="text-right text-gray-400">
              Market Cap
            </TableHead>
            <TableHead className="text-right text-gray-400">
              Last 7 Days
            </TableHead>
            <TableHead className="w-12 text-gray-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">453</TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <img
                  src="https://assets.coingecko.com/coins/images/17793/small/Icon.png"
                  alt="Coin Logo"
                  className="w-6 h-6"
                />
                <span>MAGA Hat MAGA</span>
              </div>
            </TableCell>
            <TableCell className="text-right font-medium">$0.0002616</TableCell>
            <TableCell className="text-right text-red-500">
              &#8595; 0.6%
            </TableCell>
            <TableCell className="text-right text-green-500">
              &#8593; 14.8%
            </TableCell>
            <TableCell className="text-right text-red-500">
              &#8595; 33.7%
            </TableCell>
            <TableCell className="text-right">$107,542,103</TableCell>
            <TableCell className="text-right">
              <img
                src="https://example.com/chart.png"
                alt="Chart"
                className="w-32 h-16"
              />
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
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-4 py-2 text-white">
        <TableCaption>Showing 1 to 1 of 1 results</TableCaption>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="ghost" className="rounded-md text-white">
            &lt;
          </Button>
          <Button size="sm" className="rounded-md text-white bg-green-500">
            1
          </Button>
          <Button size="sm" variant="ghost" className="rounded-md text-white">
            &gt;
          </Button>
          <span className="ml-2">Rows</span>
          <select className="bg-black text-white rounded-md">
            <option value="100">100</option>
            <option value="50">50</option>
            <option value="25">25</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CoinTable;
