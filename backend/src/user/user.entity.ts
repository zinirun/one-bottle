import { Field, ObjectType } from '@nestjs/graphql';
import { TeamMember } from 'src/team/team.member.entity';
import { DateScalar } from 'src/scalars/date';
import { Thread } from 'src/thread/thread.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType({ description: 'User of overall service from OAuth' })
export class User {
    @Field(() => Number, { description: "User's ID (PK)" })
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String, { description: 'OAuth2 Provider' })
    @Column()
    provider: string;

    @Field(() => String, { description: "OAuth2 Provider's id" })
    @Column()
    providerId: string;

    @Field(() => String, { description: "User's Email Address" })
    @Column()
    email: string;

    @Field(() => String, { description: "User's name from OAuth, can be 'Anonymous'" })
    @Column()
    username: string;

    @Field(() => String, { description: "S3 URL of User's profile image" })
    @Column()
    profileImage: string;

    @OneToMany(() => TeamMember, (teamMember) => teamMember.teams)
    teams: TeamMember[];

    @OneToMany(() => Thread, (thread) => thread.author)
    threads: Thread[];

    /**
     * DB insert time.
     */
    @Field(() => DateScalar)
    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

    /**
     * DB last update time.
     */
    @Field(() => DateScalar)
    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;
}
