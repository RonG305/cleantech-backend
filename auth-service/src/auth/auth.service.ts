import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto, CreateUserProfileDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserProfileDto } from './dto/update-profile.dto';
import { paginate } from 'src/common/pagination/paginate';
import Fuse from 'fuse.js';
import { GetUsersDto } from './dto/get-users.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async createUser(createAuthDto: CreateAuthDto) {
    const { email, password, roles } = createAuthDto;
    const hashedPassword = await this.hashPassword(password);

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new UnauthorizedException('User with this email already exists');
    }

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        roles,
      },
    });

    return user;
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; roles: string[]; user_id: string }> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User with email not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { sub: user.id, email: user.email, roles: user.roles };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, roles: user.roles, user_id: user.id };
  }

  async getAllUsers({ search, limit, page }: GetUsersDto) {
    if (!page) page = 1;
    if (!limit) limit = 10;

    const totalUsers = await this.prisma.user.count();
    const totalPages = Math.ceil(totalUsers / limit);
    const url = 'users';

    const pagination = paginate(totalPages, page, limit, totalUsers, url);
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        roles: true,
        account_type: true,
        company_name: true,
        company_website: true,
        company_registration_number: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      skip: Number((page - 1) * limit),
      take: Number(limit),
      orderBy: {
        createdAt: 'desc',
      },
    });

    const options = {
      keys: ['email'],
      threshold: 0.3,
    };

    const fuse = new Fuse(users, options);
    if (search) {
      const result = fuse.search(search);
      const filteredUsers = result.map((user) => user.item);
      return {
        data: filteredUsers,
        ...pagination,
      };
    }

    return {
      data: users,
      ...pagination,
    };
  }

  async createUserProfile(createUserProfileDto: CreateUserProfileDto) {
    const user_profile = await this.prisma.userProfile.create({
      data: createUserProfileDto,
    });
    return user_profile;
  }

  async getAllUserProfiles() {
    const profiles = await this.prisma.userProfile.findMany();
    return profiles;
  }

  async getUserProfile(id: string): Promise<any> {
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
