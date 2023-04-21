import { type DataSource } from '@people-eat/server-domain';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity('EmailAddressUpdates')
export class EmailAddressUpdateEntity implements DataSource.DBEmailAddressUpdate {
    @PrimaryColumn('char', { length: 20 })
    userId!: string;

    @Column('char', { length: 20 })
    secret!: string;

    @Column('varchar')
    emailAddress!: string;

    @Column('datetime')
    createdAt!: Date;

    /* relations */

    @OneToOne(() => UserEntity, (user: UserEntity) => user.emailAddressUpdate, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user?: UserEntity;
}
