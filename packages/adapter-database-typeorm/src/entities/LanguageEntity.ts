import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Languages')
export class LanguageEntity implements Database.DBLanguage {
    @PrimaryColumn('char', { length: 20 })
    languageId: string;

    @Column('varchar')
    title: string;
}
