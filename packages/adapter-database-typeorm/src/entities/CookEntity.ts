import { Database, Shared } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Cooks')
export class CookEntity implements Database.DBCook {
    @PrimaryColumn('char', { length: 20 })
    cookId: string;
    isLocked: boolean;
    isVisible: boolean;
    rank: Shared.CookRank;
    biography: string;
    latitude: number;
    longitude: number;
    travelExpenses: number;
    maximumTravelDistance?: number | undefined;
    minimumPrice?: number | undefined;
    maximumPrice?: number | undefined;
    minimumParticipants?: number | undefined;
    maximumParticipants?: number | undefined;

    @Column('datetime')
    createdAt: Date;
}
