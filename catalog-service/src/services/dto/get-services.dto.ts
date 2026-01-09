import { PaginationDto } from "src/common/pagination/pagination.dto";

export class GetServiceDto extends PaginationDto {
    search: string;
}