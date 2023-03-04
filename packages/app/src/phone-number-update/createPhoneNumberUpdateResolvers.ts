import { Authorization, Service } from '@people-eat/server-domain';
import {
    GQLPhoneNumberUpdate,
    GQLPhoneNumberUpdateMutation,
    GQLPhoneNumberUpdateMutationCreateOneArgs,
    GQLPhoneNumberUpdateQuery,
} from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createPhoneNumberUpdateResolvers(
    service: Service,
): Resolvers<'PhoneNumberUpdateQuery' | 'PhoneNumberUpdateMutation' | 'PhoneNumberUpdate'> {
    return {
        PhoneNumberUpdateQuery: {
            findOne: async (
                { userId }: GQLPhoneNumberUpdateQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLPhoneNumberUpdate | undefined> => service.phoneNumberUpdate.findOne(context, { userId }),
        },
        PhoneNumberUpdateMutation: {
            createOne: async (
                { userId }: GQLPhoneNumberUpdateMutation,
                { phoneNumber }: GQLPhoneNumberUpdateMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.phoneNumberUpdate.createOne(context, { userId, phoneNumber }),
        },
        PhoneNumberUpdate: {},
    };
}
