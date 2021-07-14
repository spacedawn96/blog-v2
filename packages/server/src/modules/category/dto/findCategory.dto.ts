import {
  ArgsType,
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  PickType,
} from '@nestjs/graphql';

@ArgsType()
export class FindCategoryRequest {
  @Field()
  label?: string;

  @Field()
  value?: string;
}
