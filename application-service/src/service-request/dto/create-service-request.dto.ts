import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsString } from "class-validator";

enum ServiceRequestStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

enum ServiceFrequency {
    ONE_TIME = 'one-time',
    WEEKLY = 'weekly',
    BI_WEEKLY = 'bi-weekly',
    MONTHLY = 'monthly',
}

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

    @ApiProperty(
        {example: '[ { "name": "RLaundry Cleaning", "description": "Comprehensive laundry cleaning services", "base_price": 200, "duration": 60 }]', 
            description: 'Additional services or options in JSON format (optional)' 
        })
    @IsArray()
    services?: Record<string, any>[];

    @ApiProperty({ example: 'pending', description: 'Status of the service request' })
    @IsEnum(ServiceRequestStatus)
    status?: ServiceRequestStatus;

    @ApiProperty({title: 'Service frequency', description: 'Frequency of the service (e.g., one-time, weekly, monthly)', example: 'one-time' })
    @IsEnum(ServiceFrequency)
    frequency?: ServiceFrequency;

    @ApiProperty({example: '2024-06-01T10:00:00Z', description: 'Scheduled date and time for the service (optional)' })
    scheduled_at?: Date;
}

