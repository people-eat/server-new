import { type Authorization, type DataSource, type Logger } from '../..';
import { type FindManyRequest, type NanoId } from '../shared';
import { type CreateOneLanguageRequest } from './CreateOneLanguageRequest';
import { type Language } from './Language';
import { createOne } from './useCases/createOne';
import { findMany } from './useCases/findMany';
import { findOne } from './useCases/findOne';

export interface LanguageService {
    findOne(context: Authorization.Context, request: { languageId: NanoId }): Promise<Language | undefined>;
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<Language[] | undefined>;
    createOne(context: Authorization.Context, request: CreateOneLanguageRequest): Promise<boolean>;
}

export interface CreateLanguageServiceInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
}

export function createLanguageService({ dataSourceAdapter, logger }: CreateLanguageServiceInput): LanguageService {
    return {
        findOne: (context: Authorization.Context, request: { languageId: NanoId }) =>
            findOne({ dataSourceAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ dataSourceAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneLanguageRequest) =>
            createOne({ dataSourceAdapter, logger, context, request }),
    };
}
