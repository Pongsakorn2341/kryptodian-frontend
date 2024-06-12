"use client";

import { deletePortfolio } from "@/action/portfolio/portfolios";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { handleError } from "@/lib/helper";
import { useAddCoinModal } from "@/store/useAddCoinModal";
import { useAddTransactionModal } from "@/store/useAddTransactionModal";
import { INetwork } from "@/types/network/network";
import { IPortfolio } from "@/types/portfolio/portfolio";
import { ITransaction } from "@/types/transaction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import CoinOptionDropdown from "./CoinOptionDropdown";
import AddCoinDialog from "./dialog/AddCoinDialog";
import AddTransactionDialog from "./dialog/AddTransactionDialog";
import ConfirmationDialog from "./dialog/ConfirmationDialog";
import PortfolioStat from "./PortfolioStat";

type CoinTableProps = {
  portfolioData: IPortfolio;
  networks: INetwork[];
  transactions: ITransaction[];
};

const tableColumns = [
  {
    title: "#",
    className: "w-12 text-gray-400",
  },
  {
    title: "Coin",
    className: "text-gray-400 w-fit",
  },
  {
    title: "Price",
    className: "text-right text-gray-400 min-w-[60px] overflow-x-scroll",
  },
  {
    title: "24h",
    className: "text-right text-gray-400 w-fit",
  },
  {
    title: "Market Cap",
    className: "text-right text-gray-400",
  },
  {
    title: "Actions",
    className: "w-12 text-gray-400",
  },
];

const CoinTable = ({
  portfolioData: portData,
  networks,
  transactions,
}: CoinTableProps) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { onOpen } = useAddCoinModal();
  const { onOpen: onOpenAddTransaction } = useAddTransactionModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-primary_dark rounded-md">
      <div className="flex items-center justify-between my-4">
        <div>
          <h1 className="text-2xl md:text-4xl sm:text-1xl text-white font-extrabold">
            {portData?.name}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="ghost"
            className="hover:bg-gray-400 text-white"
            onClick={onOpen}
          >
            <FaPlus className="text-white" />
            <span className="ml-2">Add coin</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-gray-400"
              >
                <FaEllipsisV className="text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="gap-y-1 mx-2">
              <DropdownMenuLabel className="flex items-center gap-1 cursor-pointer">
                <MdOutlineEdit /> Change name
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="flex items-center gap-1 cursor-pointer">
                <ConfirmationDialog
                  title={`Are you sure to delete ${portData.name}`}
                  Icon={<MdDeleteOutline />}
                  btnTitle="Delete Portfolio"
                  btnVariant={"destructive"}
                  onSubmit={() =>
                    deletePortfolio(portData.id)
                      .then(() => {
                        toast.success(`Successfully deleted`);
                        router.refresh();
                      })
                      .catch((e) => {
                        handleError(e, true);
                      })
                  }
                />
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <PortfolioStat
        transactions={transactions}
        totalCoin={(portData?.Coins ?? []).length}
      />

      <Table className="text-white ">
        <TableHeader className="whitespace-nowrap">
          <TableRow>
            {tableColumns.map((columnData) => (
              <TableHead
                key={columnData.title}
                className={columnData.className}
              >
                {columnData.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="border-white/10">
          {(portData?.Coins ?? []).map((coinData, idx) => {
            const coinId = coinData?.coinData?.attributes?.coingecko_coin_id;
            const priceChange = coinData?.priceChange?.[coinId];
            const totalChange = priceChange?.btc_24h_change ?? 0;
            const isProfit = totalChange >= 0;
            const marketCap = coinData?.coinData?.attributes?.market_cap_usd;
            const btnPrice = (priceChange?.btc ?? 0)
              .toFixed(20)
              .replace(/\.?0+$/, "");
            return (
              <TableRow key={coinData.id}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <img src={coinData?.coinData?.attributes?.image_url} />
                    <span>{coinData.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right whitespace-nowrap overflow-y-scroll  text-ellipsis font-medium w-full">
                  {btnPrice} BTC
                </TableCell>
                {isProfit ? (
                  <TableCell
                    className={`text-right whitespace-nowrap text-green-500`}
                  >
                    &#8593; {totalChange.toFixed(2)} %
                  </TableCell>
                ) : (
                  <TableCell className="text-right whitespace-nowrap text-red-500">
                    &#8595; {totalChange.toFixed(2)} %
                  </TableCell>
                )}

                <TableCell className="text-right">
                  {marketCap
                    ? `$${parseFloat(marketCap).toLocaleString("en")}`
                    : `-`}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="rounded-full text-white"
                      onClick={() =>
                        onOpenAddTransaction(portData.id, coinData.id)
                      }
                    >
                      <FaPlus className="text-white" />
                    </Button>
                    <CoinOptionDropdown
                      portfolioId={portData.id}
                      coinId={coinData.id}
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          {(portData?.Coins ?? []).length == 0 ? (
            <TableRow>
              <TableCell
                className="text-center py-8 sm:py-6"
                colSpan={tableColumns.length}
              >
                No data
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
      <AddCoinDialog portId={portData.id} networks={networks} />
      <AddTransactionDialog coins={portData?.Coins ?? []} />
    </div>
  );
};

export default CoinTable;
