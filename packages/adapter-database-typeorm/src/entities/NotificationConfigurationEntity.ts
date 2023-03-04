import { Database } from '@people-eat/server-domain';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './UserEntity.js';

@Entity('NotificationConfigurations')
export class NotificationConfigurationEntity implements Database.DBNotificationConfiguration {
    @PrimaryColumn('char', { length: 20 })
    userId: string;

    @Column('boolean')
    pushesForBookingRequests: boolean;

    @Column('boolean')
    pushesForFavoriteCooks: boolean;

    @Column('boolean')
    pushesForOffers: boolean;

    @Column('boolean')
    pushesForAccount: boolean;

    @Column('boolean')
    emailsForBookingRequests: boolean;

    @Column('boolean')
    emailsForFavoriteCooks: boolean;

    @Column('boolean')
    emailsForOffers: boolean;

    @Column('boolean')
    emailsForAccount: boolean;

    /* relations */

    @OneToOne(() => UserEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
    user: UserEntity;
}
