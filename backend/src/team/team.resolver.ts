import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginGuard } from 'src/guards/login.guard';
import { GetUser } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { Team } from './team.entity';
import { TeamCreateInput } from './team.inputs';
import { TeamService } from './team.service';

@Resolver()
export class TeamResolver {
    constructor(private readonly teamService: TeamService) {}

    @UseGuards(LoginGuard)
    @Query(() => Team)
    getTeam(@Args('id') id: string): Promise<Team> {
        return this.teamService.getOne(id);
    }

    @UseGuards(LoginGuard)
    @Mutation(() => Team)
    createTeam(@GetUser() user: User, @Args('team') team: TeamCreateInput): Promise<Team> {
        return this.teamService.create(user, team);
    }
}
