import { Authorization, Database, Logger } from '../../index.js';
import { Allergy } from './Allergy.js';

export interface FindManyAllergiesInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { searchText?: string };
}

export async function findManyAllergies({
    databaseAdapter,
    request: { searchText },
}: FindManyAllergiesInput): Promise<Allergy[] | undefined> {
    const allergies: Database.DBAllergy[] | undefined = await databaseAdapter.allergyRepository.findMany({});

    if (!allergies) return;

    return allergies;
}
