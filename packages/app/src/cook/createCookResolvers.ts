import { Authorization, Service } from '@people-eat/server-domain';
import {
    GQLCook,
    GQLCookMutation,
    GQLCookMutationCreateOneArgs,
    GQLCookMutationMealsArgs,
    GQLCookMutationMenusArgs,
    GQLCookQuery,
    GQLCookQueryFindManyArgs,
    GQLCookQueryFindOneArgs,
    GQLCookQueryMealsArgs,
    GQLCookQueryMenusArgs,
    GQLUser,
} from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createCookResolvers(service: Service): Resolvers<'CookQuery' | 'CookMutation' | 'Cook'> {
    return {
        CookQuery: {
            meals: (_parent: GQLCookQuery, { cookId }: GQLCookQueryMealsArgs, _context: unknown) => ({ cookId } as any),
            menus: (_parent: GQLCookQuery, { cookId }: GQLCookQueryMenusArgs, _context: unknown) => ({ cookId } as any),

            findMany: (
                _parent: GQLCookQuery,
                { request }: GQLCookQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLCook[] | undefined> => service.cook.findMany(context, request) as any,

            findOne: (
                _parent: GQLCookQuery,
                request: GQLCookQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLCook | undefined> => service.cook.findOne(context, request) as any,
        },
        CookMutation: {
            meals: (_parent: GQLCookMutation, { cookId }: GQLCookMutationMealsArgs) => ({ cookId } as any),
            menus: (_parent: GQLCookMutation, { cookId }: GQLCookMutationMenusArgs) => ({ cookId } as any),

            createOne: (
                _parent: GQLCookMutation,
                { cook }: GQLCookMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.createOne(context, { ...cook, languages: [] }),
        },
        Cook: {
            user: ({ cookId }: GQLCook, _request: unknown, context: Authorization.Context): Promise<GQLUser> =>
                service.user.findOneByUserId(context, { userId: cookId }) as any,
        },
    };
}
