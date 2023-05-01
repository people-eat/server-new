import { Authorization, type DataSource, type Logger } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';
import { type CreateOneAllergyRequest } from '../CreateOneAllergyRequest';

export interface CreateOneAllergyInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneAllergyRequest;
}

export async function createOne({ dataSourceAdapter, logger, context, request }: CreateOneAllergyInput): Promise<boolean> {
    const { title } = request;

    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const allergyId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.allergyRepository.insertOne({
        allergyId,
        title,
    });

    return success;
}
