import createDataProvider from "@/app/config/httpProvider";
import { PaginatedResponse } from "@/app/types/common";
import { ServiceRequest } from "@/app/types/services";
import { SERVICES_REQUESTS_LIST } from "@/constants/dataProviders";
import { SIZE } from "@/constants/pagination";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const dataProvider = createDataProvider();

type Params = {
  page?: number;
  size?: number;
  sort?: "asc" | "desc";
  category_uuid?: string;
  min_amount?: number;
  max_amount?: number;
}

function toQueryString(params: Params): string {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  return query.toString(); // returns something like "page=1&sort=asc"
}

const useGetServicesRequestsList = (params : Params = {}) => {
  const queryString = toQueryString({ ...params, size: params?.size || SIZE });

  const query = useQuery({
    queryKey: [SERVICES_REQUESTS_LIST, params?.page, params?.sort, params?.category_uuid],
    queryFn: () =>
      dataProvider.get<PaginatedResponse<ServiceRequest>>(
        `/services/requests/list?${queryString}`
      ),
    placeholderData: keepPreviousData,
  });

  return query;
};

export default useGetServicesRequestsList;
