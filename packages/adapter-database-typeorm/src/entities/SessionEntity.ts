import { Database, Shared } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Sessions')
export class SessionEntity implements Database.DBSession {
    @PrimaryColumn('char', { length: 20 })
    sessionId: string;

    @Column('char', { length: 20, nullable: true })
    userId: string | undefined;

    @Column('varchar', { nullable: true })
    title: string | undefined;

    @Column('enum', {
        enumName: 'Platform',
        enum: ['IOS', 'ANDROID', 'BROWSER', 'NO_INFORMATION'],
    })
    platform: Shared.Platform;

    @Column({ default: false })
    expired: boolean;

    @Column('datetime')
    lastExtendedAt: Date;

    @Column('datetime')
    createdAt: Date;
}
