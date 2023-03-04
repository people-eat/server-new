import { Authorization, Database, Email, Logger } from '../../index.js';
import { EmailAddressUpdate } from './EmailAddressUpdate.js';
import { createOne, CreateOneEmailAddressUpdateRequest } from './useCases/createOne.js';
import { FindManyEmailAddressUpdatesRequest, findOneByUserId } from './useCases/findOneByUserId.js';

export interface EmailAddressUpdateService {
    findOne(context: Authorization.Context, request: FindManyEmailAddressUpdatesRequest): Promise<EmailAddressUpdate | undefined>;
    createOne(context: Authorization.Context, request: CreateOneEmailAddressUpdateRequest): Promise<boolean>;
}

export interface CreateEmailAddressUpdateServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    emailAdapter: Email.EmailAdapter;
    emailRendererAdapter: Email.EmailRendererAdapter;
}

export function createEmailAddressUpdateService({
    databaseAdapter,
    logger,
    emailAdapter,
    emailRendererAdapter,
}: CreateEmailAddressUpdateServiceInput): EmailAddressUpdateService {
    return {
        findOne: (context: Authorization.Context, request: FindManyEmailAddressUpdatesRequest) =>
            findOneByUserId({ databaseAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneEmailAddressUpdateRequest) =>
            createOne({ databaseAdapter, logger, emailAdapter, emailRendererAdapter, context, request }),
    };
}
