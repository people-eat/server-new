import { Database, Shared } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { NotificationConfigurationEntity } from './NotificationConfigurationEntity.js';

@Entity('Users')
export class UserEntity implements Database.DBUser {
    @PrimaryColumn('char', { length: 20 })
    userId: string;

    @Column('bool')
    isLocked: boolean;

    @Column('varchar', { nullable: true })
    emailAddress?: string;

    @Column('varchar', { nullable: true })
    phoneNumber?: string;

    @Column('varchar', { nullable: true })
    password?: string;

    @Column('tinyint')
    failedSignInAttempts: number;

    @Column('varchar')
    firstName: string;

    @Column('varchar')
    lastName: string;

    @Column('enum', {
        enumName: 'UserLanguage',
        enum: ['GERMAN', 'ENGLISH'],
    })
    language: Shared.UserLanguage;

    @Column('enum', {
        enumName: 'Gender',
        enum: ['MALE', 'FEMALE', 'DIVERSE', 'NO_INFORMATION'],
    })
    gender: Shared.Gender;

    @Column('date', { nullable: true })
    birthDate?: string;

    @Column('varchar', { nullable: true })
    profilePictureUrl?: string;

    @Column('datetime')
    acceptedPrivacyPolicy: Date;

    @Column('datetime')
    acceptedTerms: Date;

    @Column('datetime')
    createdAt: Date;

    /* relations */

    // @OneToOne(
    //     () => NotificationConfigurationEntity,
    //     (notificationConfiguration: NotificationConfigurationEntity) => notificationConfiguration.user,
    //     { cascade: true },
    // )
    notificationConfiguration?: NotificationConfigurationEntity;
}
