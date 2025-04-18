import createDataProvider from '@/app/config/httpProvider'
import { useLoader } from '@/app/contexts/loader/LoaderProvider';
import { ServiceProposalCategory } from '@/app/types/services';
import { SERVICES_CATEGORY } from '@/constants/dataProviders'
import { useQuery } from '@tanstack/react-query'

const dataProvider = createDataProvider();

const useGetServiceCategories = () => {
  const { stop } = useLoader();

  const query = useQuery({
    queryKey: [SERVICES_CATEGORY],
    queryFn: () => dataProvider.get<ServiceProposalCategory[]>("/services/categories"),
    select: (data) => {
      stop();
      return data
    }
  })

  return query
}

export default useGetServiceCategories