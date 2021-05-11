import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bottle } from './bottle.entity';

@Injectable()
export class BottleService {
    constructor(
        @InjectRepository(Bottle)
        private readonly bottleRepository: Repository<Bottle>,
    ) {}

    public async findById(id: string): Promise<Bottle> {
        return this.bottleRepository.findOne(id, {
            relations: ['members', 'members.users'],
        });
    }
}
