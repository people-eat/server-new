import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLLanguage,
    type GQLPublicCook,
    type GQLPublicCookQuery,
    type GQLPublicCookQueryFindManyArgs,
    type GQLPublicCookQueryFindOneArgs,
    type GQLPublicMenu,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createPublicCookResolvers(service: Service): Resolvers<'PublicCook' | 'PublicCookQuery'> {
    return {
        PublicCook: {
            languages: async ({ cookId }: GQLPublicCook, _input: unknown, context: Authorization.Context): Promise<GQLLanguage[]> =>
                service.cookLanguage.findAll(context, { cookId }) as any,
            menus: async ({ cookId }: GQLPublicCook, _input: unknown, context: Authorization.Context): Promise<GQLPublicMenu[]> =>
                service.publicMenu.findManyByCookId(context, { cookId }) as any,
        },
        PublicCookQuery: {
            findOne: async (
                _parent: GQLPublicCookQuery,
                { cookId }: GQLPublicCookQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLPublicCook | undefined> => service.publicCook.findOne(context, cookId) as any,

            findMany: async (
                _parent: GQLPublicCookQuery,
                { request }: GQLPublicCookQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLPublicCook[]> => service.publicCook.findMany(context, request) as any,

            findHeroes: async (_parent: GQLPublicCookQuery, _input: unknown, context: Authorization.Context): Promise<GQLPublicCook[]> =>
                service.publicCook.findHeroes(context) as any,

            checkAvailability: async (
                _parent: GQLPublicCookQuery,
                { request }: GQLPublicCookQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.publicCook.checkAvailability(context, request),
        },
    };
}
