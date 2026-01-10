import { PaginationDto } from "src/common/pagination/pagination.dto";

export class GetServiceRequestDto extends PaginationDto {
    search: string;
}