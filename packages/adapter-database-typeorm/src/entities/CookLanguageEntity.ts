import { Database } from '@people-eat/server-domain';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity('CookLanguages')
export class CookLanguageEntity implements Database.DBCookLanguage {
    @PrimaryColumn('char', { length: 20 })
    cookId: string;

    @PrimaryColumn('char', { length: 20 })
    languageId: string;
}
