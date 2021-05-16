import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TeamCreateInput {
    @Field(() => String)
    readonly name!: string;
}
