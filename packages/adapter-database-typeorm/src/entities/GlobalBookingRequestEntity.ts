import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('GlobalBookingRequests')
export class GlobalBookingRequestEntity implements Database.DBGlobalBookingRequest {
    @PrimaryColumn('char', { length: 20 })
    globalBookingRequestId: string;

    @Column('char', { length: 20 })
    userId: string;

    @Column('varchar')
    title: string;

    @Column('text')
    description: string;

    @Column('float', { unsigned: true })
    latitude: number;

    @Column('float', { unsigned: true })
    longitude: number;

    @Column('datetime')
    expiresAt: Date;

    @Column('datetime')
    createdAt: Date;
}
