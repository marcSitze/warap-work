import createDataProvider from '@/app/config/httpProvider';
import { CreateProposalRequest } from '@/app/types/services';
import { getLocalStorageItem } from '@/app/utils/local-storage';
import { CREATE_PROPOSAL_REQUEST } from '@/constants/dataProviders';
import { AUTH_TOKEN } from '@/constants/local-storage-keys';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const dataProvider = createDataProvider();

const token = getLocalStorageItem(AUTH_TOKEN) || "";

const useCreateProposalRequest = ({ callback}: { callback?: ()=>void}) => {
  const mutation = useMutation({
    mutationKey: [CREATE_PROPOSAL_REQUEST],
    mutationFn: (data: CreateProposalRequest) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dataProvider.post<any, CreateProposalRequest>(
        "/services/create/proposal",
        {...data, hourly_rate: Number(data.hourly_rate), skills: ["default"]},
        {
          // "Authorization": "Bearer " + token
          "Authorization": token
        }
      ),
      onSuccess: () => {
        toast.success("proposal created successfully");
        if(callback) {
          callback()
        }
      }
  });
  return mutation;
};

export default useCreateProposalRequest