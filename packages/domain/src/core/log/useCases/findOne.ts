import { type DataSource } from '../../..';
import { type NanoId } from '../../shared';
import { type Log } from '../Log';

export interface FindOneLogInput {
    dataSourceAdapter: DataSource.Adapter;
    request: { logId: NanoId };
}

export async function findOne({ dataSourceAdapter, request }: FindOneLogInput): Promise<Log | undefined> {
    const { logId } = request;

    const log: DataSource.DBLog | undefined = await dataSourceAdapter.logRepository.findOne({ logId });

    if (!log) return;

    return log;
}
