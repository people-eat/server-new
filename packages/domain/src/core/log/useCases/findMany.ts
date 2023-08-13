import { type DataSource } from '../../..';
import { type FindManyRequest } from '../../shared';
import { type Log } from '../Log';

export interface FindManyAllergiesInput {
    dataSourceAdapter: DataSource.Adapter;
    request: FindManyRequest;
}

export async function findMany({ dataSourceAdapter }: FindManyAllergiesInput): Promise<Log[] | undefined> {
    const logs: DataSource.DBLog[] | undefined = await dataSourceAdapter.logRepository.findMany({});

    if (!logs) return;

    return logs;
}
