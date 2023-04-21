import { type DataSource } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Allergies')
export class AllergyEntity implements DataSource.DBAllergy {
    @PrimaryColumn('char', { length: 20 })
    allergyId!: string;

    @Column('varchar')
    title!: string;
}
