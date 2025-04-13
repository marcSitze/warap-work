import createDataProvider from "@/app/config/httpProvider";
import { CreateServiceRequest } from "@/app/types/services";
import { getLocalStorageItem } from "@/app/utils/local-storage";
import { CREATE_SERVICE_REQUEST } from "@/constants/dataProviders";
import { AUTH_TOKEN } from "@/constants/local-storage-keys";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const dataProvider = createDataProvider();

const token = getLocalStorageItem(AUTH_TOKEN);

const useCreateServiceRequest = ({ callback }: { callback?: () => void }) => {
  const mutation = useMutation({
    mutationKey: [CREATE_SERVICE_REQUEST],
    mutationFn: (data: CreateServiceRequest) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dataProvider.post<any, CreateServiceRequest>(
        "/services/create/request",
        {
          ...data,
          duration: Number(data.duration),
          fixed_amount: Number(data.fixed_amount),
        },
        {
          Authorization: "Bearer " + token,
        }
      ),
    onSuccess: () => {
      toast.success("job created successfully");
      if (callback) {
        callback();
      }
    },
  });
  return mutation;
};

export default useCreateServiceRequest;
