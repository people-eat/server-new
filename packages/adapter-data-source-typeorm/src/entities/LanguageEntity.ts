import { type DataSource } from '@people-eat/server-domain';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CookLanguageEntity } from './CookLanguageEntity';

@Entity('Languages')
export class LanguageEntity implements DataSource.DBLanguage {
    @PrimaryColumn('char', { length: 20 })
    languageId!: string;

    @Column('varchar')
    title!: string;

    /* relations */

    @OneToMany(() => CookLanguageEntity, (cookLanguage: CookLanguageEntity) => cookLanguage.language, { cascade: true })
    cookLanguages?: CookLanguageEntity[];
}
