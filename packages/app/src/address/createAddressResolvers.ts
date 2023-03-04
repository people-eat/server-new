import { Authorization, Service } from '@people-eat/server-domain';
import { GQLAddress, GQLAddressMutation, GQLAddressMutationCreateOneArgs, GQLAddressQuery } from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createAddressResolvers(service: Service): Resolvers<'AddressQuery' | 'AddressMutation' | 'Address'> {
    return {
        AddressQuery: {
            findMany: async (
                { userId }: GQLAddressQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLAddress[] | undefined> => service.address.findMany(context, { userId }),
        },
        AddressMutation: {
            createOne: async (
                { userId }: GQLAddressMutation,
                { address }: GQLAddressMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.address.createOne(context, { userId, address }),
        },
        Address: {},
    };
}
