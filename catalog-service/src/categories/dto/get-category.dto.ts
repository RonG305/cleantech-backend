import { PaginationDto } from "src/common/pagination/pagination.dto";

export class GetCategoryDto extends PaginationDto {
    search: string;
}