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
import { IPortfolio } from "@/types/portfolio/portfolio";
import { ITransaction } from "@/types/transaction";
import { Coins, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import AddTransactionDialog from "../portfolio/dialog/AddTransactionDialog";
import ConfirmationDialog from "../portfolio/dialog/ConfirmationDialog";
import TransactionStat from "./TransactionStat";
import { formatDate } from "@/lib/utils";
import Heading from "../Heading";

type CoinTableProps = {
  portfolioData: IPortfolio;
  transactions: ITransaction[];
  coinId: string;
};

const tableColumns = [
  {
    title: "Type",
    className: "text-gray-400 w-fit",
  },
  {
    title: "Price",
    className: "text-right text-gray-400 w-fit",
  },
  {
    title: "Quantity",
    className: "text-right text-gray-400 w-fit",
  },
  {
    title: "Date & Time",
    className: "text-right text-gray-400",
  },
  {
    title: "Cost",
    className: "text-right text-gray-400",
  },
  {
    title: "Actions",
    className: "text-gray-400  text-center",
  },
];

const TransactionTable = ({
  portfolioData: portData,
  transactions,
  coinId,
}: CoinTableProps) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { onOpen } = useAddCoinModal();
  const { onOpen: onOpenAddTransaction } = useAddTransactionModal();

  const coinData = useMemo(() => {
    return (portData.Coins ?? []).find((item) => item.id == coinId);
  }, [portData.Coins, coinId]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-primary_dark rounded-md mt-2">
      <div className="flex items-center justify-between mt-10 my-4">
        <div className="my-2">
          <Heading
            title={coinData?.name ?? `Coin`}
            description={coinData?.coinData.attributes?.symbol ?? "Symbol"}
            image={coinData?.coinData?.attributes?.image_url}
            bgColor="bg-zinc-700"
          />
        </div>
      </div>
      <TransactionStat transactions={transactions} totalCoin={0} />
      <div className="flex items-center justify-between my-4">
        <div>
          <h1 className="text-1xl text-white font-bold">Transaction</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="ghost"
            className="hover:bg-gray-400 text-white"
            onClick={onOpen}
          >
            <FaPlus className="text-white" />
            <span className="ml-2">Add transaction</span>
          </Button>
        </div>
      </div>
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
          {(transactions ?? []).map((txData, idx) => {
            const textColor =
              txData.action == "BUY" ? "text-green-500" : "text-red-500";
            return (
              <TableRow key={txData.id}>
                <TableCell className={`${textColor}`}>
                  {txData.action}
                </TableCell>
                <TableCell className="text-right whitespace-nowrap text-ellipsis font-medium w-fit">
                  {txData.price}
                </TableCell>

                <TableCell
                  className={`${textColor} text-right whitespace-nowrap items-center`}
                >
                  {`${txData.action == "BUY" ? "+" : "-"} ${txData.amount}`}
                </TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  {formatDate(txData.action_at)}
                </TableCell>
                <TableCell className="text-right">
                  {txData.amount * txData.price}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="rounded-full text-white"
                    >
                      <Edit className="text-white" size={15} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="rounded-full text-white"
                    >
                      <Trash2 className="text-white" size={15} />
                    </Button>
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
      <AddTransactionDialog coins={portData?.Coins ?? []} />
    </div>
  );
};

export default TransactionTable;