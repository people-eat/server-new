import { Authorization, Database, Email, EmailAddressUpdate, Logger } from '@people-eat/server-domain';
import {
    GQLEmailAddressUpdate,
    GQLEmailAddressUpdateMutation,
    GQLEmailAddressUpdateMutationCreateOneArgs,
    GQLEmailAddressUpdateQuery,
} from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createEmailAddressUpdateResolvers(
    databaseAdapter: Database.Adapter,
    emailAdapter: Email.EmailAdapter,
    emailRendererAdapter: Email.EmailRendererAdapter,
    logger: Logger.Adapter,
): Resolvers<'EmailAddressUpdateQuery' | 'EmailAddressUpdateMutation' | 'EmailAddressUpdate'> {
    return {
        EmailAddressUpdateQuery: {
            findMany: async (
                { userId }: GQLEmailAddressUpdateQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLEmailAddressUpdate[] | undefined> =>
                EmailAddressUpdate.findManyEmailAddressUpdates({ databaseAdapter, logger, context, request: { userId } }),
        },
        EmailAddressUpdateMutation: {
            createOne: async (
                { userId }: GQLEmailAddressUpdateMutation,
                { emailAddress }: GQLEmailAddressUpdateMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> =>
                EmailAddressUpdate.createOneEmailAddressUpdate({
                    databaseAdapter,
                    emailAdapter,
                    emailRendererAdapter,
                    logger,
                    context,
                    request: { userId, emailAddress },
                }),
        },
        EmailAddressUpdate: {},
    };
}
