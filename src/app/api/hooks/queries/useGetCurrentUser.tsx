import createDataProvider from '@/app/config/httpProvider';
import { RichUser } from '@/app/types/users';
import { getLocalStorageItem } from '@/app/utils/local-storage';
import { GET_CURRENT_USER } from '@/constants/dataProviders';
import { AUTH_TOKEN } from '@/constants/local-storage-keys';
import { useQuery } from '@tanstack/react-query';

const dataProvider = createDataProvider();
const token = getLocalStorageItem(AUTH_TOKEN) || "";

const useGetCurrentUser = () => {
  const query = useQuery({
    queryKey: [GET_CURRENT_USER],
    queryFn: () => dataProvider.get<RichUser>("/auth/current-user", {
      "Authorization": token
    })
  });

  return query
}

export default useGetCurrentUser