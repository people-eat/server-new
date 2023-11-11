import { type Authorization, type Language } from '../..';
import { type Runtime } from '../Runtime';
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

export function createCookLanguageService({ dataSourceAdapter, logger }: Runtime): CookLanguageService {
    return {
        findAll: (context: Authorization.Context, request: { cookId: NanoId }) => findAll({ dataSourceAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneCookLanguageRequest & { cookId: NanoId }) =>
            createOne({ dataSourceAdapter, logger, context, request }),
        deleteOne: (context: Authorization.Context, request: { cookId: NanoId; languageId: NanoId }) =>
            deleteOne({ dataSourceAdapter, logger, context, request }),
    };
}
