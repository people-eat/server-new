import { Authorization, Database, Logger } from '../../../index.js';
import createNanoId from '../../../utils/createNanoId.js';

interface CreateOneAllergyInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneAllergyRequest;
}

export interface CreateOneAllergyRequest {
    title: string;
}

export async function createOne({ databaseAdapter, logger, context, request: { title } }: CreateOneAllergyInput): Promise<boolean> {
    await Authorization.isAdmin({ databaseAdapter, logger, context });

    const allergyId: string = createNanoId();

    const success: boolean = await databaseAdapter.allergyRepository.insertOne({
        allergyId,
        title,
    });

    return success;
}
