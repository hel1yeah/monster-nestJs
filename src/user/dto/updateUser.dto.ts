import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

const MAX_LENGTH = 16;
const MIN_LENGTH = 6;

export class UpdateUserDto {
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly bio: string;

  @IsString()
  readonly image: string;

  @IsString()
  @IsNotEmpty()
  @Length(MIN_LENGTH, MAX_LENGTH)
  readonly password: string;
}
