import { forwardRef, Module } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ThreadResolver } from './thread.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from './thread.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Thread]), AuthModule, forwardRef(() => UserModule)],
    providers: [ThreadService, ThreadResolver],
})
export class ThreadModule {}
