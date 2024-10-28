import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
import { type NanoId } from '../shared';
import { type CreateOneOneTimeAccessTokenForEmailAddressRequest } from './CreateOneOneTimeAccessTokenForEmailAddressRequest';
import { confirmOne } from './useCases/confirmOne';
import { createOneForEmailAddress } from './useCases/createOneForEmailAddress';

export interface OneTimeAccessTokenService {
    createOneForEmailAddress(context: Authorization.Context, request: CreateOneOneTimeAccessTokenForEmailAddressRequest): Promise<boolean>;
    confirmOne(context: Authorization.Context, request: { secret: NanoId }): Promise<boolean>;
}

export function createOneTimeAccessTokenService(runtime: Runtime): OneTimeAccessTokenService {
    return {
        createOneForEmailAddress: (_context: Authorization.Context, request: CreateOneOneTimeAccessTokenForEmailAddressRequest) =>
            createOneForEmailAddress({ runtime, request }),
        confirmOne: (context: Authorization.Context, request: { secret: NanoId }) => confirmOne({ runtime, context, request }),
    };
}
