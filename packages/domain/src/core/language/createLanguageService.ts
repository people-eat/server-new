import { Authorization, Database, Logger } from '../../index.js';
import { FindManyRequest } from '../shared.js';
import { Language } from './Language.js';
import { createOne, CreateOneLanguageRequest } from './useCases/createOne.js';
import { findMany } from './useCases/findMany.js';

export interface LanguageService {
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<Language[] | undefined>;
    createOne(context: Authorization.Context, request: CreateOneLanguageRequest): Promise<boolean>;
}

export interface CreateLanguageServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
}

export function createLanguageService({ databaseAdapter, logger }: CreateLanguageServiceInput): LanguageService {
    return {
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ databaseAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneLanguageRequest) =>
            createOne({ databaseAdapter, logger, context, request }),
    };
}
