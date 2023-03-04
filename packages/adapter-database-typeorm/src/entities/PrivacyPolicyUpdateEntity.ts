import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('PrivacyPolicyUpdates')
export class PrivacyPolicyUpdateEntity implements Database.DBPrivacyPolicyUpdate {
    @PrimaryColumn('char', { length: 20 })
    privacyPolicyUpdateId: string;

    @Column('text')
    germanText: string;

    @Column('text')
    englishText: string;

    @Column('char', { length: 20 })
    adminId: string;

    @Column('datetime')
    createdAt: Date;
}
