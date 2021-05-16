import { Field, ObjectType } from '@nestjs/graphql';
import { DateScalar } from 'src/scalars/date';
import { User } from 'src/user/user.entity';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { Team } from './team.entity';

@Entity()
@ObjectType()
export class TeamMember {
    @ManyToOne(() => Team, { primary: true })
    @JoinColumn({ name: 'team_id' })
    teams: Team[];

    @ManyToOne(() => User, { primary: true })
    @JoinColumn({ name: 'user_id' })
    users: User[];

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
