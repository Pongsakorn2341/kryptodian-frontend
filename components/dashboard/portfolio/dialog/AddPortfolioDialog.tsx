"use client";

import { addPortfolio } from "@/action/portfolio/portfolios.action";
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
import { handleFetchBackend } from "@/lib/utils";
import { usePortfolioModal } from "@/store/useAddPortfolioModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: `Portfolio name is required` }),
});
type ISchema = z.infer<typeof schema>;

type AddPortfolioDialogProps = {};

const AddPortfolioDialog = ({}: AddPortfolioDialogProps) => {
  const { isOpen, onClose } = usePortfolioModal();
  const router = useRouter();
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
      if (!data.name) {
        toast.error(`Portfolio name is not provided`);
        return;
      }
      const response = await addPortfolio(data.name);
      if (response) {
        toast.success(`Portfolio ${data.name} is added.`);
        router.refresh();
        onCloseModal();
      }
    } catch (e) {
      handleError(e, true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCloseModal}>
      <DialogContent className="sm:max-w-[450px] bg-secondary_dark text-white border-0">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add Portfolio</DialogTitle>
        </DialogHeader>
        <div className="flex items-center w-full">
          <div className="w-full">
            <Label htmlFor="name">Portfolio Name</Label>
            <Input id="name" {...form.register("name")} />
            {errors.name ? (
              <span className="text-red-400">{errors.name.message}</span>
            ) : null}
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => onSubmit(form.getValues())}>
            Add Port
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPortfolioDialog;
