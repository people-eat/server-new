import { Authorization, Database, Logger } from '../../../index.js';
import { FindManyRequest } from '../../shared.js';
import { Allergy } from '../Allergy.js';

interface FindManyAllergiesInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: FindManyRequest;
}

export async function findMany({ databaseAdapter }: FindManyAllergiesInput): Promise<Allergy[] | undefined> {
    const allergies: Database.DBAllergy[] | undefined = await databaseAdapter.allergyRepository.findMany({});

    if (!allergies) return;

    return allergies;
}
