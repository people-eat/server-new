import { type TimeTriggeredTaskVariation } from './TimeTriggeredTask';

export interface CreateOneTimeTriggeredTask {
    dueDate: Date;
    task: TimeTriggeredTaskVariation;
}
