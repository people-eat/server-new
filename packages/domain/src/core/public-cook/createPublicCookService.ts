import { type Authorization, type DataSource, type Logger, type PublicCook } from '../..';
import { findMany } from './useCases/findMany';
import { findOne } from './useCases/findOne';

export interface PublicCookService {
    findOne(context: Authorization.Context, cookId: string): Promise<PublicCook | undefined>;
    findMany(context: Authorization.Context): Promise<PublicCook[] | undefined>;
}

export interface CreatePublicCookServiceInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
}

export function createPublicCookService({ dataSourceAdapter, logger }: CreatePublicCookServiceInput): PublicCookService {
    return {
        findOne: (context: Authorization.Context, cookId: string) => findOne({ dataSourceAdapter, logger, context, request: { cookId } }),
        findMany: (context: Authorization.Context) => findMany({ dataSourceAdapter, logger, context, request: {} }),
    };
}
