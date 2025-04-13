import createDataProvider from '@/app/config/httpProvider';
import { User, UserDTO } from '@/app/types/users';
import { REGISTER_USER_MUTATION } from '@/constants/dataProviders';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const dataProvider = createDataProvider();

const useRegisterUser = () => {
  const router = useRouter()
  const mutation = useMutation({
    mutationKey: [REGISTER_USER_MUTATION],
    mutationFn: (data: UserDTO) => dataProvider.post<User, UserDTO>("/users/register", {
      ...data,
    }),
    onSuccess: () => {
      toast.success("User registered successfully");
      router.push("/login")
    }
  });
  return mutation
}

export default useRegisterUser