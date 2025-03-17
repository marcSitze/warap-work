import createDataProvider from '@/app/config/httpProvider';
import { setLocalStorageItem } from '@/app/utils/local-storage';
import { LOGIN_MUTATION } from '@/constants/dataProviders';
import { AUTH_TOKEN, REFRESH_TOKEN } from '@/constants/local-storage-keys';
import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const dataProvider = createDataProvider();
type LoginDTO = { username: string; password: string }

const useLoginMutation = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationKey: [LOGIN_MUTATION],
    mutationFn: (data: LoginDTO) => dataProvider.post<{ token: string; refresh: string }, LoginDTO>("/auth/login", {
      ...data,
    }),
    onSuccess: (data) => {
      if (!data.token) {
        return;
      }
      toast.success("User successfully logged in...");
      setLocalStorageItem(AUTH_TOKEN, data.token);
      if (data.refresh) {
        setLocalStorageItem(REFRESH_TOKEN, data.refresh);
      }
      router.push("/")
    }
  })
  return mutation;
}

export default useLoginMutation