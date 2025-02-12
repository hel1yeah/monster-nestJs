import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserResponseInterface } from './types/userResponse.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
import { compare } from 'bcrypt';
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

  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
      select: ['id', 'email', 'bio', 'image', 'username', 'password'],
    });

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

// async loginUser(loginUserDto: LoginUserDto): Promise<any> {
//   const user = await this.userRepository.findOne({
//     where: { email: loginUserDto.email },
//     select: ['id', 'email', 'bio', 'image', 'username', 'password'],
//   });

//   if (!user) {
//     throw new HttpException(
//       'Credentials are not valid',
//       HttpStatus.UNPROCESSABLE_ENTITY,
//     );
//   }

//   const isPasswordCorrect = await compare(loginUserDto.password, user.password);

//   if (!isPasswordCorrect) {
//     throw new HttpException(
//       'Credentials are not valid',
//       HttpStatus.UNPROCESSABLE_ENTITY,
//     );
//   }

//   delete user.password;
//   return user;
// }
