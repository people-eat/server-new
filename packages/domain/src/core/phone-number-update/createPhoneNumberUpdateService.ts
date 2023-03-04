import { Authorization, Database, Logger, PhoneNumberUpdate, SMS } from '../../index.js';
import { createOne, CreateOnePhoneNumberUpdateRequest } from './useCases/createOne.js';
import { findOne, FindOnePhoneNumberUpdate } from './useCases/findOne.js';

export interface PhoneNumberUpdateService {
    createOne(context: Authorization.Context, request: CreateOnePhoneNumberUpdateRequest): Promise<boolean>;
    findOne(context: Authorization.Context, request: FindOnePhoneNumberUpdate): Promise<PhoneNumberUpdate | undefined>;
}

export interface CreatePhoneNumberUpdateServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    smsAdapter: SMS.Adapter;
}

export function createPhoneNumberUpdateService({
    databaseAdapter,
    logger,
    smsAdapter,
}: CreatePhoneNumberUpdateServiceInput): PhoneNumberUpdateService {
    return {
        createOne: (context: Authorization.Context, request: CreateOnePhoneNumberUpdateRequest) =>
            createOne({ databaseAdapter, logger, smsAdapter, context, request }),
        findOne: (context: Authorization.Context, request: FindOnePhoneNumberUpdate) =>
            findOne({ databaseAdapter, logger, context, request }),
    };
}
