import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateServiceDto {
    @ApiProperty({example: 'category-id-123'})
    category_id: string;

    @ApiProperty({example: 'House Cleaning'})
    @IsString()
    name: string;

    @ApiProperty({example: 'Comprehensive house cleaning service'})
    @IsString()
    description?: string;

    @ApiProperty({example: 99.99})
    @IsString()
    price: number;

    @ApiProperty({example: 60})
    @IsString()
    duration?: number;

    @ApiProperty({example: true})
    @IsString()
    is_active?: boolean;
}
