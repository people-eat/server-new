import { type DataSource } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Logs')
export class LogEntity implements DataSource.DBLog {
    @PrimaryColumn('char', { length: 20 })
    logId!: string;

    @Column('text')
    message!: string;

    @Column('enum', {
        enum: ['DEBUG', 'ERROR', 'INFO', 'WARN'],
        enumName: 'LogLevel',
    })
    logLevel!: 'DEBUG' | 'ERROR' | 'INFO' | 'WARN';

    @Column('datetime')
    createdAt!: Date;
}
