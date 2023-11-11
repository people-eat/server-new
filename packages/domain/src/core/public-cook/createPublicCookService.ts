import { type Authorization, type PublicCook } from '../..';
import { type Runtime } from '../Runtime';
import { findMany } from './useCases/findMany';
import { findOne } from './useCases/findOne';

export interface PublicCookService {
    findOne(context: Authorization.Context, cookId: string): Promise<PublicCook | undefined>;
    findMany(context: Authorization.Context): Promise<PublicCook[] | undefined>;
}

export function createPublicCookService({ dataSourceAdapter, logger }: Runtime): PublicCookService {
    return {
        findOne: (context: Authorization.Context, cookId: string) => findOne({ dataSourceAdapter, logger, context, request: { cookId } }),
        findMany: (context: Authorization.Context) => findMany({ dataSourceAdapter, logger, context, request: {} }),
    };
}
