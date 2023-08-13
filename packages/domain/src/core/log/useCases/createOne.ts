import { type DataSource } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';
import { type CreateLogRequest } from '../CreateLogRequest';

export interface CreateOneLogInput {
    dataSourceAdapter: DataSource.Adapter;
    request: CreateLogRequest;
}

export async function createOne({ dataSourceAdapter, request }: CreateOneLogInput): Promise<boolean> {
    const { message, logLevel } = request;

    const logId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.logRepository.insertOne({
        logId,
        message,
        logLevel,
        createdAt: new Date(),
    });

    return success;
}
