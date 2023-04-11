import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLPhoneNumberUpdate,
    type GQLUserPhoneNumberUpdateMutation,
    type GQLUserPhoneNumberUpdateMutationConfirmArgs,
    type GQLUserPhoneNumberUpdateMutationCreateOneArgs,
    type GQLUserPhoneNumberUpdateQuery,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createPhoneNumberUpdateResolvers(
    service: Service,
): Resolvers<'PhoneNumberUpdate' | 'UserPhoneNumberUpdateMutation' | 'UserPhoneNumberUpdateQuery'> {
    return {
        PhoneNumberUpdate: {},
        UserPhoneNumberUpdateMutation: {
            createOne: async (
                { userId }: GQLUserPhoneNumberUpdateMutation,
                { phoneNumber }: GQLUserPhoneNumberUpdateMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.phoneNumberUpdate.createOne(context, { userId, phoneNumber }),
            confirm: async (
                _parent: GQLUserPhoneNumberUpdateMutation,
                { secret }: GQLUserPhoneNumberUpdateMutationConfirmArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.phoneNumberUpdate.confirmOne(context, { secret }),
        },
        UserPhoneNumberUpdateQuery: {
            findOne: async (
                { userId }: GQLUserPhoneNumberUpdateQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLPhoneNumberUpdate | undefined> => service.phoneNumberUpdate.findOneByUserId(context, { userId }),
        },
    };
}
