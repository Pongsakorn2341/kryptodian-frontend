"use client";

import { registerAccount } from "@/action/auth.action";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleError } from "@/lib/helper";
import { IRegisterSchema, registerSchema } from "@/lib/zod/register.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<IRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const { errors } = form.formState;

  const handleSubmit = async (data: IRegisterSchema) => {
    if (data.confirm_password != data.password) {
      return form.setError("confirm_password", {
        message: `Confirm password is mismatch.`,
      });
    }
    try {
      setIsLoading(true);

      const response = await registerAccount(data);
      if (response) {
        toast.success(`Registeration successfully`);
        form.reset();
        router.push(`/auth/login`);
      }
    } catch (e) {
      handleError(e, true);
    } finally {
      setTimeout(() => {
        setIsLoading((prev) => false);
      }, 2000);
    }
  };

  return (
    <form
      className="space-y-6 w-full"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <h1>Registeration</h1>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          {...form.register("name")}
          className="text-gray-500"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...form.register("email")}
          className="text-gray-500"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...form.register("password")}
          className="text-gray-500"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>
      <div>
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          type="password"
          {...form.register("confirm_password")}
          className="text-gray-500"
        />
        {errors.confirm_password && (
          <span className="text-red-500 text-sm">
            {errors.confirm_password.message}
          </span>
        )}
      </div>
      <div className="flex justify-between">
        <Button
          type="button"
          variant={"link"}
          onClick={() => router.push(`/auth/login`)}
          disabled={isLoading}
        >
          Login
        </Button>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? <LoadingSpinner /> : `Register`}
        </Button>
      </div>
    </form>
  );
}
