import { type Authorization, type DataSource, type Email, type EmailAddressUpdate, type Logger } from '../..';
import { type NanoId } from '../shared';
import { type CreateOneEmailAddressUpdateRequest } from './CreateOneEmailAddressUpdateRequest';
import { confirmOne } from './useCases/confirmOne';
import { createOne } from './useCases/createOne';
import { findOneByUserId } from './useCases/findOneByUserId';

export interface EmailAddressUpdateService {
    createOne(context: Authorization.Context, request: CreateOneEmailAddressUpdateRequest): Promise<boolean>;
    confirmOne(context: Authorization.Context, request: { secret: NanoId }): Promise<boolean>;
    findOneByUserId(context: Authorization.Context, request: { userId: NanoId }): Promise<EmailAddressUpdate | undefined>;
}

export interface CreateEmailAddressUpdateServiceInput {
    dataSourceAdapter: DataSource.Adapter;
    emailAdapter: Email.Adapter;
    logger: Logger.Adapter;
    webAppUrl: string;
}

export function createEmailAddressUpdateService({
    dataSourceAdapter,
    emailAdapter,
    logger,
    webAppUrl,
}: CreateEmailAddressUpdateServiceInput): EmailAddressUpdateService {
    return {
        createOne: (context: Authorization.Context, request: CreateOneEmailAddressUpdateRequest) =>
            createOne({ dataSourceAdapter, emailAdapter, logger, webAppUrl, context, request }),
        confirmOne: (context: Authorization.Context, request: { secret: NanoId }) =>
            confirmOne({ dataSourceAdapter, logger, context, request }),
        findOneByUserId: (context: Authorization.Context, request: { userId: NanoId }) =>
            findOneByUserId({ dataSourceAdapter, logger, context, request }),
    };
}
