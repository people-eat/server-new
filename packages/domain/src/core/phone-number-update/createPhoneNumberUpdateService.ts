import { type Authorization, type PhoneNumberUpdate } from '../..';
import { type Runtime } from '../Runtime';
import { type NanoId } from '../shared';
import { type CreateOnePhoneNumberUpdateRequest } from './CreateOnePhoneNumberUpdateRequest';
import { confirmOne } from './useCases/confirmOne';
import { createOne } from './useCases/createOne';
import { findOneByUserId } from './useCases/findOneByUserId';

export interface PhoneNumberUpdateService {
    createOne(context: Authorization.Context, request: CreateOnePhoneNumberUpdateRequest): Promise<boolean>;
    confirmOne(context: Authorization.Context, request: { secret: NanoId }): Promise<boolean>;
    findOneByUserId(context: Authorization.Context, request: { userId: NanoId }): Promise<PhoneNumberUpdate | undefined>;
}

export function createPhoneNumberUpdateService({ dataSourceAdapter, smsAdapter, logger, webAppUrl }: Runtime): PhoneNumberUpdateService {
    return {
        createOne: (context: Authorization.Context, request: CreateOnePhoneNumberUpdateRequest) =>
            createOne({ dataSourceAdapter, smsAdapter, logger, webAppUrl, context, request }),
        confirmOne: (context: Authorization.Context, request: { secret: NanoId }) =>
            confirmOne({ dataSourceAdapter, logger, context, request }),
        findOneByUserId: (context: Authorization.Context, request: { userId: NanoId }) =>
            findOneByUserId({ dataSourceAdapter, logger, context, request }),
    };
}
