"use client";

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
  DialogFooter,
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
import { cn } from "@/lib/utils";
import { useAddTransactionModal } from "@/store/useAddTransactionModal";
import { INetwork } from "@/types/network/network";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
type AddTransactionDialogProps = {
  portfolioId: string;
};

const AddTransactionDialog = ({ portfolioId }: AddTransactionDialogProps) => {
  const { isOpen, onClose } = useAddTransactionModal();
  const [isToggleCoin, setToggleCoin] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <div className="my-3">
            <Label htmlFor="name">Network</Label>
            <Popover open={isToggleCoin} onOpenChange={setToggleCoin}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={isToggleCoin}
                  className="w-full justify-between"
                >
                  Select Coin
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search network..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No Network found.</CommandEmpty>
                    <CommandGroup>
                      {([] as INetwork[]).map((network) => (
                        <CommandItem
                          key={network.id}
                          value={network.id}
                          //   onSelect={(currentValue) => {
                          //     setNetworkId(
                          //       currentValue === networkId ? "" : currentValue
                          //     );
                          //     setOpen(false);
                          //   }}
                        >
                          {network?.attributes?.name}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4"
                              //   networkId === network.id
                              //     ? "opacity-100"
                              //     : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {/* <Label htmlFor="name">Network</Label>
        <Input
          id="name"
          disabled={isLoading}
          {...form.register("network_name")}
        /> */}
          </div>
          <div className="my-3">
            <Label htmlFor="name">Address</Label>
            <Input
              id="name"
              //   disabled={isLoading}
              //   {...form.register("address")}
            />
            {/* {errors.address ? (
              <span className="text-red-400">{errors.address.message}</span>
            ) : null} */}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant={"default"}
            // onClick={() => onSubmit(form.getValues())}
          >
            {/* {isLoading ? <LoadingSpinner /> : `Add Coin`} */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;
