import { Authorization, Service } from '@people-eat/server-domain';
import {
    GQLEmailAddressUpdate,
    GQLEmailAddressUpdateMutation,
    GQLEmailAddressUpdateMutationCreateOneArgs,
    GQLEmailAddressUpdateQuery,
} from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createEmailAddressUpdateResolvers(
    service: Service,
): Resolvers<'EmailAddressUpdateQuery' | 'EmailAddressUpdateMutation' | 'EmailAddressUpdate'> {
    return {
        EmailAddressUpdateQuery: {
            findOne: async (
                { userId }: GQLEmailAddressUpdateQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLEmailAddressUpdate | undefined> => service.emailAddressUpdate.findOne(context, { userId }),
        },
        EmailAddressUpdateMutation: {
            createOne: async (
                { userId }: GQLEmailAddressUpdateMutation,
                { emailAddress }: GQLEmailAddressUpdateMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.emailAddressUpdate.createOne(context, { userId, emailAddress }),
        },
        EmailAddressUpdate: {},
    };
}
