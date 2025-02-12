import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// const MAX_LENGTH = 16;
// const MIN_LENGTH = 6;

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
