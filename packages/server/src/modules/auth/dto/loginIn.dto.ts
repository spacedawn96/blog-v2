import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ObjectType, Field, InputType, Int } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @IsNotEmpty()
  @Field(type => Int)
  id: number;

  @IsNotEmpty()
  @Field(type => String)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Field(type => String)
  email: string;

  @IsNotEmpty()
  @Field(type => String)
  token: string;
}

@InputType()
export class LoginRequest {
  @IsNotEmpty()
  @Field(type => String)
  name: string;

  @IsNotEmpty()
  @Field(type => String)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @Field(type => String)
  email: string;
}
