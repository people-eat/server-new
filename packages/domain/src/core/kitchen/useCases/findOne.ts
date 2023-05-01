import { type Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';
import { type Kitchen } from '../Kitchen';

export interface FindOneKitchenInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { kitchenId: NanoId };
}

export async function findOne({ dataSourceAdapter, request }: FindOneKitchenInput): Promise<Kitchen | undefined> {
    const { kitchenId } = request;

    const kitchen: DataSource.DBKitchen | undefined = await dataSourceAdapter.kitchenRepository.findOne({ kitchenId });

    if (!kitchen) return;

    return kitchen;
}
