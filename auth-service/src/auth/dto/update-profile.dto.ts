import { PartialType } from '@nestjs/swagger';
import { CreateAuthDto, CreateUserProfileDto } from './create-auth.dto';

export class UpdateUserProfileDto extends PartialType(CreateUserProfileDto) {}
