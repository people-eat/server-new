import { Authorization, Database, Logger, PhoneNumberUpdate, SMS } from '@people-eat/server-domain';
import {
    GQLPhoneNumberUpdate,
    GQLPhoneNumberUpdateMutation,
    GQLPhoneNumberUpdateMutationCreateOneArgs,
    GQLPhoneNumberUpdateQuery,
} from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createPhoneNumberUpdateResolvers(
    databaseAdapter: Database.Adapter,
    logger: Logger.Adapter,
    smsAdapter: SMS.Adapter,
): Resolvers<'PhoneNumberUpdateQuery' | 'PhoneNumberUpdateMutation' | 'PhoneNumberUpdate'> {
    return {
        PhoneNumberUpdateQuery: {
            findMany: async (
                { userId }: GQLPhoneNumberUpdateQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLPhoneNumberUpdate[] | undefined> => undefined,
        },
        PhoneNumberUpdateMutation: {
            createOne: async (
                { userId }: GQLPhoneNumberUpdateMutation,
                { phoneNumber }: GQLPhoneNumberUpdateMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> =>
                PhoneNumberUpdate.createOnePhoneNumberUpdate({
                    databaseAdapter,
                    smsAdapter,
                    logger,
                    context,
                    request: { userId, phoneNumber },
                }),
        },
        PhoneNumberUpdate: {},
    };
}
