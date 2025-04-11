"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateServiceRequest } from "../../api/hooks/mutations";
import { useGetServiceCategories } from "../../api/hooks/queries";
import { CreateServiceRequest } from "../../types/services";

export default function PostJobPage() {
  const [jobType, setJobType] = useState("one-time");
  const { mutate } = useCreateServiceRequest();
  const { data: categories } = useGetServiceCategories();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateServiceRequest>();

  const onSubmit = (data: CreateServiceRequest) => mutate(data);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Post a New Job</CardTitle>
            <CardDescription>
              Fill out the form below to create a new job listing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    {...register("title", { required: "title is required" })}
                    placeholder="e.g. Garden Maintenance"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">
                      {errors.title?.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    {...register("description", {
                      required: "description is required",
                    })}
                    placeholder="Describe the job in detail..."
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      {errors.description?.message}
                    </p>
                  )}
                </div>
                <div>
                    <Label htmlFor="city">Location</Label>
                    <Input
                      id="city"
                      {...register("city", {
                        required: "city is required",
                      })}
                      placeholder="e.g. Brooklyn, NY"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">
                        {errors.city?.message}
                      </p>
                    )}
                  </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="district">Location</Label>
                    <Input
                      id="district"
                      {...register("district", {
                        required: "district is required",
                      })}
                      placeholder="e.g. Brooklyn, NY"
                    />
                    {errors.district && (
                      <p className="text-red-500 text-sm">
                        {errors.district?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="job-type">Job Type</Label>
                    <Select onValueChange={setJobType} defaultValue={jobType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one-time">One-time</SelectItem>
                        <SelectItem value="recurring">Recurring</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rate">Pay Rate</Label>
                    <Input
                      id="rate"
                      {...register("fixed_amount", {
                        required: "fixed amount is required",
                      })}
                      placeholder="e.g. $25/hr or $200 total"
                    />
                    {errors.fixed_amount && (
                      <p className="text-red-500 text-sm">
                        {errors.fixed_amount?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      {...register("duration", {
                        required: "duration is required",
                      })}
                      placeholder="e.g. 2 hours or 3 months"
                    />
                    {errors.duration && (
                      <p className="text-red-500 text-sm">
                        {errors.duration?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem
                          key={category?.uuid}
                          value={category?.en_name}
                        >
                          {category?.en_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {jobType === "recurring" && (
                  <div>
                    <Label htmlFor="schedule">Schedule</Label>
                    <Input
                      id="schedule"
                      placeholder="e.g. Every Saturday, 9AM-11AM"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    placeholder="List any specific requirements or skills needed..."
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the terms and conditions
                  </label>
                </div>
              </div>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Post Job
                </Button>
              </CardFooter>
            </form>
          </CardContent>
          {/* <CardFooter>
            <Button type="submit" className="w-full">
              Post Job
            </Button>
          </CardFooter> */}
        </Card>
      </main>
    </div>
  );
}
