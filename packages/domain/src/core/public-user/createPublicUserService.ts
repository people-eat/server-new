import { type Authorization, type DataSource, type Logger, type PublicUser } from '../..';
import { findOne } from './useCases/findOne';

export interface PublicUserService {
    findOne(context: Authorization.Context, userId: string): Promise<PublicUser | undefined>;
}

export interface CreatePublicUserServiceInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
}

export function createPublicUserService({ dataSourceAdapter, logger }: CreatePublicUserServiceInput): PublicUserService {
    return {
        findOne: (context: Authorization.Context, userId: string) => findOne({ dataSourceAdapter, logger, context, request: { userId } }),
    };
}
