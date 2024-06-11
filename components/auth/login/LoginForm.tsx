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
        toast.success(`Sign in successfully`);
        router.push(`/portfolio`);
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
      className="space-y-6 w-full p-6 sm:p-10 sm:border-0 rounded-lg shadow-lg border border-indigo-200 bg-white"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <h1 className="text-2xl sm:text-4xl font-bold text-center sm:text-left text-indigo-600">
        Login
      </h1>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="email"
          className="text-sm sm:text-base font-medium text-indigo-800"
        >
          Email
        </Label>
        <Input
          id="email"
          type="email"
          {...form.register("email")}
          className="text-gray-700 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.email && (
          <span className="text-red-500 text-sm sm:text-base">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="password"
          className="text-sm sm:text-base font-medium text-indigo-800"
        >
          Password
        </Label>
        <Input
          id="password"
          type="password"
          {...form.register("password")}
          className="text-gray-700 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.password && (
          <span className="text-red-500 text-sm sm:text-base">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          type="button"
          variant="link"
          onClick={() => router.push(`/auth/sign-up`)}
          disabled={isLoading}
          className="text-sm sm:text-base text-indigo-600 hover:underline"
        >
          Don&apos;t have an account?
        </Button>

        <Button
          type="submit"
          disabled={isLoading}
          className="text-sm sm:text-base px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {isLoading ? <LoadingSpinner /> : `Login`}
        </Button>
      </div>
    </form>
  );
}
