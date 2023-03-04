import { Database, Shared } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('MenuVisits')
export class MenuVisitEntity implements Database.DBMenuVisit {
    @PrimaryColumn('char', { length: 20 })
    menuVisitId: string;

    @Column('char', { length: 20 })
    menuId: string;

    @Column('char', { length: 20 })
    sessionId: string;

    @Column('char', { length: 20, nullable: true })
    userId?: string;

    @Column('enum', {
        enumName: 'Platform',
        enum: ['IOS', 'ANDROID', 'BROWSER', 'NO_INFORMATION'],
    })
    platform: Shared.Platform;

    @Column('datetime')
    createdAt: string;
}
