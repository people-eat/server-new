import { Shared, type DataSource } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('MenuVisits')
export class MenuVisitEntity implements DataSource.DBMenuVisit {
    @PrimaryColumn('char', { length: 20 })
    menuVisitId!: string;

    @Column('char', { length: 20 })
    menuId!: string;

    @Column('char', { length: 20 })
    sessionId!: string;

    @Column('char', { length: 20, nullable: true })
    userId?: string;

    @Column('enum', {
        enum: ['IOS', 'ANDROID', 'BROWSER', 'NO_INFORMATION'],
        enumName: 'Platform',
    })
    platform!: Shared.Platform;

    @Column('datetime')
    createdAt!: Date;
}
