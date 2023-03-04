import { Authorization, Database, Logger } from '../../index.js';
import { FindManyRequest } from '../shared.js';
import { Allergy } from './Allergy.js';
import { createOne, CreateOneAllergyRequest } from './useCases/createOne.js';
import { findMany } from './useCases/findMany.js';

export interface AllergyService {
    createOne(context: Authorization.Context, request: CreateOneAllergyRequest): Promise<boolean>;
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<Allergy[] | undefined>;
}

export interface CreateAllergyServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createAllergyService({ databaseAdapter, logger }: CreateAllergyServiceInput): AllergyService {
    return {
        createOne: (context: Authorization.Context, request: CreateOneAllergyRequest) =>
            createOne({ databaseAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ databaseAdapter, logger, context, request }),
    };
}
