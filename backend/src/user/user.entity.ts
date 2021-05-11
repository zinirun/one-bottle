import { Field, ObjectType } from '@nestjs/graphql';
import { BottleMember } from 'src/bottle/bottle.member.entity';
import { DateScalar } from 'src/scalars/date';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    provider: string;

    @Field(() => String)
    @Column()
    providerId: string;

    @Field(() => String)
    @Column()
    email: string;

    @Field(() => String)
    @Column()
    username: string;

    /**
     * Profile Image: S3 Address
     */
    @Field(() => String)
    @Column()
    profileImage: string;

    @OneToMany(() => BottleMember, (bottleMember) => bottleMember.bottles)
    bottles: BottleMember[];

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
