import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Team } from 'src/team/team.entity';
import { DateScalar } from 'src/scalars/date';
import { User } from 'src/user/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

@Entity()
@ObjectType({ description: 'Thread means one message in Team' })
export class Thread {
    @Field(() => ID, { description: "Thread's UUID" })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => Boolean, { description: 'is Thread closed' })
    @Column({ default: false })
    isClosed: boolean;

    @Field(() => String, { description: "Thread's type" })
    @Column({
        length: 20,
    })
    type: string;

    @Field(() => String, { description: "Thread's result (JSON)" })
    @Column('text')
    result: string;

    @Field(() => User, { description: 'author of Thread' })
    @ManyToOne(() => User, (user) => user.threads)
    @JoinColumn()
    author: User;

    @ManyToOne(() => Team, (team) => team.threads)
    @JoinColumn()
    team: Team;

    /**
     * Delete Flag
     */
    @Column({ default: false })
    isDeleted: boolean;

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
