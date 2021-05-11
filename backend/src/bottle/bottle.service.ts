import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Bottle } from './bottle.entity';
import { BottleCreateInput } from './bottle.inputs';

@Injectable()
export class BottleService {
    constructor(
        @InjectRepository(Bottle)
        private readonly bottleRepository: Repository<Bottle>,
    ) {}

    public async getOne(id: string): Promise<Bottle> {
        return this.bottleRepository.findOne(id, {
            relations: ['members', 'members.users'],
        });
    }

    public async create(user: User, bottle: BottleCreateInput): Promise<Bottle> {
        try {
            const { id } = await this.bottleRepository.save({ ...bottle, master: user });
            return await this.getOne(id);
        } catch (err) {
            throw new ConflictException(err);
        }
    }
}
