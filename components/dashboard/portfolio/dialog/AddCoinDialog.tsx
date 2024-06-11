"use client";

import { addCoin } from "@/action/portfolio/pofolios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleError } from "@/lib/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter as useRouterNavigation } from "next/navigation";

import { useAddCoinModal } from "@/store/useAddCoinModal";
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
};

const AddCoinDialog = ({ portId }: AddCoinDialogProps) => {
  const { isOpen, onClose } = useAddCoinModal();
  const navigation = useRouterNavigation();
  const form = useForm<ISchema>({
    resolver: zodResolver(schema),
  });

  const onCloseModal = () => {
    form.reset();
    form.clearErrors();
    onClose();
  };

  const { errors } = form.formState;

  const onSubmit = async (data: ISchema) => {
    try {
      if (!portId) {
        throw new Error(`Portfolio is not found`);
      }
      const response = await addCoin({
        network: data.network_name,
        address: data.address,
        portfolioId: portId,
      });
      if (response) {
        form.reset();
        form.clearErrors();
        toast.success(`Add coin successfully`);
        navigation.refresh();
        onCloseModal();
      }
    } catch (e) {
      handleError(e, true);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onCloseModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Coin</DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <div className="my-3">
              <Label htmlFor="name">Network</Label>
              <Input id="name" {...form.register("network_name")} />
              {errors.network_name ? (
                <span className="text-red-400">
                  {errors.network_name.message}
                </span>
              ) : null}
            </div>
            <div className="my-3">
              <Label htmlFor="name">Address</Label>
              <Input id="name" {...form.register("address")} />
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
              Add Coin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCoinDialog;
