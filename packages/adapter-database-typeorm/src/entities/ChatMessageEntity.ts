import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('ChatMessages')
export class ChatMessageEntity implements Database.DBChatMessage {
    @PrimaryColumn('char', { length: 20 })
    chatMessageId: string;

    @Column('char', { length: 20 })
    bookingRequestId: string;

    @Column('varchar')
    message: string;

    @Column('char', { length: 20 })
    createdBy: string;

    @Column('datetime')
    createdAt: Date;
}
