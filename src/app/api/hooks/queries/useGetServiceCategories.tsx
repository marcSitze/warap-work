import createDataProvider from '@/app/config/httpProvider'
import { ServiceProposalCategory } from '@/app/types/services';
import { SERVICES_CATEGORY } from '@/constants/dataProviders'
import { useQuery } from '@tanstack/react-query'

const dataProvider = createDataProvider();
const useGetServiceCategories = () => {
  const query = useQuery({
    queryKey: [SERVICES_CATEGORY],
    queryFn: () => dataProvider.get<ServiceProposalCategory[]>("/services/categories")
  })

  return query
}

export default useGetServiceCategories