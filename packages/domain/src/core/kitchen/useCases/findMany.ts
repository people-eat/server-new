import { Authorization, Database, Logger } from '../../../index.js';
import { FindManyRequest } from '../../shared.js';
import { Kitchen } from '../Kitchen.js';

interface FindManyKitchensInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ databaseAdapter }: FindManyKitchensInput): Promise<Kitchen[] | undefined> {
    const kitchens: Database.DBKitchen[] | undefined = await databaseAdapter.kitchenRepository.findMany({});
    return kitchens;
}
