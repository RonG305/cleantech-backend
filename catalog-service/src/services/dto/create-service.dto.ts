import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

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
    @IsNumber()
    base_price: number;

    @ApiProperty({example: 60})
    @IsNumber()
    duration?: number;

    @ApiProperty({example: true})
    @IsBoolean()
    is_active?: boolean;
}
