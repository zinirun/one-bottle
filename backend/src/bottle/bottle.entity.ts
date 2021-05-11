import { Field, ObjectType } from '@nestjs/graphql';
import { DateScalar } from 'src/scalars/date';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    UpdateDateColumn,
} from 'typeorm';
import { BottleMember } from './bottle.member.entity';

@Entity()
@ObjectType()
export class Bottle {
    @Field(() => Number)
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Field(() => String)
    @Column()
    name: string;

    @OneToMany(() => BottleMember, (bottleMember) => bottleMember.bottles)
    members: BottleMember[];

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
