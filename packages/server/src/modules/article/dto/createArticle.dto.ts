import { IsDefined, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateArticleRequest {
  @Field(type => String)
  @IsNotEmpty()
  title: string;

  @Field(type => [Int])
  @IsNotEmpty()
  tags: number[];

  @Field(type => Int)
  @IsNotEmpty()
  category: number;

  @Field()
  @IsNotEmpty()
  status: string;
}
