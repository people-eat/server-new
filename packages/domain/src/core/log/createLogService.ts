import { type DataSource } from '../..';
import { type FindManyRequest, type NanoId } from '../shared';
import { type CreateLogRequest } from './CreateLogRequest';
import { type Log } from './Log';
import { createOne } from './useCases/createOne';
import { findMany } from './useCases/findMany';
import { findOne } from './useCases/findOne';

export interface LogService {
    findOne(request: { logId: NanoId }): Promise<Log | undefined>;
    findMany(request: FindManyRequest): Promise<Log[] | undefined>;
    createOne(request: CreateLogRequest): Promise<boolean>;
}

export interface CreateLogServiceInput {
    dataSourceAdapter: DataSource.Adapter;
}

export function createLogService({ dataSourceAdapter }: CreateLogServiceInput): LogService {
    return {
        findOne: (request: { logId: NanoId }) => findOne({ dataSourceAdapter, request }),
        findMany: (request: FindManyRequest) => findMany({ dataSourceAdapter, request }),
        createOne: (request: CreateLogRequest) => createOne({ dataSourceAdapter, request }),
    };
}
