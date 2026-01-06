import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto, CreateUserProfileDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt'
import { GetUserProfileDto } from './dto/get-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ){}

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async createUser(createAuthDto: CreateAuthDto) {
    const { email, password, roles } = createAuthDto;
    const hashedPassword =  await this.hashPassword(password);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        roles,
      },
    });

    return user;
  }

  async signIn (email: string, password: string): Promise<{ accessToken: string, roles: string[], user_id: string }> {
    const user = await this.prisma.user.findUnique({where: {email}});
    if (!user) {
      throw new UnauthorizedException('User with email not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { sub: user.id, email: user.email, roles: user.roles };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, roles: user.roles, user_id: user.id  };

  }

  async createUserProfile(createUserProfileDto: CreateUserProfileDto) {
    const user_profile = await this.prisma.userProfile.create({
      data: createUserProfileDto,
    })
    return user_profile;
  }

  async getAllUserProfiles() {
    const profiles = await this.prisma.userProfile.findMany();
    return profiles;
  }

  async getUserProfile(id: string): Promise<any> {
    console.log('Fetching profile for user ID:', id);
    const profile = await this.prisma.userProfile.findUnique({
      where: { user_id: id },
    });
    return profile;
  }

  async updateUserProfile(id: string, updateUserProfile: UpdateUserProfileDto) {
    const updatedProfile = await this.prisma.userProfile.update({
      where: { user_id: id },
      data: updateUserProfile,
    });
    return updatedProfile;
  }

  async deleteUserProfile(id: string) {
    const deletedProfile = await this.prisma.userProfile.delete({
      where: { user_id: id },
    });
    return deletedProfile;
  }
}
