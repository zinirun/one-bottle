import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginGuard } from 'src/guards/login.guard';
import { GetUser } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { Bottle } from './bottle.entity';
import { BottleCreateInput } from './bottle.inputs';
import { BottleService } from './bottle.service';

@Resolver()
export class BottleResolver {
    constructor(private readonly bottleService: BottleService) {}

    @UseGuards(LoginGuard)
    @Query(() => Bottle)
    getBottle(@Args('id') id: string): Promise<Bottle> {
        return this.bottleService.getOne(id);
    }

    @UseGuards(LoginGuard)
    @Mutation(() => Bottle)
    createBottle(
        @GetUser() user: User,
        @Args('bottle') bottle: BottleCreateInput,
    ): Promise<Bottle> {
        return this.bottleService.create(user, bottle);
    }
}
