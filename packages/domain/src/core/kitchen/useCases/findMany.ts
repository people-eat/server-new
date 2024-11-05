import { type Authorization, type DataSource, type Logger } from '../../..';
import { type FindManyRequest } from '../../shared';
import { type Kitchen } from '../Kitchen';

export interface FindManyAllergiesInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ dataSourceAdapter }: FindManyAllergiesInput): Promise<Kitchen[] | undefined> {
    const kitchens: DataSource.DBKitchen[] | undefined = await dataSourceAdapter.kitchenRepository.findAll();

    if (!kitchens) return;

    return kitchens;
}
