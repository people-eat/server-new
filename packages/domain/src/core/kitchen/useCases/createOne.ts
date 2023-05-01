import { Authorization, type DataSource, type Logger } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';
import { type CreateOneKitchenRequest } from '../CreateOneKitchenRequest';

export interface CreateOneKitchenInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneKitchenRequest;
}

export async function createOne({ dataSourceAdapter, logger, context, request }: CreateOneKitchenInput): Promise<boolean> {
    const { title } = request;

    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const kitchenId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.kitchenRepository.insertOne({
        kitchenId,
        title,
    });

    return success;
}
