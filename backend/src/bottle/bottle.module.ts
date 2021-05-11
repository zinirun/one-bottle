import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Bottle } from './bottle.entity';
import { BottleMember } from './bottle.member.entity';
import { BottleService } from './bottle.service';

@Module({
    imports: [TypeOrmModule.forFeature([Bottle, BottleMember]), forwardRef(() => UserModule)],
    providers: [BottleService],
})
export class BottleModule {}
