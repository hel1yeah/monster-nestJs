import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserResponseInterface } from './types/userResponse.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { config } from 'dotenv';
import { UpdateUserDto } from './dto/updateUser.dto';
import { log } from 'console';
config();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    const userByUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email or username already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  async getUserWithPassword(email: string): Promise<UserEntity | null> {
    const userWithPassword = await this.userRepository.findOne({
      where: { email: email },
      select: ['id', 'email', 'bio', 'image', 'username', 'password'],
    });

    if (!userWithPassword) {
      throw new HttpException('Credentials not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return userWithPassword;
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.getUserWithPassword(loginUserDto.email);

    if (!user) {
      throw new HttpException('Credentials not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const isCredentialsValid = await compare(loginUserDto.password, user.password);

    if (!isCredentialsValid) {
      throw new HttpException('Credentials not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    delete user.password;
    return user;
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    userJWT: UserEntity,
  ): Promise<UserEntity> {
    const user = await this.getUserWithPassword(userJWT.email);
    if (!user) {
      throw new HttpException('Credentials not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const isCredentialsValid = await compare(updateUserDto.password, user.password);

    if (!isCredentialsValid) {
      throw new HttpException("Password isn't valid", HttpStatus.BAD_REQUEST);
    }

    Object.assign(user, {
      username: updateUserDto.username,
      email: updateUserDto.email,
      bio: updateUserDto.bio,
      image: updateUserDto.image,
    });
    delete user.password;
    return await this.userRepository.save(user);
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNRECOVERABLE_ERROR);
    }

    return user;
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
