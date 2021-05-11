import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DateScalar } from 'src/scalars/date';
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
import { BottleMember } from './bottle.member.entity';

@Entity()
@ObjectType({ description: 'Bottle means a group of members(users)' })
export class Bottle {
    @Field(() => ID, { description: "Bottle's UUID" })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String, { description: "Bottle's name" })
    @Column()
    name: string;

    @OneToMany(() => BottleMember, (bottleMember) => bottleMember.bottles)
    members: BottleMember[];

    @Field(() => User, { description: 'master of group' })
    @ManyToOne(() => User, (user) => user.bottles)
    @JoinColumn()
    master: User;

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
