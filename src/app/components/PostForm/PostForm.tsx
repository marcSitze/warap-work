import { useCreateServiceRequest } from "@/app/api/hooks/mutations";
import {
  useGetCurrentUser,
  useGetServiceCategories,
} from "@/app/api/hooks/queries";
import { getDictionary } from "@/app/dictionaries";
import { CreateServiceRequest } from "@/app/types/services";
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
import { useForm } from "react-hook-form";

const ProposalAndPostForm = ({ onClose, dictionary }: { onClose?: () => void; dictionary: Awaited<ReturnType<typeof getDictionary>>; }) => {
  const { common } = dictionary;
  const { data: currentUser, refetch } = useGetCurrentUser();
  const { mutate, isPending } = useCreateServiceRequest({
    callback: () => {
      refetch();
      if (onClose) onClose();
    },
  });
  const { data: categories } = useGetServiceCategories();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateServiceRequest>();

  const onSubmit = (data: CreateServiceRequest) =>
    mutate({
      ...data,
      email: currentUser?.email,
      phone: currentUser?.phone,
      whatsapp: currentUser?.phone,
    });

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{common.create_a_new_job}</CardTitle>
          <CardDescription>
            {common.fill_out_the_form_below}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div>
                <Label htmlFor="title">{common.job_title}</Label>
                <Input
                  id="title"
                  {...register("title", { required: common.title_is_required })}
                  placeholder={`e.g. ${common.garden_maintenance}`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">
                    {errors.title?.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="description">{common.job_description}</Label>
                <Textarea
                  id="description"
                  {...register("description", {
                    required: common.description_is_required,
                  })}
                  placeholder={`${common.describe_the_job_in_detail}...`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description?.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="city">{common.city}</Label>
                <Input
                  id="city"
                  {...register("city", {
                    required: common.city_is_required,
                  })}
                  placeholder="e.g. Brooklyn, NY"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city?.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="district">Localisation</Label>
                  <Input
                    id="district"
                    {...register("district", {
                      required: common.district_is_required,
                    })}
                    placeholder="e.g. Brooklyn, NY"
                  />
                  {errors.district && (
                    <p className="text-red-500 text-sm">
                      {errors.district?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rate">{common.pay_rate}</Label>
                  <Input
                    id="rate"
                    {...register("fixed_amount", {
                      required: common.fixed_amount_is_required,
                    })}
                    placeholder="e.g. 1000 XAF"
                  />
                  {errors.fixed_amount && (
                    <p className="text-red-500 text-sm">
                      {errors.fixed_amount?.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="duration">{common.duration}</Label>
                  <Input
                    id="duration"
                    {...register("duration", {
                      required: common.duration_is_required,
                    })}
                    placeholder={`e.g. 2 ${common.hours}`}
                  />
                  {errors.duration && (
                    <p className="text-red-500 text-sm">
                      {errors.duration?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <Label htmlFor="category">{common.category}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={common.select_a_category} />
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

              {/* <div className="mb-3">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  placeholder="List any specific requirements or skills needed..."
                />
              </div> */}
            </div>
            <CardFooter className="px-0">
              <Button disabled={isPending} type="submit" className="w-full">
                {common.create_job}
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

export default ProposalAndPostForm;
