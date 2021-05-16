import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Team } from './team.entity';
import { TeamMember } from './team.member.entity';
import { TeamService } from './team.service';
import { TeamResolver } from './team.resolver';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Team, TeamMember]),
        AuthModule,
        forwardRef(() => UserModule),
    ],
    providers: [TeamService, TeamResolver],
})
export class TeamModule {}
