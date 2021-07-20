import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { getRepository, Repository } from 'typeorm';
import { IsAdminOrUser, User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    const name = this.configService.get('ADMIN_USER', 'admin');
    const password = this.configService.get('ADMIN_PASSWD', 'admin');
    this.createUser({ name, password, role: IsAdminOrUser.ADMIN })
      .then(_ => {
        console.log('Administrator account created successfully');
      })
      .catch(_ => {
        console.log(`Administrator account already exists`);
      });
  }
  async findAll(): Promise<User[]> {
    const user = getRepository(User);
    const users = await user.find();

    return users;
  }

  async createUser(user: Partial<User>): Promise<User> {
    const { name, password } = user;

    if (!name || !password) {
      throw new HttpException(
        'Please enter your username and password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existUser = await this.userRepository.findOne({ where: { name } });

    if (existUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async login(user: Partial<User>): Promise<User> {
    const { name, password } = user;
    const existUser = await this.userRepository.findOne({ where: { name } });

    if (!existUser || !(await User.comparePassword(password, existUser.password))) {
      throw new HttpException(
        'Username or password went to wrong',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (existUser.status === 'locked') {
      throw new HttpException('User locked', HttpStatus.BAD_REQUEST);
    }

    return existUser;
  }
  async findById(id): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async updateById(id, user): Promise<User> {
    const oldUser = await this.userRepository.findOne(id);
    delete user.password;

    if (user.name && user.name !== oldUser.name) {
      const existUser = await this.userRepository.findOne({
        where: { name: user.name },
      });

      if (existUser) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
    }

    const newUser = await this.userRepository.merge(oldUser, user);
    return this.userRepository.save(newUser);
  }

  async updatePassword(id, user): Promise<User> {
    const existUser = await this.userRepository.findOne(id);
    const { oldPassword, newPassword } = user;

    if (!existUser || !(await User.comparePassword(oldPassword, existUser.password))) {
      throw new HttpException(
        'Username or password went to wrong',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashNewPassword = User.encryptPassword(newPassword);
    const newUser = await this.userRepository.merge(existUser, {
      password: hashNewPassword,
    });
    const saveUser = await this.userRepository.save(newUser);
    return saveUser;
  }
}
