"use client";

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
import { handleError } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { useAddTransactionModal } from "@/store/useAddTransactionModal";
import { ICoin } from "@/types/coins/coin";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
type AddTransactionDialogProps = {
  coins: ICoin[];
};

const schema = z.object({
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
  console.log("🚀 ~ AddTransactionDiaslog ~ coins:", coins);
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
  const { errors } = form.formState;
  console.log("🚀 ~ AddTransactionDialog ~ errors:", errors);

  const onSubmit = (data: ISchema) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    try {
      setIsLoading(true);
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
            <Label htmlFor="price">Price USD</Label>
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
