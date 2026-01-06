
import { ApiProperty } from "@nestjs/swagger";

import { IsOptional, IsString } from "class-validator";

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}

export enum Role {
    CUSTOMER = 'CUSTOMER',
    ADMIN = 'ADMIN',
    CLEANER = 'CLEANER',
}

export class CreateAuthDto {
    @ApiProperty({example: 'customer@example.com'})
    @IsString()
    email: string;

    @ApiProperty({example: 'strongPassword123!'})
    @IsString()
    password: string

    @ApiProperty({example: [Role.CUSTOMER], enum: Role, isArray: true})
    @IsOptional()
    @IsString({ each: true })
    roles: Role[];
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

    @ApiProperty({example: 'https://example.com/avatar.jpg', required: false})
    @IsOptional()
    @IsString()
    avatar_url?: string;
}