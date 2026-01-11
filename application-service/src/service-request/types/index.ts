export interface Services {
 name: string;
 description?: string;
 base_price: number;
 duration?: number;

}

export type ServiceRequest = {
  id: string;
  service_id: string;
  user_id: string;
  provider_id: string | null;
  services: Services[];
  status: string;
  frequency: string | null;
  scheduled_at: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ServiceRequestResponse = {
    data: ServiceRequest[];
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