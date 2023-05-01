import { type Authorization, type DataSource, type Language, type Logger } from '../..';
import { type NanoId } from '../shared';
import { type CreateOneCookLanguageRequest } from './CreateOneCookLanguageRequest';
import { createOne } from './useCases/createOne';
import { deleteOne } from './useCases/deleteOne';
import { findAll } from './useCases/findAll';

export interface CookLanguageService {
    findAll(context: Authorization.Context, request: { cookId: NanoId }): Promise<Language[] | undefined>;
    createOne(context: Authorization.Context, request: CreateOneCookLanguageRequest & { cookId: NanoId }): Promise<boolean>;
    deleteOne(context: Authorization.Context, request: { cookId: NanoId; languageId: NanoId }): Promise<boolean>;
}

export interface CreateAddressServiceInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
}

export function createCookLanguageService({ dataSourceAdapter, logger }: CreateAddressServiceInput): CookLanguageService {
    return {
        findAll: (context: Authorization.Context, request: { cookId: NanoId }) => findAll({ dataSourceAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneCookLanguageRequest & { cookId: NanoId }) =>
            createOne({ dataSourceAdapter, logger, context, request }),
        deleteOne: (context: Authorization.Context, request: { cookId: NanoId; languageId: NanoId }) =>
            deleteOne({ dataSourceAdapter, logger, context, request }),
    };
}
