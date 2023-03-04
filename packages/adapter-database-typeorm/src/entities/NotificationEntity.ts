import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Notifications')
export class NotificationEntity implements Database.DBNotification {
    @PrimaryColumn('char', { length: 20 })
    notificationId: string;

    @Column('char', { length: 20 })
    userId: string;

    @Column('varchar')
    message: string;

    @Column('varchar', { nullable: true })
    url?: string | undefined;

    @Column('boolean')
    wasRead: boolean;

    @Column('datetime')
    createdAt: Date;
}
