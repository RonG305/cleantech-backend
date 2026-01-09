import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({example: 'Residential Cleaning'})
    @IsString()
    name: string;

    @ApiProperty({example: 'Category for residential cleaning services', required: false})
    @IsString()
    description?: string;

    @ApiProperty({example: 'https://example.com/icon.png', required: false})
    @IsString()
    icon?: string;

    @ApiProperty({example: true, required: false})
    @IsBoolean()
    is_active?: boolean;
}


