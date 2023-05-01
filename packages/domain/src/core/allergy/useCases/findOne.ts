import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';
import { type Allergy } from '../Allergy';

export interface FindOneAllergyInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { allergyId: NanoId };
}

export async function findOne({ dataSourceAdapter, logger, context, request }: FindOneAllergyInput): Promise<Allergy | undefined> {
    const { allergyId } = request;

    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const allergy: DataSource.DBAllergy | undefined = await dataSourceAdapter.allergyRepository.findOne({ allergyId });

    if (!allergy) return;

    return allergy;
}
