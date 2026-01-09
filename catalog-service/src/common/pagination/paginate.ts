
import { BACKEND_URL } from "../constants";
import { PaginationDto } from "./pagination.dto";


export const paginate = (
  totalPages: number,
  page: number,
  limit: number,
  total: number,
  url?: string
): PaginationDto => {
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  const nextPage = hasNextPage ? Number(page) + 1 : null;
  const prevPage = hasPrevPage ? Number(page) - 1 : null;
  const pageCount = Math.ceil(total / limit);
  const prevPageUrl = hasPrevPage ? `${BACKEND_URL}/${url}?page=${prevPage}&limit=${limit}` : null;
  const nextPageUrl = hasNextPage ? `${BACKEND_URL}/${url}?page=${nextPage}&limit=${limit}` : null;

  return {
    total: Number(total),
    page: Number(page),
    limit: Number(limit),
    totalPages: Number(totalPages),
    hasNextPage: Boolean(hasNextPage),
    hasPrevPage: Boolean(hasPrevPage),
    nextPage: nextPage !== null ? Number(nextPage) : null,
    prevPage: prevPage !== null ? Number(prevPage) : null,
    pageCount: Number(pageCount),
    prevPageUrl: prevPageUrl ?? '',
    nextPageUrl: nextPageUrl ?? '',
    url: url ?? '',
  };
};
