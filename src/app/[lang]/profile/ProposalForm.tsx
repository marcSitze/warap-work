import { useCreateProposalRequest } from "@/app/api/hooks/mutations";
import {
  useGetCurrentUser,
  useGetServiceCategories,
} from "@/app/api/hooks/queries";
import { CreateProposalRequest } from "@/app/types/services";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";

const ProposalForm = ({ onClose }: { onClose?: () => void }) => {
  const { refetch } = useGetCurrentUser();
  const { mutate } = useCreateProposalRequest({
    callback: () => {
      refetch();
      if (onClose) onClose();
    },
  });

  const { data: categories } = useGetServiceCategories();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateProposalRequest>();

  const onSubmit = (data: CreateProposalRequest) => mutate(data);

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Create a New Job</CardTitle>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rate">Pay Rate</Label>
                  <Input
                    id="rate"
                    {...register("hourly_rate", {
                      required: "fixed amount is required",
                    })}
                    placeholder="e.g. 1000 XAF"
                  />
                  {errors.hourly_rate && (
                    <p className="text-red-500 text-sm">
                      {errors.hourly_rate?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor="category_uuid">Category</Label>
                <Controller
                  name="category_uuid"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem
                            key={category?.uuid}
                            value={category?.uuid}
                          >
                            {category?.en_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category_uuid && (
                  <p className="text-red-500 text-sm">
                    {errors.category_uuid?.message}
                  </p>
                )}
              </div>
            </div>
            <CardFooter>
              <Button type="submit" className="w-full">
                Create Proposal
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
  );
};

export default ProposalForm;
