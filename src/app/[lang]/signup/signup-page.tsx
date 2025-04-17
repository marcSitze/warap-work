"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRegisterUser } from "../../api/hooks/mutations";
import { LOGIN } from "@/constants/routes";
import { UserDTO } from "../../types/users";
import { getDictionary } from "@/app/dictionaries";

export default function SignupPage({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const { common, signup } = dictionary;
  const { mutate } = useRegisterUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserDTO>();

  const onSubmit = (data: UserDTO) => mutate(data);
  const password = watch("password");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            {signup.create_an_account}
          </CardTitle>
          <CardDescription className="text-center">
            {signup.enter_your_details_below}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">{common.first_name}</Label>
              <Input
                id="first-name"
                placeholder="John Doe"
                {...register("first_name", {
                  required: "First name is required",
                })}
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm">
                  {errors.first_name?.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">{common.last_name}</Label>
              <Input
                id="last-name"
                placeholder="John Doe"
                {...register("last_name", {
                  required: "Last name is required",
                })}
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm">
                  {errors.last_name?.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">{common.city}</Label>
              <Input
                id="city"
                placeholder="City"
                {...register("city", { required: "City is required" })}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city?.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{common.phone}</Label>
              <Input
                id="phone"
                placeholder="phone"
                {...register("phone", { required: "phone is required" })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone?.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">{common.district}</Label>
              <Input
                id="district"
                placeholder="District"
                {...register("district", { required: "District is required" })}
              />
              {errors.district && (
                <p className="text-red-500 text-sm">
                  {errors.district?.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{common.password}</Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">{common.confirm_password}</Label>
              <Input
                id="confirm-password"
                type="password"
                {...register("confirm_password", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirm_password && (
                <p className="text-red-500 text-sm">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
            {/* <div className="flex items-center space-x-2">
              <Checkbox id="terms" {...register("terms", { required: "You must agree to the terms" })} />
              <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  terms and conditions
                </Link>
              </label>
            </div>
            {errors.terms && <p className="text-red-500 text-sm">{errors.terms.message}</p>} */}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              {common.create_account}
            </Button>
            <div className="text-sm text-center">
              {signup.already_have_an_account}?{" "}
              <Link href={`/${LOGIN}`} className="text-primary hover:underline">
                {common.login}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
