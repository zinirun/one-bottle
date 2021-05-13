import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { LoginGuard } from 'src/guards/login.guard';
import { Thread } from './thread.entity';
import { ThreadService } from './thread.service';

@Resolver()
export class ThreadResolver {
    constructor(private readonly threadService: ThreadService) {}

    @UseGuards(LoginGuard)
    @Query(() => Thread)
    getThread(@Args('id') id: string): Promise<Thread> {
        return this.threadService.getOne(id);
    }
}
