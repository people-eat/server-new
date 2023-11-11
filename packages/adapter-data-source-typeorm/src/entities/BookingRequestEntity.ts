import { Shared, type DataSource } from '@people-eat/server-domain';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { ChatMessageEntity } from './ChatMessageEntity';
import { CookEntity } from './CookEntity';
import { KitchenEntity } from './KitchenEntity';
import { SupportRequestEntity } from './SupportRequestEntity';
import { UserEntity } from './UserEntity';

@Entity('BookingRequests')
export class BookingRequestEntity implements DataSource.DBBookingRequest {
    @PrimaryColumn('char', { length: 20 })
    bookingRequestId!: string;

    @Column('char', { length: 20 })
    userId!: string;

    @Column('char', { length: 20 })
    cookId!: string;

    @Column('boolean', { nullable: true })
    userAccepted?: boolean;

    @Column('boolean', { nullable: true })
    cookAccepted?: boolean;

    @Column('float', { unsigned: true })
    latitude!: number;

    @Column('float', { unsigned: true })
    longitude!: number;

    @Column('varchar')
    locationText!: string;

    @Column('datetime')
    dateTime!: Date;

    @Column('smallint', { unsigned: true })
    preparationTime!: number;

    @Column('smallint', { unsigned: true })
    duration!: number;

    @Column('smallint', { unsigned: true })
    adultParticipants!: number;

    @Column('smallint', { unsigned: true })
    children!: number;

    @Column('int', { unsigned: true })
    amount!: number;

    @Column('enum', {
        enum: ['EUR', 'USD'],
        enumName: 'CurrencyCode',
    })
    currencyCode!: Shared.CurrencyCode;

    @Column('smallint', { unsigned: true })
    fee!: number;

    @Column('varchar')
    occasion!: string;

    @Column('char', { length: 20, nullable: true })
    kitchenId?: string;

    @Column('char', { length: 20, nullable: true })
    globalBookingRequestId?: string;

    @Column('datetime')
    createdAt!: Date;

    @Column('json')
    paymentData!: {
        provider: Shared.PaymentProvider;
        setupIntentId: string;
        clientSecret: string;
        unlocked: boolean;
    };

    /* relations */

    @OneToMany(() => ChatMessageEntity, (chatMessage: ChatMessageEntity) => chatMessage.bookingRequest, { cascade: true })
    chatMessages?: ChatMessageEntity[];

    @ManyToOne(() => UserEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user?: UserEntity;

    @ManyToOne(() => CookEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'cookId' })
    cook?: CookEntity;

    @ManyToOne(() => KitchenEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'kitchenId' })
    kitchen?: KitchenEntity;

    @OneToMany(() => SupportRequestEntity, (supportRequest: SupportRequestEntity) => supportRequest.user)
    supportRequests?: SupportRequestEntity[];
}
