import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  email!: string;
  password!: string;
}
