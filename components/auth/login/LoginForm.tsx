"use client";

import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleError } from "@/lib/helper";
import { ILoginSchema, loginSchema } from "@/lib/zod/login.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const { errors } = form.formState;

  const handleSubmit = async (data: ILoginSchema) => {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        ...data,
        action: "login",
        redirect: false,
      });
      if (res?.ok) {
        toast.success(`Yess`);
      } else if (res?.error) {
        throw new Error(res?.error);
      }
    } catch (e) {
      const _msg = handleError(e);
      console.log("🚀 ~ handleSubmit ~ _msg:", _msg);
      toast.error(_msg.message);
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
      <h1>Login</h1>
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
      <div className="flex justify-between">
        <Button
          type="button"
          variant={"link"}
          onClick={() => router.push(`/auth/sign-up`)}
          disabled={isLoading}
        >
          Don&apos;t have an account?
        </Button>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? <LoadingSpinner /> : `Login`}
        </Button>
      </div>
    </form>
  );
}
