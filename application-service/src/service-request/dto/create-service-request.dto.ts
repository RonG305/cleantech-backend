import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateServiceRequestDto {
    @ApiProperty({example: 'service123', description: 'ID of the service being requested' })
    @IsString()
    service_id: string;

    @ApiProperty({example: 'user456', description: 'ID of the user making the request' })
    @IsString()
    user_id: string;

    @ApiProperty({example: 'provider789', description: 'ID of the service provider (optional)' })
    @IsString()
    provider_id?: string;

    @ApiProperty({example: '{}', description: 'Additional services or options in JSON format (optional)' })
    services?: Record<string, any>;

    @ApiProperty({ example: 'pending', description: 'Status of the service request' })
    @IsString()
    status?: string;

    @ApiProperty({title: 'Service frequency', description: 'Frequency of the service (e.g., one-time, weekly, monthly)', example: 'one-time' })
    @IsString()
    frequency?: string;

    @ApiProperty({example: '2024-06-01T10:00:00Z', description: 'Scheduled date and time for the service (optional)' })
    scheduled_at?: Date;
}

