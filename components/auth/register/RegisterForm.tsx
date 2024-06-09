"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IRegisterSchema, registerSchema } from "@/lib/zod/register.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const form = useForm<IRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const { errors } = form.formState;

  const handleSubmit = (data: IRegisterSchema) => {};

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" {...form.register("name")} />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...form.register("email")} />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...form.register("password")} />
      </div>
      <div>
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          type="password"
          {...form.register("confirm_password")}
        />
      </div>
      {errors.password && (
        <span className="text-red-500">{errors.password.message}</span>
      )}
      <Button type="submit">Register</Button>
    </form>
  );
}
