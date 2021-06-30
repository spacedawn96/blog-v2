import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordRequest {
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

export class UpdateUserinfoRequest {
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
