import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @IsNotEmpty()
  @Field(type => String, { nullable: true })
  name: number;

  @IsEmail()
  @IsNotEmpty()
  @Field(type => String, { nullable: true })
  email: string;
}
