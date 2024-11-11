import { Shared, type DataSource } from '@people-eat/server-domain';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BookingRequestEntity } from './BookingRequestEntity';

@Entity('ChatMessages')
export class ChatMessageEntity implements DataSource.DBChatMessage {
    @PrimaryColumn('char', { length: 20 })
    chatMessageId!: Shared.NanoId;

    @Column('char', { length: 20 })
    bookingRequestId!: Shared.NanoId;

    @Column('text')
    message!: string;

    // instead of generated add generationEvent: "BOOKING_REQUEST_COOK_ACCEPTED" | "BOOKING_REQUEST_COOK_DECLINED"
    // and make message a parameter in a message template -> Cook has sent a counter suggestion of :message -> message: 5000.00€
    @Column('bool')
    generated!: boolean;

    @Column('char', { length: 20 })
    createdBy!: Shared.NanoId;

    @Column('datetime')
    createdAt!: Date;

    /* relations */

    @ManyToOne(() => BookingRequestEntity, (bookingRequest: BookingRequestEntity) => bookingRequest.chatMessages, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'bookingRequestId' })
    bookingRequest?: BookingRequestEntity;
}
