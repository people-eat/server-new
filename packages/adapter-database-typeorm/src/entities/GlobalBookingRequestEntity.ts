import { Database } from '@people-eat/server-domain';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity('GlobalBookingRequests')
export class GlobalBookingRequestEntity implements Database.DBGlobalBookingRequest {
    @PrimaryColumn('char', { length: 20 })
    globalBookingRequestId: string;

    userId: string;

    title: string;

    description: string;

    latitude: number;

    longitude: number;

    expiresAt: Date;

    createdAt: Date;
}
