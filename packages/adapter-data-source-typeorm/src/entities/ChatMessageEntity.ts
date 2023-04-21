import { type DataSource } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { NanoId } from '../../../domain/src/core/shared';

@Entity('ChatMessages')
export class ChatMessageEntity implements DataSource.DBChatMessage {
    @PrimaryColumn('char', { length: 20 })
    chatMessageId!: NanoId;

    @Column('char', { length: 20 })
    bookingRequestId!: NanoId;

    @Column('varchar')
    message!: string;

    @Column('char', { length: 20 })
    createdBy!: NanoId;

    @Column('datetime')
    createdAt!: Date;
}
