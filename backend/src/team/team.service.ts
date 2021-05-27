import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { TeamCreateInput } from './team.inputs';
import { TeamMember } from './team.member.entity';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
        @InjectRepository(TeamMember)
        private readonly teamMemberRepository: Repository<TeamMember>,
    ) {}

    public async getOne(id: string): Promise<Team> {
        return this.teamRepository.findOne(id, {
            relations: ['members', 'members.users'],
            where: {
                isDeleted: false,
            },
        });
    }

    public async create(user: User, team: TeamCreateInput): Promise<Team> {
        try {
            // save team
            const result: Team = await this.teamRepository.save({ ...team, master: user });
            // save master to team's member
            await this.join(user, result);
            return await this.getOne(result.id);
        } catch (err) {
            console.error(err);
            throw new ConflictException(err);
        }
    }

    public async join(user: User, team: Team): Promise<Team> {
        await this.teamMemberRepository.save({
            ...team,
            ...user,
        });
        return team;
    }
}
