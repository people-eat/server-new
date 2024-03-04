import { type Authorization, type DataSource, type Logger, type PublicCook } from '../../..';
import { type FindManyPublicCooksRequest } from '../FindManyPublicCooksRequest';
import { findMany } from './findMany';

export interface CheckAvailabilityOfPublicCooksInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyPublicCooksRequest;
}

export async function checkAvailability({
    dataSourceAdapter,
    logger,
    context,
    request,
}: CheckAvailabilityOfPublicCooksInput): Promise<boolean> {
    const availablePublicCooks: PublicCook[] | undefined = await findMany({ dataSourceAdapter, logger, context, request });
    return Boolean(availablePublicCooks?.length);
}
