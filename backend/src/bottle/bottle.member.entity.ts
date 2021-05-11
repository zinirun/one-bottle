import { Field, ObjectType } from '@nestjs/graphql';
import { DateScalar } from 'src/scalars/date';
import { User } from 'src/user/user.entity';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { Bottle } from './bottle.entity';

@Entity()
@ObjectType()
export class BottleMember {
    @ManyToOne(() => Bottle, { primary: true })
    @JoinColumn({ name: 'group_id' })
    bottles: Bottle[];

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
