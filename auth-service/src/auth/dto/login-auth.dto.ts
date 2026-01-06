import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({example: 'customer@example.com'})
    @IsString()
    email: string;
    @ApiProperty({example: 'strongPassword123!'})
    @IsString()
    password: string;
}