"use client";

import { addCoin } from "@/action/coin/coin.action";
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
import { handleError } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { useAddCoinModal } from "@/store/useAddCoinModal";
import { INetwork } from "@/types/network/network";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "lucide-react";
import { useRouter as useRouterNavigation } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
const schema = z.object({
  network_name: z.string().min(1, { message: `Network is required` }),
  address: z.string().min(1, { message: `Address is required` }),
});
type ISchema = z.infer<typeof schema>;

type AddCoinDialogProps = {
  portId: string;
  networks: INetwork[];
};

const AddCoinDialog = ({
  portId,
  networks: networkList,
}: AddCoinDialogProps) => {
  const { isOpen, onClose } = useAddCoinModal();
  const [open, setOpen] = useState(false);
  const [networkId, setNetworkId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useRouterNavigation();
  const form = useForm<ISchema>({
    resolver: zodResolver(schema),
  });

  const onCloseModal = () => {
    form.reset();
    form.clearErrors();
    setNetworkId("");
    onClose();
  };

  const { errors } = form.formState;

  const onSubmit = async (data: ISchema) => {
    try {
      if (!portId) {
        throw new Error(`Portfolio is not found`);
      }
      if (!networkId) {
        throw new Error(`Network is not provided`);
      }
      if (!data.address) {
        throw new Error(`Address is not provided`);
      }
      setIsLoading(true);
      const response = await addCoin({
        network: networkId,
        address: data.address,
        portfolioId: portId,
      });

      if (response.id) {
        form.reset({ address: "" });
        form.clearErrors();
        toast.success(`Add coin successfully`);
        navigation.refresh();
        onCloseModal();
      } else {
        throw new Error(response?.cause);
      }
    } catch (e) {
      handleError(e, true);
      // form.reset({ address: "" });
      // setNetworkId("");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onCloseModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Coin</DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <div className="my-3">
              <Label htmlFor="name">Network</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {networkId
                      ? networkList.find((network) => network.id === networkId)
                          ?.attributes.name
                      : "Select Network..."}
                    {/* <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
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
                        {networkList.map((network) => (
                          <CommandItem
                            key={network.id}
                            value={network.id}
                            onSelect={(currentValue) => {
                              setNetworkId(
                                currentValue === networkId ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            {network?.attributes?.name}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                networkId === network.id
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
              {/* <Label htmlFor="name">Network</Label>
              <Input
                id="name"
                disabled={isLoading}
                {...form.register("network_name")}
              /> */}
              {errors.network_name ? (
                <span className="text-red-400">
                  {errors.network_name.message}
                </span>
              ) : null}
            </div>
            <div className="my-3">
              <Label htmlFor="name">Address</Label>
              <Input
                id="name"
                disabled={isLoading}
                {...form.register("address")}
              />
              {errors.address ? (
                <span className="text-red-400">{errors.address.message}</span>
              ) : null}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant={"default"}
              onClick={() => onSubmit(form.getValues())}
            >
              {isLoading ? <LoadingSpinner /> : `Add Coin`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCoinDialog;
