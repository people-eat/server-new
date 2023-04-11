import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLAddress,
    type GQLUserAddressMutation,
    type GQLUserAddressMutationCreateOneArgs,
    type GQLUserAddressMutationDeleteOneArgs,
    type GQLUserAddressMutationUpdateArgs,
    type GQLUserAddressQuery,
    type GQLUserAddressQueryFindManyArgs,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createAddressResolvers(service: Service): Resolvers<'Address' | 'UserAddressMutation' | 'UserAddressQuery'> {
    return {
        Address: {},
        UserAddressMutation: {
            createOne: async (
                { userId }: GQLUserAddressMutation,
                { address }: GQLUserAddressMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.address.createOne(context, { userId, ...address }),
            deleteOne: async (
                { userId }: GQLUserAddressMutation,
                { addressId }: GQLUserAddressMutationDeleteOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.address.deleteOne(context, { userId, addressId }),
            update: async (
                { userId }: GQLUserAddressMutation,
                { addressId, address }: GQLUserAddressMutationUpdateArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.address.update(context, { userId, addressId, ...address }),
        },
        UserAddressQuery: {
            findMany: async (
                { userId }: GQLUserAddressQuery,
                _input: GQLUserAddressQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLAddress[] | undefined> => service.address.findMany(context, { userId }),
        },
    };
}
