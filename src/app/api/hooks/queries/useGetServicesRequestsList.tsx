import createDataProvider from "@/app/config/httpProvider";
import { PaginatedResponse } from "@/app/types/common";
import { ServiceRequest } from "@/app/types/services";
import { SERVICES_REQUESTS_LIST } from "@/constants/dataProviders";
import { SIZE } from "@/constants/pagination";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const dataProvider = createDataProvider();

const useGetServicesRequestsList = ({
  page = 1,
  size = SIZE,
}: {
  page?: number;
  size?: number;
} = {}) => {
  const query = useQuery({
    queryKey: [SERVICES_REQUESTS_LIST, page],
    queryFn: () =>
      dataProvider.get<PaginatedResponse<ServiceRequest>>(
        `/services/requests/list?page=${page}&size=${size}`
      ),
    placeholderData: keepPreviousData,
  });

  return query;
};

export default useGetServicesRequestsList;
