import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(Category: Partial<Category>): Promise<Category> {
    const { label } = Category;
    const existCategory = await this.categoryRepository.findOne({
      where: { label },
    });

    if (existCategory) {
      throw new HttpException('Category already exists', HttpStatus.BAD_REQUEST);
    }

    const newCategory = await this.categoryRepository.create(Category);
    await this.categoryRepository.save(newCategory);
    return newCategory;
  }

  async findAll(queryParams): Promise<Category[]> {
    const { articleStatus } = queryParams;
    const qb = this.categoryRepository
      .createQueryBuilder('category')
      .orderBy('category.createAt', 'ASC');

    if (articleStatus) {
      qb.leftJoinAndSelect('category.articles', 'articles', 'articles.status=:status', {
        status: articleStatus,
      });
    } else {
      qb.leftJoinAndSelect('category.articles', 'articles');
    }

    const data = await qb.getMany();

    data.forEach(d => {
      Object.assign(d, { articleCount: d.articles.length });
      delete d.articles;
    });

    return data;
  }

  async findById(id): Promise<Category> {
    const data = await this.categoryRepository
      .createQueryBuilder('category')
      .where('category.id=:id')
      .orWhere('category.label=:id')
      .orWhere('category.value=:id')
      .setParameter('id', id)
      .getOne();

    return data;
  }

  async findByIds(ids): Promise<Array<Category>> {
    return this.categoryRepository.findByIds(ids);
  }

  async updateById(id, category: Partial<Category>): Promise<Category> {
    const oldCategory = await this.categoryRepository.findOne(id);
    const updatedCategory = await this.categoryRepository.merge(oldCategory, category);
    return this.categoryRepository.save(updatedCategory);
  }

  async deleteById(id) {
    try {
      const category = await this.categoryRepository.findOne(id);
      await this.categoryRepository.remove(category);
      return true;
    } catch (e) {
      throw new HttpException('something went to wrong', HttpStatus.BAD_REQUEST);
    }
  }
}
