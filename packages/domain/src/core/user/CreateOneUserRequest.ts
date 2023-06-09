import { type ReadStream } from 'fs';
import { type CreateOneAddressRequest } from '../address';
import { type CreateOneCookRequest } from '../cook/CreateOneCookRequest';
import { type CreateOneGlobalBookingRequestRequest } from '../global-booking-request';
import { type IdentityProvider } from '../shared';
import { type User } from './User';

export interface CreateOneUserRequest
    extends Pick<User, 'firstName' | 'lastName' | 'language' | 'gender' | 'birthDate' | 'profilePictureUrl'> {
    cook?: CreateOneCookRequest;
    addresses?: CreateOneAddressRequest[];
    globalBookingRequest?: CreateOneGlobalBookingRequestRequest;
    profilePicture?: ReadStream;
}

export type CreateOneUserByEmailAddressRequest = CreateOneUserRequest & { emailAddress?: string; phoneNumber?: string; password?: string };

export type CreateOneUserByPhoneNumberRequest = CreateOneUserRequest & { phoneNumber: string; password: string };

export type CreateOneUserByIdentityProviderRequest = CreateOneUserRequest & { identityProvider: IdentityProvider; idToken: string };
