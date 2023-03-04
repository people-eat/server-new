import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('OneTimeAccessTokens')
export class OneTimeAccessTokenEntity implements Database.DBOneTimeAccessToken {
    @PrimaryColumn('char', { length: 20 })
    userId: string;

    @Column('char', { length: 20 })
    secret: string;

    @Column('datetime')
    createdAt: Date;
}
