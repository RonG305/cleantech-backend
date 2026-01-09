import { Pagination } from "src/types";

export type Category = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryResponse = {
    data: Category[];
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
