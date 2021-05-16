import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DateScalar } from 'src/scalars/date';
import { Thread } from 'src/thread/thread.entity';
import { User } from 'src/user/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { TeamMember } from './team.member.entity';

@Entity()
@ObjectType({ description: 'Team means a group of members' })
export class Team {
    @Field(() => ID, { description: "Bottle's UUID" })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String, { description: "Bottle's name" })
    @Column()
    name: string;

    @OneToMany(() => TeamMember, (teamMember) => teamMember.teams)
    members: TeamMember[];

    @Field(() => User, { description: 'master of group' })
    @ManyToOne(() => User, (user) => user.bottles)
    @JoinColumn()
    master: User;

    @OneToMany(() => Thread, (thread) => thread.team)
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
