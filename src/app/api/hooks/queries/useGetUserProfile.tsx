import createDataProvider from '@/app/config/httpProvider';
import { RichUser } from '@/app/types/users';
import { GET_USER_PROFILE } from '@/constants/dataProviders';
import { useQuery } from '@tanstack/react-query';

const dataProvider = createDataProvider();
const useGetUserProfile = (user_uuid: string) => {
  const query = useQuery({
    queryKey: [GET_USER_PROFILE],
    queryFn: () => dataProvider.get<RichUser>(`/users/${user_uuid}/profile/`),
    enabled: !!user_uuid
  })
  return query;
}

export default useGetUserProfile