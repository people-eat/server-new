import { Authorization, Database, Logger, PublicUser } from '../../index.js';
import { findOne, FindOnePublicUserRequest } from './useCases/findOne.js';

export interface PublicUserService {
    findOne(context: Authorization.Context, request: FindOnePublicUserRequest): Promise<PublicUser | undefined>;
}

export interface CreatePublicUserServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createPublicUserService({ databaseAdapter, logger }: CreatePublicUserServiceInput): PublicUserService {
    return {
        findOne: (context: Authorization.Context, request: FindOnePublicUserRequest) =>
            findOne({ databaseAdapter, logger, context, request }),
    };
}
