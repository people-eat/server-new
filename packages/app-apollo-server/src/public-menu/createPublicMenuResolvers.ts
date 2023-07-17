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
                { request: _request }: GQLPublicMenuQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLPublicMenu[]> => service.publicMenu.findMany(context) as any,
        },
    };
}
