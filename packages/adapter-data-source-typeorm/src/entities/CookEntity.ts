import { Shared, type DataSource } from '@people-eat/server-domain';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { type CookPayoutMethodStripe } from '../../../domain/src/core/cook/CookPayoutMethod';
import { CookLanguageEntity } from './CookLanguageEntity';
import { MealEntity } from './MealEntity';
import { MenuEntity } from './MenuEntity';
import { UserEntity } from './UserEntity';

@Entity('Cooks')
export class CookEntity implements DataSource.DBCook {
    @PrimaryColumn('char', { length: 20 })
    cookId!: string;

    @Column('bool')
    isLocked!: boolean;

    @Column('bool')
    isVisible!: boolean;

    @Column('varchar', { nullable: true })
    name?: string;

    @Column('enum', {
        enum: ['HOBBY', 'PROFESSIONAL'],
        enumName: 'CookRank',
    })
    rank!: Shared.CookRank;

    @Column('text')
    biography!: string;

    @Column('float', { unsigned: true })
    latitude!: number;

    @Column('float', { unsigned: true })
    longitude!: number;

    @Column('varchar')
    city!: string;

    @Column('smallint', { unsigned: true })
    travelExpenses!: number;

    @Column('smallint', { nullable: true, unsigned: true })
    maximumTravelDistance?: number | undefined;

    @Column('smallint', { nullable: true, unsigned: true })
    minimumPrice?: number | undefined;

    @Column('smallint', { nullable: true, unsigned: true })
    maximumPrice?: number | undefined;

    @Column('smallint', { nullable: true, unsigned: true })
    minimumParticipants?: number | undefined;

    @Column('smallint', { nullable: true, unsigned: true })
    maximumParticipants?: number | undefined;

    @Column('json')
    payoutMethods!: CookPayoutMethodStripe[];

    @Column('datetime')
    createdAt!: Date;

    /* relations */

    @OneToOne(() => UserEntity, (user: UserEntity) => user.cook)
    @JoinColumn({ name: 'cookId' })
    user?: UserEntity;

    @OneToMany(() => CookLanguageEntity, (cookLanguage: CookLanguageEntity) => cookLanguage.cook, { cascade: true })
    cookLanguages?: CookLanguageEntity[];

    @OneToMany(() => MealEntity, (meal: MealEntity) => meal.cook, { cascade: true })
    meals?: MealEntity[];

    @OneToMany(() => MenuEntity, (menu: MenuEntity) => menu.cook, { cascade: true })
    menus?: MenuEntity[];
}
