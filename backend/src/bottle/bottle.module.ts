import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Bottle } from './bottle.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Bottle]), forwardRef(() => UserModule)],
})
export class BottleModule {}
