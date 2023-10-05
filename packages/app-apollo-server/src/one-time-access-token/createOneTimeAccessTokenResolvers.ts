import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLUserOneTimeAccessTokenMutation,
    type GQLUserOneTimeAccessTokenMutationConfirmArgs,
    type GQLUserOneTimeAccessTokenMutationCreateOneForEmailAddressArgs,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createOneTimeAccessTokenResolvers(
    service: Service,
): Resolvers<'OneTimeAccessToken' | 'UserOneTimeAccessTokenQuery' | 'UserOneTimeAccessTokenMutation'> {
    return {
        OneTimeAccessToken: {},
        UserOneTimeAccessTokenMutation: {
            createOneForEmailAddress: async (
                _parent: GQLUserOneTimeAccessTokenMutation,
                { emailAddress }: GQLUserOneTimeAccessTokenMutationCreateOneForEmailAddressArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.oneTimeAccessToken.createOneForEmailAddress(context, { emailAddress }),
            confirm: async (
                _parent: GQLUserOneTimeAccessTokenMutation,
                { secret }: GQLUserOneTimeAccessTokenMutationConfirmArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.oneTimeAccessToken.confirmOne(context, { secret }),
        },
        UserOneTimeAccessTokenQuery: {},
    };
}
