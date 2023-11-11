import { type DataSource } from '@people-eat/server-domain';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BookingRequestEntity } from './BookingRequestEntity';
import { UserEntity } from './UserEntity';

@Entity('SupportRequests')
export class SupportRequestEntity implements DataSource.DBSupportRequest {
    @PrimaryColumn('char', { length: 20 })
    supportRequestId!: string;

    @Column('char', { length: 20 })
    userId!: string;

    @Column('char', { length: 20, nullable: true })
    bookingRequestId?: string;

    @Column('varchar')
    subject!: string;

    @Column('text')
    message!: string;

    @Column('datetime')
    createdAt!: Date;

    /* relations */

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.supportRequests)
    @JoinColumn({ name: 'userId' })
    user?: UserEntity;

    @ManyToOne(() => BookingRequestEntity, (bookingRequest: BookingRequestEntity) => bookingRequest.supportRequests)
    @JoinColumn({ name: 'bookingRequestId' })
    bookingRequest?: BookingRequestEntity;
}
