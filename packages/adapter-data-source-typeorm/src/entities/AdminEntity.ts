import { type DataSource } from '@people-eat/server-domain';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity('Admins')
export class AdminEntity implements DataSource.DBAdmin {
    @PrimaryColumn('char', { length: 20 })
    adminId!: string;

    @Column('datetime')
    createdAt!: Date;

    /* relations */

    @OneToOne(() => UserEntity, (user: UserEntity) => user.admin)
    @JoinColumn({ name: 'adminId' })
    user?: UserEntity;
}
