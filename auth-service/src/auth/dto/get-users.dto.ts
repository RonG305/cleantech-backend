import { PaginationDto } from "src/common/pagination/pagination.dto";

export class GetUsersDto extends PaginationDto {
    search: string;
}