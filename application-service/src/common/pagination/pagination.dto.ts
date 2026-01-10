export class PaginationDto {
   total: number;
   page?: number;
   limit?: number;
   totalPages: number;
   hasNextPage: boolean;
   hasPrevPage: boolean;
   nextPage: number | null;
   prevPage: number | null;
   pageCount: number;
   prevPageUrl: string | null;
   nextPageUrl: string | null;
   url?: string | null;
   data?: any[] | null;

}