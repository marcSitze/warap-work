import createDataProvider from '@/app/config/httpProvider';
import { PaginatedResponse } from '@/app/types/common';
import { ServiceRequest } from '@/app/types/services';
import { SERVICES_REQUESTS_LIST } from '@/constants/dataProviders'
import { useQuery } from '@tanstack/react-query'

const dataProvider = createDataProvider();

const useGetServicesRequestsList = () => {
  const query = useQuery({
    queryKey: [SERVICES_REQUESTS_LIST],
    queryFn: () => dataProvider.get<PaginatedResponse<ServiceRequest>>("/services/requests/list")
  })

  return query
}

export default useGetServicesRequestsList