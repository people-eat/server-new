import { Address, Authorization, Database, Logger } from '@people-eat/server-domain';
import { GQLAddress, GQLAddressMutation, GQLAddressMutationCreateOneArgs, GQLAddressQuery } from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createAddressResolvers(
    databaseAdapter: Database.Adapter,
    logger: Logger.Adapter,
): Resolvers<'AddressQuery' | 'AddressMutation' | 'Address'> {
    return {
        AddressQuery: {
            findMany: async (
                { userId }: GQLAddressQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLAddress[] | undefined> => Address.findManyAddresses({ databaseAdapter, logger, context, request: { userId } }),
        },
        AddressMutation: {
            createOne: async (
                { userId }: GQLAddressMutation,
                { address }: GQLAddressMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> =>
                Address.createOneAddress({
                    databaseAdapter,
                    logger,
                    context,
                    request: { userId, address },
                }),
        },
        Address: {},
    };
}
