import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
export enum Gender {
    MALE = 'MALE',  
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}

export class CreateUserProfileDto {
    @ApiProperty({example: 'user-id-123'})
    @IsString()
    user_id: string;

    @ApiProperty({example: 'John'})
    @IsString()
    first_name: string;

    @ApiProperty({example: 'Doe'})
    @IsString()
    last_name: string;

    @ApiProperty({example: '+1234567890', required: false})
    @IsOptional()
    @IsString()
    phone_number?: string;

    @ApiProperty({example: 'A brief bio about the user.', required: false})
    @IsOptional()
    @IsString()
    bio?: string;

    @ApiProperty({example: Gender.MALE, enum: Gender, required: false})
    @IsOptional()
    @IsString() 
    gender?: Gender;
}