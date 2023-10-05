import { type Authorization, type DataSource, type Email, type Logger } from '../..';
import { type NanoId } from '../shared';
import { type CreateOneOneTimeAccessTokenForEmailAddressRequest } from './CreateOneOneTimeAccessTokenForEmailAddressRequest';
import { confirmOne } from './useCases/confirmOne';
import { createOneForEmailAddress } from './useCases/createOneForEmailAddress';

export interface OneTimeAccessTokenService {
    createOneForEmailAddress(context: Authorization.Context, request: CreateOneOneTimeAccessTokenForEmailAddressRequest): Promise<boolean>;
    confirmOne(context: Authorization.Context, request: { secret: NanoId }): Promise<boolean>;
}

export interface CreateOneTimeAccessTokenServiceInput {
    dataSourceAdapter: DataSource.Adapter;
    emailAdapter: Email.Adapter;
    logger: Logger.Adapter;
    webAppUrl: string;
}

export function createOneTimeAccessTokenService({
    dataSourceAdapter,
    emailAdapter,
    logger,
    webAppUrl,
}: CreateOneTimeAccessTokenServiceInput): OneTimeAccessTokenService {
    return {
        createOneForEmailAddress: (_context: Authorization.Context, request: CreateOneOneTimeAccessTokenForEmailAddressRequest) =>
            createOneForEmailAddress({ dataSourceAdapter, emailAdapter, logger, webAppUrl, request }),
        confirmOne: (context: Authorization.Context, request: { secret: NanoId }) =>
            confirmOne({ dataSourceAdapter, logger, context, request }),
    };
}
