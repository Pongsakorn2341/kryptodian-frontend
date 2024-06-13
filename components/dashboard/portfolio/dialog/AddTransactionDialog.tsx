"use client";

import { addTransaction } from "@/action/transaction/transaction.action";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { handleError } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { useAddTransactionModal } from "@/store/useAddTransactionModal";
import { ICoin } from "@/types/coins/coin";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
type AddTransactionDialogProps = {
  coins: ICoin[];
};

const schema = z.object({
  action: z.enum(["BUY", "SELL"]).default("BUY"),
  coin_id: z.string().min(1, { message: `Coin is required` }),
  quantity: z
    .number()
    .positive()
    .min(0, { message: `Quantity must be a positive value` }),
  price: z
    .number()
    .positive()
    .min(0, { message: `Price must be a positive value` }),
  date: z.date(),
});

type ISchema = z.infer<typeof schema>;

const AddTransactionDialog = ({ coins }: AddTransactionDialogProps) => {
  const { isOpen, portId, defaultCoin, onClose } = useAddTransactionModal();
  const [isToggleCoin, setToggleCoin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<string>("");

  const currentCoinData = useMemo(() => {
    return (coins ?? []).find((item) => item.id == selected);
  }, [selected, defaultCoin]);

  const form = useForm<ISchema>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const { errors } = form.formState;

  const onSubmit = async (data: ISchema) => {
    try {
      setIsLoading(true);
      if (!portId) {
        throw new Error(`Invalid portfolio`);
      }
      if (!currentCoinData?.id) {
        throw new Error(`Coin is not provided`);
      }
      if (!data.action) {
        throw new Error(`Please select buy or sell`);
      }
      console.log(`ACTION : `, data.action);
      const result = await addTransaction({
        portfolio_id: portId,
        action_date: data.date,
        coin_id: currentCoinData?.id,
        action: data.action,
        price: data.price,
        amount: data.quantity,
      });
      if (result.id) {
        toast.success(`Transaction Added`);
        form.reset({
          date: undefined,
          price: undefined,
          quantity: undefined,
          coin_id: undefined,
        });
        onClose();
        router.push(`/portfolio/${portId}/${currentCoinData.id}`);
      }
    } catch (e) {
      handleError(e, true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (defaultCoin) {
      setSelected(defaultCoin);
      form.setValue("coin_id", defaultCoin);
    }
  }, [defaultCoin]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] h-fit rounded-xl bg-secondary_dark border-0 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-start">
            Add Transaction
          </DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <Tabs defaultValue="account" className="w-full">
            <TabsList
              className="w-full bg-constrast/40 py-2"
              {...form.register("action")}
            >
              <TabsTrigger
                value="BUY"
                className="w-full"
                onClick={() => form.setValue("action", "BUY")}
              >
                Buy
              </TabsTrigger>
              <TabsTrigger
                value="SELL"
                className="w-full"
                onClick={() => form.setValue("action", "SELL")}
              >
                Sell
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="my-3 space-y-1">
            <Label htmlFor="name">Coins</Label>
            <Popover open={isToggleCoin} onOpenChange={setToggleCoin}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={isToggleCoin}
                  className="w-full justify-between text-white bg-constrast/40"
                >
                  <div className="flex items-center">
                    {currentCoinData ? (
                      <Image
                        src={currentCoinData?.coinData?.attributes?.image_url}
                        width={25}
                        height={25}
                        alt={`coin-icon`}
                        className="mr-2"
                      />
                    ) : null}
                    {currentCoinData?.name ?? "Select Coin"}
                  </div>
                  <ChevronDown />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] sm:w-[400px] p-0 bg-constrast/40 text-white">
                <Command className="w-full text-zinc-400">
                  <CommandInput
                    placeholder="Search coins ..."
                    className="h-9"
                  />
                  <CommandList {...form.register("coin_id")}>
                    <CommandEmpty>No coin found.</CommandEmpty>
                    <CommandGroup>
                      {coins.map((coinData) => (
                        <CommandItem
                          key={coinData.id}
                          value={coinData.id}
                          className="bg-contrast/40 hover:bg-constrast text-zinc-400"
                          onSelect={(currentValue) => {
                            if (currentValue) {
                              setSelected(currentValue);
                              setToggleCoin(false);
                              form.setValue("coin_id", currentValue);
                            }
                          }}
                        >
                          <div className="flex gap-1 text-white ">
                            <Image
                              src={coinData?.coinData?.attributes?.image_url}
                              width={25}
                              height={25}
                              alt={`coin-icon`}
                            />
                            <span className="text-zinc-600">
                              {coinData?.name}
                            </span>
                          </div>
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4 text-white",
                              selected == coinData.id
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {errors.coin_id ? (
              <p className="text-red-500 text-sm">{errors.coin_id.message}</p>
            ) : null}
          </div>
          <div className="my-3 space-y-1">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              className="text-white bg-constrast/40"
              {...form.register("quantity", { valueAsNumber: true })}
            />
            {errors.quantity ? (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            ) : null}
          </div>
          <div className="my-3 space-y-1">
            <Label htmlFor="price">Price per coin (USD)</Label>
            <Input
              id="price"
              type="number"
              className="text-white bg-constrast/40"
              {...form.register("price", { valueAsNumber: true })}
            />
            {errors.price ? (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            ) : null}
          </div>
          <div className="my-3 space-y-1">
            <Label htmlFor="total-spent">Total Spent</Label>
            <Input
              id="total-spent"
              type="number"
              disabled={true}
              value={
                form.watch("quantity" ?? 0) * (form.watch("price") ?? 0) ?? 0
              }
              className="text-white bg-constrast/40"
            />
          </div>
          <div className="my-3 space-y-1">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="datetime-local"
              className="text-white bg-constrast/40"
              {...form.register("date", { valueAsDate: true })}
            />
            {errors.date ? (
              <p className="text-red-500">{errors.date.message}</p>
            ) : null}
          </div>
        </div>
        {/* <DialogFooter onCli> */}
        <Button
          type="button"
          onClick={async () => {
            const res = await form.trigger();
            if (res) {
              onSubmit(form.getValues());
            }
          }}
          variant={"default"}
          className="text-white"
        >
          {isLoading ? <LoadingSpinner /> : "Add Transaction"}
        </Button>
        {/* </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;
