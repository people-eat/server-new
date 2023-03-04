import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('TermsUpdates')
export class TermsUpdateEntity implements Database.DBTermsUpdate {
    @PrimaryColumn('char', { length: 20 })
    termsUpdateId: string;

    @Column('text')
    germanText: string;

    @Column('text')
    englishText: string;

    @Column('char', { length: 20 })
    adminId: string;

    @Column('datetime')
    createdAt: Date;
}
