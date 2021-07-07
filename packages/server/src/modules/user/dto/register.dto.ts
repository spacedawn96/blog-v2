import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class RegisterRequestDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  email: string;
}

@ObjectType()
export class RegisterResponseDto {
  @Field()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Field(_type => String, { nullable: true })
  @IsString()
  password: string;
}
