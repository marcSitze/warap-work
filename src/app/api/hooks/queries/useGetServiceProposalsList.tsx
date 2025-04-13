
import createDataProvider from '@/app/config/httpProvider';
import { PaginatedResponse } from '@/app/types/common';
import { ServiceRequest } from '@/app/types/services';
import { SERVICES_PROPOSALS_LIST } from '@/constants/dataProviders';
import { useQuery } from '@tanstack/react-query';

const dataProvider = createDataProvider();

const useGetServiceProposalsList = () => {
  const query = useQuery({
    queryKey: [SERVICES_PROPOSALS_LIST],
    queryFn: () => dataProvider.get<PaginatedResponse<Partial<ServiceRequest>>>("/services/proposals/list")
  });

  return query
}

export default useGetServiceProposalsList
