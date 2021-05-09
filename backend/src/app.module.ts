import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DateScalar } from './scalars/date';
import { BottleModule } from './bottle/bottle.module';

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
        BottleModule,
    ],
    providers: [DateScalar],
})
export class AppModule {}
