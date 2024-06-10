"use client";

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
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: `Portfolio name is required` }),
});
type ISchema = z.infer<typeof schema>;

type AddPortfolioDialogProps = {
  onAdded: () => void;
};

const AddPortfolioDialog = ({ onAdded }: AddPortfolioDialogProps) => {
  const { isOpen, onClose } = usePortfolioModal();

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
      const response = await handleFetchBackend({
        path: "/portfolio",
        method: "POST",
        body: {
          name: data.name,
        },
      });
      if (response.status == "success") {
        toast.success(`Portfolio ${data.name} is added.`);
        onAdded();
        onCloseModal();
      }
    } catch (e) {
      handleError(e, true);
    }
    console.log("🚀 ~ AddPortfolioDialog ~ data:", data);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onCloseModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Portfolio</DialogTitle>
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
    </div>
  );
};

export default AddPortfolioDialog;
