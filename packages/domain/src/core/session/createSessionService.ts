import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
import { type Session } from './Session';
import { assignOneByEmailAddress, type AssignOneSessionByEmailAddressRequest } from './useCases/assignOneByEmailAddress';
import { assignOneByIdentityProvider, type AssignOneSessionByIdentityProviderRequest } from './useCases/assignOneByIdentityProvider';
import { assignOneByPhoneNumber, type AssignOneSessionByPhoneNumberRequest } from './useCases/assignOneByPhoneNumber';
import { expireOne, type ExpireOneSessionRequest } from './useCases/expireOne';
import { findCurrent } from './useCases/findCurrent';
import { findMany, type FindManySessionsRequest } from './useCases/findMany';
import { updateCookieSettings, type UpdateCookieSettingsRequest } from './useCases/updateCookieSettings';

export interface SessionService {
    assignOneByEmailAddress(context: Authorization.Context, request: AssignOneSessionByEmailAddressRequest): Promise<boolean>;
    assignOneByIdentityProvider(context: Authorization.Context, request: AssignOneSessionByIdentityProviderRequest): Promise<boolean>;
    assignOneByPhoneNumber(context: Authorization.Context, request: AssignOneSessionByPhoneNumberRequest): Promise<boolean>;
    updateCookieSettings(context: Authorization.Context, request: UpdateCookieSettingsRequest): Promise<boolean>;
    expireOne(context: Authorization.Context, request: ExpireOneSessionRequest): Promise<boolean>;
    findMany(context: Authorization.Context, request: FindManySessionsRequest): Promise<Session[] | undefined>;
    findCurrent(context: Authorization.Context): Promise<Session | undefined>;
}

export function createSessionService({ dataSourceAdapter, logger, identityProviderAdapter }: Runtime): SessionService {
    return {
        assignOneByEmailAddress: (context: Authorization.Context, request: AssignOneSessionByEmailAddressRequest) =>
            assignOneByEmailAddress({ dataSourceAdapter, logger, context, request }),
        assignOneByIdentityProvider: (context: Authorization.Context, request: AssignOneSessionByIdentityProviderRequest) =>
            assignOneByIdentityProvider({ dataSourceAdapter, logger, identityProviderAdapter, context, request }),
        assignOneByPhoneNumber: (context: Authorization.Context, request: AssignOneSessionByPhoneNumberRequest) =>
            assignOneByPhoneNumber({ dataSourceAdapter, logger, context, request }),
        expireOne: (context: Authorization.Context, request: ExpireOneSessionRequest) =>
            expireOne({ dataSourceAdapter, logger, context, request }),
        updateCookieSettings: (context: Authorization.Context, request: UpdateCookieSettingsRequest) =>
            updateCookieSettings({ dataSourceAdapter, logger, context, request: { cookieSettings: request } }),
        findMany: (context: Authorization.Context, request: FindManySessionsRequest) =>
            findMany({ dataSourceAdapter, logger, context, request }),
        findCurrent: (context: Authorization.Context) => findCurrent({ dataSourceAdapter, logger, context }),
    };
}
