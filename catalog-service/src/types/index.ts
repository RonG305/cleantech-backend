export type Pagination = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
    pageCount: number;
    prevPageUrl: string;
    nextPageUrl: string;
    url: string;
}