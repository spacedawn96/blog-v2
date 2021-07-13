import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateArticleRequest {
  @Field(type => String)
  @IsNotEmpty()
  title: string;

  @Field(type => [String])
  @IsNotEmpty()
  tags: any[];

  @Field(type => String)
  @IsNotEmpty()
  category: any;

  @Field()
  @IsNotEmpty()
  status: string;
}
