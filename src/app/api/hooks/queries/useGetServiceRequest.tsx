import createDataProvider from '@/app/config/httpProvider';
import { ServiceRequest } from '@/app/types/services';
import { SERVICE_REQUEST } from '@/constants/dataProviders';
import { useQuery } from '@tanstack/react-query';

const dataProvider = createDataProvider();

const useGetServiceRequest = (uuid: string) => {
  const query = useQuery({
    queryKey: [SERVICE_REQUEST],
    queryFn: () => dataProvider.get<ServiceRequest>(`/services/requests/${uuid}/get`)
  });

  return query;
}

export default useGetServiceRequest