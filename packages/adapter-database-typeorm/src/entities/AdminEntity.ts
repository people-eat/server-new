import { Database } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Admins')
export class AdminEntity implements Database.DBAdmin {
    @PrimaryColumn('char', { length: 20 })
    adminId: string;

    @Column('datetime')
    createdAt: Date;
}
