import { Database, Shared } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Cooks')
export class CookEntity implements Database.DBCook {
    @PrimaryColumn('char', { length: 20 })
    cookId: string;

    @Column('bool')
    isLocked: boolean;

    @Column('bool')
    isVisible: boolean;

    @Column('enum', {
        enumName: 'CookRank',
        enum: ['HOBBY', 'PROFESSIONAL', 'MASTER'],
    })
    rank: Shared.CookRank;

    @Column('text')
    biography: string;

    @Column('float', { unsigned: true })
    latitude: number;

    @Column('float', { unsigned: true })
    longitude: number;

    @Column('smallint', { unsigned: true })
    travelExpenses: number;

    @Column('smallint', { unsigned: true, nullable: true })
    maximumTravelDistance?: number | undefined;

    @Column('smallint', { unsigned: true, nullable: true })
    minimumPrice?: number | undefined;

    @Column('smallint', { unsigned: true, nullable: true })
    maximumPrice?: number | undefined;

    @Column('smallint', { unsigned: true, nullable: true })
    minimumParticipants?: number | undefined;

    @Column('smallint', { unsigned: true, nullable: true })
    maximumParticipants?: number | undefined;

    @Column('datetime')
    createdAt: Date;
}
