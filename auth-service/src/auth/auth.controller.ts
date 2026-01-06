import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, CreateUserProfileDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { AuthGuard } from './auth.gurads';
import { UpdateUserProfileDto } from './dto/update-profile.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create-user')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.createUser(createAuthDto);
  }

  @Post('login')
  signIn(@Body() body : LoginDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('create-profile')
  @UseGuards(AuthGuard)
  createUserProfile(@Body() createUserProfileDto: CreateUserProfileDto) {
    return this.authService.createUserProfile(createUserProfileDto);
  }

  @Get('profiles')
  findAll() {
    return this.authService.getAllUserProfiles();
  }

  @UseGuards(AuthGuard)
  @Get('profile/:id')
  findOne(@Param('id') id: string) {
    return this.authService.getUserProfile(id);
  }

  @Patch('profile/:id')
  updateProfile(@Param('id') id: string, @Body() updateUserProfileDto: UpdateUserProfileDto) {
    return this.authService.updateUserProfile(id, updateUserProfileDto);
  }

  @Delete('profile/:id')
  deleteProfile(@Param('id') id: string) {
    return this.authService.deleteUserProfile(id);
  }
}
