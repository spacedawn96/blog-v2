import { Field, ID, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class FindCategoryRequest {
  @Field()
  label: string;

  @Field()
  value: string;
}
