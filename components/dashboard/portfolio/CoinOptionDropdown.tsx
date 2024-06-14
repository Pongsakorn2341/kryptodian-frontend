"use client";
import { removeCoin } from "@/action/coin/coin.action";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleError } from "@/lib/helper";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEllipsisV, FaEye } from "react-icons/fa";
import ConfirmationDialog from "./dialog/ConfirmationDialog";

type CoinOptionDropdownProps = {
  portfolioId: string;
  coinId: string;
};

const CoinOptionDropdown = ({
  portfolioId,
  coinId,
}: CoinOptionDropdownProps) => {
  const router = useRouter();

  return (
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
          <ConfirmationDialog
            title={`Are you sure to remove coin`}
            btnTitle="Remove Coin"
            btnVariant={"destructive"}
            Icon={Trash2}
            onSubmit={() =>
              removeCoin({ portfolioId: portfolioId, coinId: coinId })
                .then(() => {
                  toast.success(`Successfully removed!`);
                  router.refresh();
                })
                .catch((e) => {
                  handleError(e, true);
                })
            }
          />
        </DropdownMenuLabel>
        <DropdownMenuLabel
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => router.push(`/portfolio/${portfolioId}/${coinId}`)}
        >
          <FaEye /> View Transaction
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CoinOptionDropdown;
