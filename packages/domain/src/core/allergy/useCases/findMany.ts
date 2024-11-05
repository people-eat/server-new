import { type Authorization, type DataSource, type Logger } from '../../..';
import { type FindManyRequest } from '../../shared';
import { type Allergy } from '../Allergy';

export interface FindManyAllergiesInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ dataSourceAdapter }: FindManyAllergiesInput): Promise<Allergy[] | undefined> {
    const allergies: DataSource.DBAllergy[] | undefined = await dataSourceAdapter.allergyRepository.findAll();

    if (!allergies) return;

    return allergies;
}
