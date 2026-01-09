import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category, CategoryResponse } from './types';
import { GetCategoryDto } from './dto/get-category.dto';
import { paginate } from 'src/common/pagination/paginate';
import Fuse from 'fuse.js';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService){}
  
  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = await this.prisma.category.create({
      data: createCategoryDto,
    });
    return category;
  }

 async getAllCategories({ search, limit, page }: GetCategoryDto): Promise<any> {
    if (!page) page = 1;
    if (!limit) limit = 10;

    const totalCategories = await this.prisma.category.count();
    const totalPages = Math.ceil(totalCategories / limit);
    const url = 'categories';

    const pagination = paginate(totalPages, page, limit, totalCategories, url);
    const categories = await this.prisma.category.findMany({
      skip: Number((page - 1) * limit),
      take: Number(limit),
      orderBy: {
        createdAt: 'desc',
      },
    });

    const options = {
      keys: ['name', "description"],
      threshold: 0.3,
    };

    const fuse = new Fuse(categories, options);
    if (search) {
      const result = fuse.search(search);
      const filteredCategories = result.map((category) => category.item);
      return {
        data: filteredCategories,
        ...pagination,
      };
    }

    return {
      data: categories,
      ...pagination,
    };
  }


  async getCategoryById(id: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    })
    return category;
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category =  await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
    return category;
  }

  async deleteCategory(id: string): Promise<Category> {
    const category = await this.prisma.category.delete({
      where: { id },
    });
    return category;
  }
}
