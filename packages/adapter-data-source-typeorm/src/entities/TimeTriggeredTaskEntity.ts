import { TimeTriggeredTaskVariation, type DataSource } from '@people-eat/server-domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('TimeTriggeredTasks')
export class TimeTriggeredTaskEntity implements DataSource.DBTimeTriggeredTask {
    @PrimaryColumn('char', { length: 20 })
    timeTriggeredTaskId!: string;

    @Column('datetime')
    dueDate!: Date;

    @Column('json')
    task!: TimeTriggeredTaskVariation;

    @Column('datetime')
    createdAt!: Date;
}
