import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DateScalar } from './scalars/date';
import { TeamModule } from './team/team.module';
import { ThreadModule } from './thread/thread.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            context: ({ req }) => ({ req }),
            cors: {
                credentials: true,
                origin: true,
            },
        }),
        AuthModule,
        UserModule,
        TeamModule,
        ThreadModule,
    ],
    providers: [DateScalar],
})
export class AppModule {}
