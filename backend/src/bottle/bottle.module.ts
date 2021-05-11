import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Bottle } from './bottle.entity';
import { BottleMember } from './bottle.member.entity';
import { BottleService } from './bottle.service';
import { BottleResolver } from './bottle.resolver';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Bottle, BottleMember]),
        AuthModule,
        forwardRef(() => UserModule),
    ],
    providers: [BottleService, BottleResolver],
})
export class BottleModule {}
