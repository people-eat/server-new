import { Database, Shared } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('CookVisits')
export class CookVisitEntity implements Database.DBCookVisit {
    @PrimaryColumn('char', { length: 20 })
    cookVisitId: string;

    @Column('char', { length: 20 })
    cookId: string;

    @Column('char', { length: 20 })
    sessionId: string;

    @Column('char', { length: 20, nullable: true })
    userId?: string | undefined;

    @Column('enum', {
        enumName: 'Platform',
        enum: ['IOS', 'ANDROID', 'BROWSER', 'NO_INFORMATION'],
    })
    platform: Shared.Platform;

    @Column('datetime')
    createdAt: string;
}
