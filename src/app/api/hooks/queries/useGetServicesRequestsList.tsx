import createDataProvider from '@/app/config/httpProvider';
import { ServiceRequest } from '@/app/types/services';
import { SERVICES_REQUESTS_LIST } from '@/constants/dataProviders'
import { useQuery } from '@tanstack/react-query'

const dataProvider = createDataProvider();

type PaginatedResponse<T> = {
  page?: number;
  size?: number;
  total?: number;
  more?: boolean;
  requests?: T[]
}

const useGetServicesRequestsList = () => {
  const query = useQuery({
    queryKey: [SERVICES_REQUESTS_LIST],
    queryFn: () => dataProvider.get<PaginatedResponse<ServiceRequest>>("/services/requests/list")
  })

  return query
}

export default useGetServicesRequestsList