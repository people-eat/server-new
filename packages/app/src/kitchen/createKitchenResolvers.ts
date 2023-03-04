import { Authorization, Service } from '@people-eat/server-domain';
import { GQLKitchen, GQLKitchenMutation, GQLKitchenMutationCreateOneArgs, GQLKitchenQuery } from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createKitchenResolvers(service: Service): Resolvers<'KitchenQuery' | 'KitchenMutation' | 'Kitchen'> {
    return {
        KitchenQuery: {
            findMany: async (
                _parent: GQLKitchenQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLKitchen[] | undefined> => service.kitchen.findMany(context, {}),
        },
        KitchenMutation: {
            createOne: async (
                _parent: GQLKitchenMutation,
                { request }: GQLKitchenMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.kitchen.createOne(context, request),
        },
        Kitchen: {},
    };
}
