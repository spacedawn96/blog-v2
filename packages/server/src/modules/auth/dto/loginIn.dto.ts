import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class LoginRequest {
  @IsNotEmpty()
  name: number;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
