import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { TeamCreateInput } from './team.inputs';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
    ) {}

    public async getOne(id: string): Promise<Team> {
        return this.teamRepository.findOne(id, {
            relations: ['members', 'members.users'],
        });
    }

    public async create(user: User, team: TeamCreateInput): Promise<Team> {
        try {
            const { id } = await this.teamRepository.save({ ...team, master: user });
            return await this.getOne(id);
        } catch (err) {
            throw new ConflictException(err);
        }
    }
}
