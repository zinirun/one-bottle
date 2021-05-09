import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { BottleModule } from 'src/bottle/bottle.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => AuthModule),
        forwardRef(() => BottleModule),
    ],
    providers: [UserResolver, UserService],
    exports: [UserService],
})
export class UserModule {}
