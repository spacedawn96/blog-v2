import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { dateFormat } from '../../utils/date.util';
import { TagService } from '../tag/tag.service';
import { CategoryService } from '../category/category.service';
import { extractProtectedPostContent } from './postContent.util';
import { PostContent } from './postContent.entity';

const Segment = require('segment');
const segment = new Segment();
segment.useDefault();

@Injectable()
export class PostContentService {
  constructor(
    @InjectRepository(PostContent)
    private readonly postContentRepository: Repository<PostContent>,
    private readonly tagService: TagService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(postContent: Partial<PostContent>): Promise<PostContent> {
    const { title } = postContent;
    const exist = await this.postContentRepository.findOne({ where: { title } });

    if (exist) {
      throw new HttpException('Title already exists.', HttpStatus.BAD_REQUEST);
    }

    let { tags, category, status } = postContent;

    if (status === 'publish') {
      Object.assign(postContent, {
        publishAt: dateFormat(),
      });
    }

    tags = await this.tagService.findByIds(('' + tags).split(','));
    const existCategory = await this.categoryService.findById(category);
    const newPostContent = await this.postContentRepository.create({
      ...postContent,
      category: existCategory,
      tags,
      needPassword: !!postContent.password,
    });
    await this.postContentRepository.save(newPostContent);
    return newPostContent;
  }

  async findAll(queryParams): Promise<[PostContent[], number]> {
    const query = this.postContentRepository
      .createQueryBuilder('postContent')
      .leftJoinAndSelect('postContent.tags', 'tag')
      .leftJoinAndSelect('postContent.category', 'category')
      .orderBy('postContent.publishAt', 'DESC');

    const { page = 1, pageSize = 12, status, ...otherParams } = queryParams;

    query.skip((+page - 1) * +pageSize);
    query.take(+pageSize);

    if (status) {
      query.andWhere('postContent.status=:status').setParameter('status', status);
    }

    if (otherParams) {
      Object.keys(otherParams).forEach(key => {
        query
          .andWhere(`postContent.${key} LIKE :${key}`)
          .setParameter(`${key}`, `%${otherParams[key]}%`);
      });
    }

    const [data, total] = await query.getManyAndCount();

    data.forEach((d: any) => {
      if (d.needPassword) {
        extractProtectedPostContent(d);
      }
    });

    return [data, total];
  }

  async findPostContentsByCategory(category, queryParams) {
    const query = this.postContentRepository
      .createQueryBuilder('postContent')
      .leftJoinAndSelect('postContent.category', 'category')
      .where('category.value=:value', { value: category })
      .orderBy('postContent.publishAt', 'DESC');

    const { page = 1, pageSize = 12, status } = queryParams;
    query.skip((+page - 1) * +pageSize);
    query.take(+pageSize);

    if (status) {
      query.andWhere('postContent.status=:status').setParameter('status', status);
    }

    const [data, total] = await query.getManyAndCount();

    data.forEach(d => {
      if (d.needPassword) {
        extractProtectedPostContent(d);
      }
    });

    return [data, total];
  }

  async findPostContentsByTag(tag, queryParams) {
    const query = this.postContentRepository
      .createQueryBuilder('postContent')
      .innerJoinAndSelect('postContent.tags', 'tag', 'tag.value=:value', {
        value: tag,
      })
      .orderBy('postContent.publishAt', 'DESC');

    const { page = 1, pageSize = 12, status } = queryParams;
    query.skip((+page - 1) * +pageSize);
    query.take(+pageSize);

    if (status) {
      query.andWhere('postContent.status=:status').setParameter('status', status);
    }

    const [data, total] = await query.getManyAndCount();

    data.forEach(d => {
      if (d.needPassword) {
        extractProtectedPostContent(d);
      }
    });

    return [data, total];
  }

  async getRecommendPostContents() {
    const data = await this.postContentRepository.find({
      where: { isRecommended: true },
      order: { publishAt: 'DESC' },
    });

    return data.filter(d => !d.needPassword);
  }

  async getArchives(): Promise<{ [key: string]: PostContent[] }> {
    const data = await this.postContentRepository.find({
      where: { status: 'publish' },
      order: { publishAt: 'DESC' },
    });
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const ret = {};
    data.forEach(d => {
      const year = new Date(d.publishAt).getFullYear();
      const month = new Date(d.publishAt).getMonth();
      if (d.needPassword) {
        extractProtectedPostContent(d);
      }
      if (!ret[year]) {
        ret[year] = {};
      }
      if (!ret[year][months[month]]) {
        ret[year][months[month]] = [];
      }
      ret[year][months[month]].push(d);
    });

    return ret;
  }

  async checkPassword(id, { password }): Promise<{ pass: boolean }> {
    const data = await this.postContentRepository
      .createQueryBuilder('postContent')
      .where('postContent.id=:id')
      .andWhere('postContent.password=:password')
      .setParameter('id', id)
      .setParameter('password', password)
      .getOne();

    const pass = !!data;
    return pass ? { pass: !!data, ...data } : { pass: false };
  }

  async findById(id, status = null, isAdmin = false): Promise<PostContent> {
    const query = this.postContentRepository
      .createQueryBuilder('postContent')
      .leftJoinAndSelect('postContent.category', 'category')
      .leftJoinAndSelect('postContent.tags', 'tags')
      .where('postContent.id=:id')
      .orWhere('postContent.title=:title')
      .setParameter('id', id)
      .setParameter('title', id);

    if (status) {
      query.andWhere('postContent.status=:status').setParameter('status', status);
    }

    const data = await query.getOne();

    if (data && data.needPassword && !isAdmin) {
      extractProtectedPostContent(data);
    }

    return data;
  }

  async updateById(id, postContent: Partial<PostContent>): Promise<PostContent> {
    const oldPostContent = await this.postContentRepository.findOne(id);
    let { tags, category, status } = postContent; // eslint-disable-line prefer-const

    if (tags) {
      tags = await this.tagService.findByIds(('' + tags).split(','));
    }

    const existCategory = await this.categoryService.findById(category);

    const newPostContent = {
      ...postContent,
      views: oldPostContent.views,
      category: existCategory,
      needPassword: !!postContent.password,
      publishAt:
        oldPostContent.status === 'draft' && status === 'publish'
          ? dateFormat()
          : oldPostContent.publishAt,
    };

    if (tags) {
      Object.assign(newPostContent, { tags });
    }

    const updatedPostContent = await this.postContentRepository.merge(
      oldPostContent,
      newPostContent,
    );
    return this.postContentRepository.save(updatedPostContent);
  }

  async updateViewsById(id): Promise<PostContent> {
    const oldPostContent = await this.postContentRepository.findOne(id);
    const updatedPostContent = await this.postContentRepository.merge(oldPostContent, {
      views: oldPostContent.views + 1,
    });
    return this.postContentRepository.save(updatedPostContent);
  }

  async updateLikesById(id, type): Promise<PostContent> {
    const oldPostContent = await this.postContentRepository.findOne(id);
    const updatedpostContent = await this.postContentRepository.merge(oldPostContent, {
      likes: type === 'like' ? oldPostContent.likes + 1 : oldPostContent.likes - 1,
    });
    return this.postContentRepository.save(updatedpostContent);
  }

  async deleteById(id) {
    const postContent = await this.postContentRepository.findOne(id);
    return this.postContentRepository.remove(postContent);
  }

  async search(keyword) {
    const res = await this.postContentRepository
      .createQueryBuilder('postContent')
      .where('postContent.title LIKE :keyword')
      .orWhere('postContent.summary LIKE :keyword')
      .orWhere('postContent.content LIKE :keyword')
      .setParameter('keyword', `%${keyword}%`)
      .getMany();

    return res;
  }

  async recommend(postContentId = null) {
    const query = this.postContentRepository
      .createQueryBuilder('postContent')
      .orderBy('postContent.publishAt', 'DESC')
      .leftJoinAndSelect('postContent.category', 'category')
      .leftJoinAndSelect('postContent.tags', 'tags');

    if (!postContentId) {
      query.where('postContent.status=:status').setParameter('status', 'publish');
      return query.take(6).getMany();
    }
    const sub = this.postContentRepository
      .createQueryBuilder('postContent')
      .orderBy('postContent.publishAt', 'DESC')
      .leftJoinAndSelect('postContent.category', 'category')
      .leftJoinAndSelect('postContent.tags', 'tags')
      .where('postContent.id=:id')
      .setParameter('id', postContentId);
    const exist = await sub.getOne();

    if (!exist) {
      return query.take(6).getMany();
    }

    const { title, summary } = exist;

    try {
      const kw1 = segment.doSegment(title, {
        stripStopword: true,
      });
      const kw2 = segment.doSegment(summary, {
        stripStopword: true,
      });

      kw1.forEach((kw, i) => {
        const paramKey = `title_` + i;
        if (i === 0) {
          query.where(`postContent.title LIKE :${paramKey}`);
        } else {
          query.orWhere(`postContent.title LIKE :${paramKey}`);
        }
        query.setParameter(paramKey, `%${kw.w}%`);
      });

      kw2.forEach((kw, i) => {
        const paramKey = `summary_` + i;
        if (!kw1.length) {
          query.where(`postContent.summary LIKE :${paramKey}`);
        } else {
          query.orWhere(`postContent.summary LIKE :${paramKey}`);
        }
        query.setParameter(paramKey, `%${kw.w}%`);
      });
    } catch (e) {} // eslint-disable-line no-empty

    const data = await query.getMany();
    return data.filter(d => d.id !== postContentId && d.status === 'publish');
  }
}
