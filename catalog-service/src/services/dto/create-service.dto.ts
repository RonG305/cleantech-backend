import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateServiceDto {
    @ApiProperty({example: 'category-id-123'})
    category_id: string;

    @ApiProperty({example: 'provider-id-456'})
    provider_id?: string;

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

    @ApiProperty({example: 10})
    @IsNumber()
    discount_percentage?: number;

    @ApiProperty({example: true})
    @IsBoolean()
    is_active?: boolean;
}


// model Service {
//   id                String                    @id @default(cuid())
//   category_id       String
//   provider_id       String?
//   name              String
//   description       String?
//   base_price        Float
//   duration          Int?
//   discount_percentage Float?                    @default(0)
//   is_active         Boolean                   @default(false)
//   createdAt         DateTime                  @default(now())
//   updatedAt         DateTime                  @updatedAt
//   category          Category                  @relation(fields: [category_id], references: [id])
// }
