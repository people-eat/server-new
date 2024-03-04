import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLCourse,
    type GQLPublicMenu,
    type GQLPublicMenuQuery,
    type GQLPublicMenuQueryFindManyArgs,
    type GQLPublicMenuQueryFindOneArgs,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createPublicMenuResolvers(service: Service): Resolvers<'PublicMenu' | 'PublicMenuQuery'> {
    return {
        PublicMenu: {
            imageUrls: async ({ menuId }: GQLPublicMenu, _input: unknown, context: Authorization.Context): Promise<string[]> =>
                service.menu.findImageUrls(context, { menuId }),
            courses: async ({ menuId }: GQLPublicMenu, _input: unknown, context: Authorization.Context): Promise<GQLCourse[]> =>
                service.publicMenu.findAllCourses(context, { menuId }) as any,
        },
        PublicMenuQuery: {
            findOne: async (
                _parent: GQLPublicMenuQuery,
                { menuId }: GQLPublicMenuQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLPublicMenu | undefined> => service.publicMenu.findOne(context, menuId) as any,

            findMany: async (
                _parent: GQLPublicMenuQuery,
                { request }: GQLPublicMenuQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLPublicMenu[]> => service.publicMenu.findMany(context, request) as any,

            findHeroes: async (_parent: GQLPublicMenuQuery, _input: unknown, context: Authorization.Context): Promise<GQLPublicMenu[]> =>
                service.publicMenu.findHeroes(context) as any,

            checkAvailability: async (
                _parent: GQLPublicMenuQuery,
                { request }: GQLPublicMenuQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.publicMenu.checkAvailability(context, request),
        },
    };
}
