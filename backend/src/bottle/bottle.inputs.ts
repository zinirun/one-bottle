import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BottleCreateInput {
    @Field(() => String)
    readonly name!: string;
}
