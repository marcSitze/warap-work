import createDataProvider from '@/app/config/httpProvider';
import { User, UserDTO } from '@/app/types/users';
import { REGISTER_USER_MUTATION } from '@/constants/dataProviders';
import { useMutation } from '@tanstack/react-query';

const dataProvider = createDataProvider();

const useRegisterUser = () => {
  const mutation = useMutation({
    mutationKey: [REGISTER_USER_MUTATION],
    mutationFn: (data: UserDTO) => dataProvider.post<User, UserDTO>("/users/register", {
      ...data,
    })
  });
  return mutation
}

export default useRegisterUser