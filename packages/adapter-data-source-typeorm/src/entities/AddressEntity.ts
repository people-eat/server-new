import { type DataSource } from '@people-eat/server-domain';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity('Addresses')
export class AddressEntity implements DataSource.DBAddress {
    @PrimaryColumn('char', { length: 20 })
    addressId!: string;

    @Column('char', { length: 20 })
    userId!: string;

    @Column('varchar')
    title!: string;

    @Column('varchar')
    country!: string;

    @Column('varchar')
    city!: string;

    @Column('varchar')
    postCode!: string;

    @Column('varchar')
    street!: string;

    @Column('varchar')
    houseNumber!: string;

    @Column('float', { unsigned: true })
    latitude!: number;

    @Column('float', { unsigned: true })
    longitude!: number;

    @Column('datetime')
    createdAt!: Date;

    /* relations */

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.addresses, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user?: UserEntity;
}
