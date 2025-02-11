import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }
}
