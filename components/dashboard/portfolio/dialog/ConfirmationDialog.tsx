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
import { ReactElement } from "react";

type ConfirmationDialogProps = {
  title: string;
  btnTitle: string;
  btnVariant?: VariantProps<typeof buttonVariants>["variant"];
  description?: string;
  submitTitle?: string;
  Icon?: ReactElement;
  onSubmit: () => {};
};

const ConfirmationDialog = ({
  title,
  btnTitle,
  Icon,
  btnVariant = "default",
  description,
  submitTitle = "Confirm",
  onSubmit,
}: ConfirmationDialogProps) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          {/* {Icon ? <Icon /> : null} */}
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
    </div>
  );
};

export default ConfirmationDialog;
