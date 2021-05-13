import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Thread } from './thread.entity';

@Injectable()
export class ThreadService {
    constructor(
        @InjectRepository(Thread)
        private readonly threadRepository: Repository<Thread>,
    ) {}

    public async getOne(id: string): Promise<Thread> {
        return this.threadRepository.findOne(id);
    }
}
