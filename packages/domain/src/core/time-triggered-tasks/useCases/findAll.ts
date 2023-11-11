import { type DBTimeTriggeredTask } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type TimeTriggeredTask } from '../TimeTriggeredTask';

export async function findAllTimeTriggeredTasks(runtime: Runtime): Promise<TimeTriggeredTask[]> {
    const timeTriggeredTasks: DBTimeTriggeredTask[] | undefined = await runtime.dataSourceAdapter.timeTriggeredTaskRepository.findMany({});

    if (!timeTriggeredTasks) runtime.logger.error('Tried to retrieve time triggered tasks, but failed');

    return timeTriggeredTasks ?? [];
}
