import { type Authorization, type PublicUser } from '../..';
import { type Runtime } from '../Runtime';
import { findOne } from './useCases/findOne';

export interface PublicUserService {
    findOne(context: Authorization.Context, userId: string): Promise<PublicUser | undefined>;
}

export function createPublicUserService({ dataSourceAdapter, logger }: Runtime): PublicUserService {
    return {
        findOne: (context: Authorization.Context, userId: string) => findOne({ dataSourceAdapter, logger, context, request: { userId } }),
    };
}
