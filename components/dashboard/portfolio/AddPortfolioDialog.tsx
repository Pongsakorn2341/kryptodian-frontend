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
import { usePortfolioModal } from "@/store/useAddPortfolioModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: `Portfolio name is required` }),
});
type ISchema = z.infer<typeof schema>;

const AddPortfolioDialog = () => {
  const { isOpen, onClose } = usePortfolioModal();

  const form = useForm<ISchema>({
    resolver: zodResolver(schema),
  });
  const { errors } = form.formState;

  const onSubmit = async (data: ISchema) => {

    console.log("🚀 ~ AddPortfolioDialog ~ data:", data);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <form>
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
              <Button type="submit">Add Port</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default AddPortfolioDialog;
