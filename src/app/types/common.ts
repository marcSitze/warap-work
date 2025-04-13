export type PaginatedResponse<T> = {
  page?: number;
  size?: number;
  total?: number;
  more?: boolean;
  requests?: T[]
  proposals?: T[]
}