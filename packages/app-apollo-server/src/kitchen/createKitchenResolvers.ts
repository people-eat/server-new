import { type Authorization, type Service } from '@people-eat/server-domain';
import { type GQLKitchen, type GQLKitchenQuery } from '../generated';
import { type Resolvers } from '../Resolvers';

export function createKitchenResolvers(service: Service): Resolvers<'Kitchen' | 'KitchenMutation' | 'KitchenQuery'> {
    return {
        Kitchen: {},
        KitchenMutation: {},
        KitchenQuery: {
            findAll: async (_parent: GQLKitchenQuery, _input: unknown, context: Authorization.Context): Promise<GQLKitchen[]> =>
                (await service.kitchen.findMany(context, {})) ?? [],
        },
    };
}
