import { Field, ObjectType } from '@nestjs/graphql';
import { DateScalar } from 'src/scalars/date';
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Bottle {
    @Field(() => Number)
    @ObjectIdColumn()
    id: number;

    @Field(() => String)
    @Column()
    bottleName: string;

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
