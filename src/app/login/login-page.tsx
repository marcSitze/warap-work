'use client';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useLoginMutation } from "../api/hooks/mutations";

type LoginFormValues = {
  email: string;
  password: string;
  remember: boolean;
};

export default function LoginPage() {
  const { mutate, isPending, isError } = useLoginMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();

  const onSubmit = (data: LoginFormValues) => {
    mutate({ username: data.email, password: data.password });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Login to SmallJobs</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" {...register("remember")} />
              <Label htmlFor="remember" className="text-sm font-medium leading-none">
                Remember me
              </Label>
            </div>
            {isError && <p className="text-red-500 text-sm">Login failed. Please try again.</p>}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>
            <div className="flex justify-between w-full text-sm">
              <Link href="/forgot-password" className="text-primary hover:underline">
                Forgot password?
              </Link>
              <Link href="/signup" className="text-primary hover:underline">
                Don&apos;t have an account? Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
