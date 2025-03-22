import createDataProvider from '@/app/config/httpProvider';
import { ServiceRequest } from '@/app/types/services';
import { useQuery } from '@tanstack/react-query';

const dataProvider = createDataProvider();

const useGetServiceRequest = () => {
  const query = useQuery({
    queryKey: [],
    queryFn: () => dataProvider.get<ServiceRequest>("/services/requests/{service_request_uuid}/get")
  });

  return query;
}

export default useGetServiceRequest