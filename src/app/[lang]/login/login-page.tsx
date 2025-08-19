"use client";
import { getDictionary, LocaleType } from "@/app/dictionaries";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../api/hooks/mutations";
import Link from "next/link";
import useLocation from "@/app/dictionaries/useLocation";

type LoginFormValues = {
  email: string;
  password: string;
  remember: boolean;
};

export default function LoginPage({
  dictionary,
}: {
  lang: LocaleType;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const { localizeUrl } = useLocation();
  const { login, common } = dictionary;
  const { mutate, isPending, isError } = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = (data: LoginFormValues) => {
    mutate({ username: data.email, password: data.password });
  };

  return (
    <div className="min-h-screen px-4 bg-background flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            {login.login_to}
          </CardTitle>
          <CardDescription className="text-center">
            {login.enter_your_email_and_password}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{common.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2 mb-4">
              <Label htmlFor="password">{common.password}</Label>
              <Input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* <div className="flex items-center space-x-2">
              <Checkbox id="remember" {...register("remember")} />
              <Label htmlFor="remember" className="text-sm font-medium leading-none">
                Remember me
              </Label>
            </div> */}
            {isError && (
              <p className="text-red-500 text-sm">
                {login.login_failed_please_try_again}
              </p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>
            {/* *
            * @ Not Yet Functional
            */}
           <div className="flex justify-between w-full text-sm">
              {/* <Link
                href="/forgot-password"
                className="text-primary hover:underline"
              >
                {login.forgot_password}
              </Link> */}
              <Link href={localizeUrl("/signup")} className="text-primary hover:underline">
                {login.dont_have_an_account}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
