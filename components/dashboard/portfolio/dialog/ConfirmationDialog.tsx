"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";

import { VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import { ReactElement } from "react";

type ConfirmationDialogProps = {
  title: string;
  btnTitle: string;
  btnVariant?: VariantProps<typeof buttonVariants>["variant"];
  description?: string;
  submitTitle?: string;
  Icon: LucideIcon;
  onSubmit: () => {};
};

const ConfirmationDialog = ({
  title,
  btnTitle,
  btnVariant = "default",
  description,
  submitTitle = "Confirm",
  onSubmit,
  ...rest
}: ConfirmationDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center gap-1 p-0 m-0">
        <rest.Icon size={17} />
        {btnTitle}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant={btnVariant} onClick={onSubmit}>
            {submitTitle}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
