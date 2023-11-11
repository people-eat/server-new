import { type Runtime } from '../Runtime';
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

export function createLogService({ dataSourceAdapter }: Runtime): LogService {
    return {
        findOne: (request: { logId: NanoId }) => findOne({ dataSourceAdapter, request }),
        findMany: (request: FindManyRequest) => findMany({ dataSourceAdapter, request }),
        createOne: (request: CreateLogRequest) => createOne({ dataSourceAdapter, request }),
    };
}
