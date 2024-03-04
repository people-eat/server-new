import { type Authorization, type DataSource, type Logger, type PublicMenu } from '../../..';
import { type FindManyPublicMenusRequest } from '../FindManyPublicMenusRequest';
import { findMany } from './findMany';

export interface CheckAvailabilityOfPublicCooksInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyPublicMenusRequest;
}

export async function checkAvailability({
    dataSourceAdapter,
    logger,
    context,
    request,
}: CheckAvailabilityOfPublicCooksInput): Promise<boolean> {
    const availablePublicMenus: PublicMenu[] | undefined = await findMany({ dataSourceAdapter, logger, context, request });
    return Boolean(availablePublicMenus?.length);
}
