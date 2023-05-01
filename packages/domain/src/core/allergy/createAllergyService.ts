import { type Authorization, type DataSource, type Logger } from '../..';
import { type FindManyRequest, type NanoId } from '../shared';
import { type Allergy } from './Allergy';
import { type CreateOneAllergyRequest } from './CreateOneAllergyRequest';
import { createOne } from './useCases/createOne';
import { findMany } from './useCases/findMany';
import { findOne } from './useCases/findOne';

export interface AllergyService {
    findOne(context: Authorization.Context, request: { allergyId: NanoId }): Promise<Allergy | undefined>;
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<Allergy[] | undefined>;
    createOne(context: Authorization.Context, request: CreateOneAllergyRequest): Promise<boolean>;
}

export interface CreateAllergyServiceInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
}

export function createAllergyService({ dataSourceAdapter, logger }: CreateAllergyServiceInput): AllergyService {
    return {
        findOne: (context: Authorization.Context, request: { allergyId: NanoId }) =>
            findOne({ dataSourceAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ dataSourceAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneAllergyRequest) =>
            createOne({ dataSourceAdapter, logger, context, request }),
    };
}
