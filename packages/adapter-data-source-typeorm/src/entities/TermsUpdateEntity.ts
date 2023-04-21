import { type DataSource } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('TermsUpdates')
export class TermsUpdateEntity implements DataSource.DBTermsUpdate {
    @PrimaryColumn('char', { length: 20 })
    termsUpdateId!: string;

    @Column('text')
    germanText!: string;

    @Column('text')
    englishText!: string;

    @Column('char', { length: 20 })
    adminId!: string;

    @Column('datetime')
    createdAt!: Date;
}
