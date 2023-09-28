import { Shared, type DataSource } from '@people-eat/server-domain';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { KitchenEntity } from './KitchenEntity';
import { UserEntity } from './UserEntity';

@Entity('GlobalBookingRequests')
export class GlobalBookingRequestEntity implements DataSource.DBGlobalBookingRequest {
    @PrimaryColumn('char', { length: 20 })
    globalBookingRequestId!: string;

    @Column('char', { length: 20 })
    userId!: string;

    @Column('smallint', { unsigned: true })
    amount!: number;

    @Column('enum', {
        enum: ['EUR', 'USD'],
        enumName: 'CurrencyCode',
    })
    currencyCode!: Shared.CurrencyCode;

    @Column('smallint', { unsigned: true })
    adultParticipants!: number;

    @Column('smallint', { unsigned: true })
    children!: number;

    @Column('datetime')
    dateTime!: Date;

    @Column('smallint', { unsigned: true })
    duration!: number;

    @Column('varchar')
    occasion!: string;

    @Column('text')
    message!: string;

    @Column('char', { length: 20, nullable: true })
    kitchenId?: string;

    @Column('float', { unsigned: true })
    latitude!: number;

    @Column('float', { unsigned: true })
    longitude!: number;

    @Column('varchar')
    locationText!: string;

    @Column('datetime')
    expiresAt!: Date;

    @Column('datetime')
    createdAt!: Date;

    /* relations */

    @ManyToOne(() => UserEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user?: UserEntity;

    @ManyToOne(() => KitchenEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'kitchenId' })
    kitchen?: KitchenEntity;
}
