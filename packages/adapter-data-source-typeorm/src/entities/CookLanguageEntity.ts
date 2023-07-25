import { type DataSource } from '@people-eat/server-domain';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CookEntity } from './CookEntity';
import { LanguageEntity } from './LanguageEntity';

@Entity('CookLanguages')
export class CookLanguageEntity implements DataSource.DBCookLanguage {
    @PrimaryColumn('char', { length: 20 })
    cookId!: string;

    @PrimaryColumn('char', { length: 20 })
    languageId!: string;

    /* relations */

    @ManyToOne(() => CookEntity, (cook: CookEntity) => cook.cookLanguages, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'cookId' })
    cook?: CookEntity;

    @ManyToOne(() => LanguageEntity, (language: LanguageEntity) => language.cookLanguages, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'languageId' })
    language?: LanguageEntity;
}
