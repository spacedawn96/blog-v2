import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetUserInfoResponse {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;
}
